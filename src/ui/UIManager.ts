import { ActionsPanel } from "./ActionsPanel";
import { Header } from "./Header";

export class UIManager {
    private actionsPanel = new ActionsPanel();
    private header = new Header();

    constructor() {
        document.body.appendChild(this.actionsPanel.container);
        document.body.appendChild(this.header.header);
    }

    public hideActions() {
        this.actionsPanel.hide();
    }

    public showActions() {
        this.actionsPanel.show();
    }

    public setScore(score: number) {
        this.header.scoreCounter.setScore(score);
    }
}