import "./css/index.css";
import { Container } from "./js/Container.js";
import { Card } from "./js/Сard.js";
import { DnD } from "./js/DnD.js";

document.querySelectorAll(".card").forEach(card => {
    new Card(card.textContent.trim(), card);
});

new Container(".container");
new DnD(document.querySelector(".container"));

