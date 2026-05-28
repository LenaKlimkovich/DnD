// import { Container } from "./Container";

export class DnD {
  constructor(container, app) {
    this.container = container;
    this.dragged = null;
    this.app = app;
    this.ghost = this.createGhost();
    this.init();
  }

  createGhost() {
    const ghost = document.createElement("div");
    ghost.classList.add("ghost-card");
    return ghost;
  }

  init() {
    this.container.addEventListener("dragstart", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;

      this.dragged = card;
      card.classList.add("dragging");
    });

    this.container.addEventListener("dragend", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;

      card.classList.remove("dragging");
      this.ghost.remove();

      this.dragged = null;
    });

    this.container.addEventListener("dragover", (e) => {
      e.preventDefault();

      const column = e.target.closest(".column");
      if (!column) return;

      const cardsContainer = column.querySelector(".cards");
      const after = this.getCardAfterMouse(cardsContainer, e.clientY);

      if (after) {
        cardsContainer.insertBefore(this.ghost, after);
      } else {
        cardsContainer.append(this.ghost);
      }
    });

    this.container.addEventListener("drop", (e) => {
      const column = e.target.closest(".column");
      if (!column || !this.dragged) return;

      const cardsContainer = column.querySelector(".cards");
      cardsContainer.insertBefore(this.dragged, this.ghost);

      this.ghost.remove();
      this.dragged.classList.remove("dragging");
      this.updateStateFromDOM();
      this.dragged = null;
    });
  }

  getCardAfterMouse(cardsContainer, mouseY) {
    const cards = [...cardsContainer.querySelectorAll(".card:not(.dragging)")];

    return cards.find((card) => {
      const rect = card.getBoundingClientRect();
      return mouseY < rect.top + rect.height / 2;
    });
  }

  updateStateFromDOM() {
    const newState = {
      todo: [],
      progress: [],
      done: []
    };

    this.container.querySelectorAll(".column").forEach((col) => {
      const type = col.dataset.type;
      const cards = col.querySelectorAll(".card");
      cards.forEach((card) => {
        newState[type].push({
          id: Number(card.dataset.id),
          text: card.querySelector(".card-text").textContent.trim()
        });
      });
    });

    this.app.state = newState;
    this.app.saveState();
  }
}
