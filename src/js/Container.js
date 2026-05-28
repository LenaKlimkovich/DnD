import { Form } from "./Form.js";
import { DnD } from "./DnD.js";

export class Container {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.forms = [];
    this.state = this.loadState();

    this.init();
    this.render();
  }

  loadState() {
    return (
      JSON.parse(localStorage.getItem("cards-storage")) || {
        todo: [],
        progress: [],
        done: []
      }
    );
  }

  saveState() {
    localStorage.setItem("cards-storage", JSON.stringify(this.state));
  }

  init() {
    const columns = this.element.querySelectorAll(".column");

    columns.forEach((col) => {
      const type = col.dataset.type;

      this.forms.push(
        new Form(
          col,
          type,
          this.state[type],
          this.handleAddCard.bind(this),
          this.handleDeleteCard.bind(this)
        )
      );
    });
  }

  handleAddCard(type, text) {
    const newCard = {
      id: Date.now(),
      text
    };

    this.state[type].push(newCard);
    this.saveState();
    this.render();
  }

  handleDeleteCard(type, id) {
    this.state[type] = this.state[type].filter((c) => c.id !== id);
    this.saveState();
    this.render();
  }

  render() {
    this.forms.forEach((form) => {
      form.cards = this.state[form.type];
      form.render();
    });
  }
}
