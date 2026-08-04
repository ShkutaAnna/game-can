export class ActionsPanel {
    public container: HTMLDivElement;
    private restartButton: HTMLButtonElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.classList.add('actions-container');
        
        const containerBg = document.createElement('div');
        containerBg.classList.add('actions-container-bg');
        this.container.appendChild(containerBg);


        this.restartButton = document.createElement('button');
        this.restartButton.innerText = 'Restart';
        this.container.appendChild(this.restartButton);
    }

    public hide() {
        this.container.classList.add('hidden');
    }

    public show() {
        this.container.classList.remove('hidden');
    }
}