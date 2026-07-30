import CANNON from 'cannon';
import * as THREE from 'three';

export class PhysicsWorld {
    public world: CANNON.World;

    public defaultMaterial = new CANNON.Material(Materials.default);

    public cubeMaterial = new CANNON.Material("cube");
    public tableMaterial = new CANNON.Material("table");

    public cubeTableContactMaterial = new CANNON.ContactMaterial(
        this.cubeMaterial,
        this.tableMaterial,
        {
            friction: 0.8,
            restitution: 0,
        }
    );

    public cubeCubeContact = new CANNON.ContactMaterial(
        this.cubeMaterial,
        this.cubeMaterial,
        {
            friction: 0.9,
            restitution: 0,
        }
    );

    public defaultContactMaterial = new CANNON.ContactMaterial(
        this.defaultMaterial,
        this.defaultMaterial,
        {
            friction: 0.1,
            restitution: 0,
        },
    );

    constructor() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);
        this.world.addContactMaterial(this.defaultContactMaterial);
        this.world.addContactMaterial(this.cubeTableContactMaterial);
        this.world.addContactMaterial(this.cubeCubeContact);
        this.world.defaultContactMaterial = this.defaultContactMaterial;
    }

    public createPhysicalBody(mesh: THREE.Mesh, mass = 1, material?: Materials): CANNON.Body {
        if (mesh.geometry instanceof THREE.SphereGeometry)
            return this.createSphereBody(mesh, material);

        if (mesh.geometry instanceof THREE.BoxGeometry)
            return this.createBoxBody(mesh, mass, material);

        if (mesh.geometry instanceof THREE.PlaneGeometry)
            return this.createPlaneBody(mesh, material);

        return new CANNON.Body();
    }

    private createSphereBody(sphere: THREE.Mesh, material?: Materials): CANNON.Body {
        const geo = sphere.geometry as THREE.SphereGeometry;
        const pos = new THREE.Vector3(0, 0, 0);
        sphere.getWorldPosition(pos);
        const sphereShape = new CANNON.Sphere(geo.parameters.radius);
        const body = new CANNON.Body({
            mass: 1, 
            position: new CANNON.Vec3(pos.x, pos.y, pos.z),
            shape: sphereShape,
            material: this.getMaterial(material),
        });
        this.world.addBody(body);

        return body;
    }

    private createBoxBody(box: THREE.Mesh, mass = 1, material?: Materials): CANNON.Body {
        const geo = box.geometry as THREE.BoxGeometry;
        const pos = new THREE.Vector3(0, 0, 0);
        box.getWorldPosition(pos);
        const vec = new CANNON.Vec3(
            geo.parameters.width / 2,
            geo.parameters.height / 2,
            geo.parameters.depth / 2,
        );
        const boxShape = new CANNON.Box(vec);
        const body = new CANNON.Body({
            mass, 
            position: new CANNON.Vec3(pos.x, pos.y, pos.z),
            shape: boxShape,
            material: this.getMaterial(material),
        });
        const quat = new THREE.Quaternion();
        box.getWorldQuaternion(quat);

        body.quaternion.set(
            quat.x,
            quat.y,
            quat.z,
            quat.w
        );
        this.world.addBody(body);

        return body;
    }

    // infinite
    private createPlaneBody(plane: THREE.Mesh, material?: Materials): CANNON.Body {
        // const { x, y, z } = plane.position;
        const planeShape = new CANNON.Plane();
        const body = new CANNON.Body({
            mass: 0, // default
            // position: new CANNON.Vec3(x, y, z),
            shape: planeShape,
            quaternion: new CANNON.Quaternion(
                plane.quaternion.x,
                plane.quaternion.y,
                plane.quaternion.z,
                plane.quaternion.w
            ),
            material: this.getMaterial(material),
        });

        this.world.addBody(body);

        return body;
    }

    private getMaterial(material = Materials.default): CANNON.Material {
        switch (material) {
            case Materials.cube:
                return this.cubeMaterial;
            case Materials.table:
                return this.tableMaterial;
            case Materials.default:
            default:
                return this.defaultMaterial;
        }
    }
}

export enum Materials {
    default = 'default',
    cube = 'cube',
    table = 'table'
}