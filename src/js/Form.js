import { Card } from "./Сard.js";

export class Form {
    constructor(columnElement) {
        this.column = columnElement;

        this.form = this.column.querySelector(".form");
        this.textarea = this.form.querySelector("textarea");
        this.addBtn = this.form.querySelector(".add");
        this.cancelBtn = this.form.querySelector(".delete");
        this.addTaskBtn = this.column.querySelector(".add-task");

        this.addEvents();
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

            const card = new Card(text);
            this.column.insertBefore(card.element, this.form);

            this.hide();
        });
    }
}
