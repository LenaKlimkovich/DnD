export class Card {
  constructor(text, id, type, deleted) {
    this.text = text;
    this.id = id;
    this.type = type;
    this.deleted = deleted;
    this.element = this.create();
    this.addEvents();
  }

  create() {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("draggable", "true");
    card.dataset.id = this.id;
    card.dataset.type = this.type;
    card.innerHTML = `
            <span class="card-text">${this.text}</span>
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
      this.deleted(this.type, this.id);
    });
  }
}
