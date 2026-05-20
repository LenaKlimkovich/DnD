export class DnD {
    constructor(container) {
        this.container = container;
        this.dragged = null;
        this.ghost = this.createGhost();

        this.init();
    }

   createGhost() {
        const ghost = document.createElement("div");
        ghost.classList.add("ghost-card");
        return ghost;
    }

    init() {
        this.container.querySelectorAll(".card").forEach(card => {
            this.addCardEvents(card);
        });

        this.container.querySelectorAll(".column").forEach(col => {
            this.addColumnEvents(col);
        });
    }

    addCardEvents(card) {
        card.addEventListener("dragstart", () => {
            this.dragged = card;
            card.classList.add("dragging");
        });

        card.addEventListener("dragend", () => {
            card.classList.remove("dragging");
            this.ghost.remove();
            this.dragged = null;
        });
    }

    addColumnEvents(column) {
        column.addEventListener("dragover", (e) => {
            e.preventDefault();
            const addTask = column.querySelector(".add-task");
            const after = this.getCardAfterMouse(column, e.clientY);

            if (after) {
                column.insertBefore(this.ghost, after);
            } else {
                 column.insertBefore(this.ghost, addTask);
            }
        });

        column.addEventListener("drop", () => {
            if (!this.dragged) return;
            column.insertBefore(this.dragged, this.ghost);
        });
    }

    getCardAfterMouse(column, mouseY) {
        const cards = [...column.querySelectorAll(".card:not(.dragging)")];

        return cards.find(card => {
            const rect = card.getBoundingClientRect();
            return mouseY < rect.top + rect.height / 2;
        });
    }
}
