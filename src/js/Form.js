import { Card } from "./Card.js";

export class Form {
  constructor(column, type, cards, onAdd, onDelete) {
    this.column = column;
    this.type = type;
    this.cards = cards;
    this.onAdd = onAdd;
    this.onDelete = onDelete;

    this.form = this.column.querySelector(".form");
    this.textarea = this.form.querySelector("textarea");
    this.addBtn = this.form.querySelector(".add");
    this.cancelBtn = this.form.querySelector(".delete");
    this.addTaskBtn = this.column.querySelector(".add-task");

    this.addEvents();
  }

  render() {
    const cardContainer = this.column.querySelector(".cards");

    cardContainer.innerHTML = "";

    this.cards.forEach((cardData) => {
      const card = new Card(
        cardData.text,
        cardData.id,
        this.type,
        this.onDelete
      );

      cardContainer.append(card.element);
    });
  }

  show() {
    this.form.classList.remove("hidden");
    this.addTaskBtn.style.display = "none";
    this.textarea.focus();
  }

  hide() {
    this.form.classList.add("hidden");
    this.addTaskBtn.style.display = "block";
    this.textarea.value = "";
  }

  addEvents() {
    this.addTaskBtn.addEventListener("click", () => {
      this.show();
    });

    this.cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.hide();
    });

    this.addBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const text = this.textarea.value.trim();
      if (!text) return;
      this.onAdd(this.type, text);
      this.hide();
    });
  }
}
