export class InputManager {
    private clickCallbacks: ((event: PointerEvent) => void)[] = [];
    private resizeCallbacks: ((event: Event) => void)[] = [];

    constructor() {
        window.addEventListener('pointerdown', this._onPoinerDown);
        window.addEventListener("resize", this._onResize);
    }

    public onPoinerDown(callback: (event: PointerEvent) => void) {
        this.clickCallbacks.push(callback);
    }

    public onResize(callback: (event: Event) => void) {
        this.resizeCallbacks.push(callback);
    }

    private _onPoinerDown = (event: PointerEvent) => {
        this.clickCallbacks.forEach((callback) => callback(event));
    }

    private _onResize = (event: Event) => {
        this.resizeCallbacks.forEach((callback) => callback(event));
    }
}