import { Form } from "./Form.js";

export class Container {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.forms = [];

        this.init();
    }

    init() {
        const columns = this.element.querySelectorAll(".column");

        columns.forEach(col => {
            this.forms.push(new Form(col));
        });
    }
}
