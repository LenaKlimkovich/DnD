export class Card {
    constructor(text, element = null) {
        this.text = text;
        this.element = element || this.create();
        this.addEvents();
    }

    create() {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("draggable", "true");

        card.innerHTML = `
            <span>${this.text}</span>
            <div class="card-delete hidden">&#10006;</div>
        `;

        return card;
    }

    addEvents() {
        const deleteBtn = this.element.querySelector(".card-delete");

        this.element.addEventListener("mouseenter", () => {
            deleteBtn.classList.remove("hidden");
        });

        this.element.addEventListener("mouseleave", () => {
            deleteBtn.classList.add("hidden");
        });

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.element.remove();
        });
    }
}
