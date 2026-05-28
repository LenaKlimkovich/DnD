
import "./css/index.css";
import { Container } from "./js/Container.js";
import { DnD } from "./js/DnD.js";

const app = new Container(".container");
new DnD(app.element, app);

