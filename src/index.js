import "./index.css";
import Node from "./components/app.js";
import "@fortawesome/fontawesome-free/js/fontawesome.js";
import "@fortawesome/fontawesome-free/js/solid.js";
import "@fortawesome/fontawesome-free/js/regular.js";
import "@fortawesome/fontawesome-free/js/brands.js";

const clearButton = document.querySelector(".btn");
const todos = document.querySelector(".list-container");
const btn = document.querySelector(".add-todo");
const addElem = document.querySelector(".add-list");

btn.addEventListener("click", () => {
  if (addElem.value.trim()) {
    Node.createItems(addElem.value);
    Node.saveItems();
    Node.resetIndex();
    Node.render(todos);
    addElem.value = "";
  }
});

addElem.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (addElem.value.trim()) {
      Node.createItems(addElem.value);
      Node.saveItems();
      Node.resetIndex();
      Node.render(todos);
      addElem.value = "";
    }
  }
});

todos.addEventListener("click", (e) => {
  const { target } = e;
  if (target.className === "deletebtn") {
    const id = Number(target.parentNode.id);
    Node.deleteItems(id);
    Node.resetIndex();
    Node.saveItems();
    Node.render(todos);
  }
});

clearButton.addEventListener("click", () => {
  Node.clearCompleted();
  Node.resetIndex();
  Node.saveItems();
  Node.render(todos);
});

document.addEventListener("DOMContentLoaded", () => {
  Node.savedItems();
  Node.render(todos);
});
