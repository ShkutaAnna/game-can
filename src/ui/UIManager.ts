import { ActionsPanel } from "./ActionsPanel";

export class UIManager {
    private actionsPanel = new ActionsPanel();

    constructor() {
        document.body.appendChild(this.actionsPanel.container);
    }

    public hideActions() {
        this.actionsPanel.hide();
    }

    public showActions() {
        this.actionsPanel.show();
    }
}