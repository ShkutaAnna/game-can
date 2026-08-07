export class ScoreCounter {
    public element: HTMLDivElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('score-counter');
    }

    public setScore(value: number) {
        this.element.innerHTML = `${value}`;
    }
}