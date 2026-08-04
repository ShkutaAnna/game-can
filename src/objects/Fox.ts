import * as THREE from 'three';
import { foxUrl, GLTFLoaderManager } from '../core/GLTFLoaderManager';
import { angleDiff, getPolarAngle } from '../utils';

export class Fox {
    public group!: THREE.Group;
    private mixer!: THREE.AnimationMixer;
    public actions: FoxActions = {
        [FoxAnimations.Survey]: null,
        [FoxAnimations.Walk]: null,
        [FoxAnimations.Run]: null,
    };

    private runCircleParams = {
        radius: 0,
        center: new THREE.Vector3(0, 0, 0),
        speed: 8,
        angle: 0,
        startingAngle: 0,
        isRunning: false,
        isReturning: false,
    }

    constructor(
        public loaderManager: GLTFLoaderManager
    ) { }

    async load(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.loaderManager.loader.load(
                foxUrl,
                (gltf) => {
                    this.group = gltf.scene;
                    this.group.scale.setScalar(0.025);

                    this.mixer = new THREE.AnimationMixer(gltf.scene);
                    gltf.animations.forEach((animation) => {
                        this.actions[animation.name as FoxAnimations] = this.mixer.clipAction(animation);
                    });

                    this.actions.Survey?.play();
                    
                    resolve();
                },
                undefined,
                reject
            );
        });
    }

    public update(dt: number) {
        this.mixer?.update(dt);

        this.updateRunningAnimation(dt);
    }

    public lookAhead(angle: number, centerPoint: THREE.Vector3, radius: number) {
        // look ahead along the movement trajectory
        const lookAhead = angle - 0.01;

        this.group.lookAt(
            centerPoint.x + radius * Math.cos(lookAhead),
            this.group.position.y,
            centerPoint.z + radius * Math.sin(lookAhead)
        );
    }

    public runInCircle(isActive: boolean, centerPoint?: THREE.Vector3) {        
        if (!centerPoint && isActive) return;

        if (!isActive && this.runCircleParams.isRunning) {
            // return to starting point and pause

            this.runCircleParams.isReturning = true;
            this.runCircleParams.isRunning = false;
        }

        if (centerPoint && isActive && !this.runCircleParams.isRunning) {
            this.runCircleParams.radius = this.group.position.distanceTo(centerPoint);
            this.runCircleParams.center = centerPoint;

            this.runCircleParams.angle = getPolarAngle(this.group.position, centerPoint);
            this.runCircleParams.startingAngle = this.runCircleParams.angle;

            this.runCircleParams.isReturning = false;
            this.runCircleParams.isRunning = true;

            this.actions.Survey?.stop();
            this.actions.Run?.play();

            // TEMP
            setTimeout(() => {
                this.runInCircle(false);
                console.log('stopped running')
            }, 5000);
        }
    }

    private updateRunningAnimation(dt: number) {
        const { isRunning, isReturning, startingAngle } = this.runCircleParams;

        if (isRunning || isReturning) {
            const diff = Math.abs(angleDiff(this.runCircleParams.angle, startingAngle));
            
            // stop running
            if (isReturning && diff < 0.01) {
                this.runCircleParams.isReturning = false;
                this.runCircleParams.isRunning = false;

                this.actions.Survey?.play();
                this.actions.Run?.stop();
                return;
            }

            const { center, radius, speed } = this.runCircleParams;

            this.runCircleParams.angle -= (speed / radius) * dt;

            this.group.position.set(
                center.x + radius * Math.cos(this.runCircleParams.angle),
                this.group.position.y,
                center.z + radius * Math.sin(this.runCircleParams.angle)
            );

            this.lookAhead(this.runCircleParams.angle, center, radius);
        }
    }
}

enum FoxAnimations {
    Survey = 'Survey',
    Walk = 'Walk',
    Run = 'Run'
}

type FoxActions = { [key in FoxAnimations]: THREE.AnimationAction | null };