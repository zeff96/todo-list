import './index.css';
import { Node } from './components/app.js';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';

const clearButton = document.querySelector('.btn');
const todos = document.querySelector('.list-container');
const btn = document.querySelector('.add-todo');
const addElem = document.querySelector('.add-list');

const todoList = new Node();

btn.addEventListener('click', () => {
  if (addElem.value.trim()) {
    todoList.createItems(addElem.value);
    todoList.saveItems();
    todoList.resetIndex();
    todoList.render(todos);
    addElem.value = '';
  }
});

addElem.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (addElem.value.trim()) {
      todoList.createItems(addElem.value);
      todoList.saveItems();
      todoList.resetIndex();
      todoList.render(todos);
      addElem.value = '';
    }
  }
});

todos.addEventListener('click', (e) => {
  const { target } = e;
  if (target.className === 'deletebtn') {
    const id = Number(target.parentNode.id);
    todoList.deleteItems(id);
    todoList.resetIndex();
    todoList.saveItems();
    todoList.render(todos);
  }
});

clearButton.addEventListener('click', () => {
  todoList.clearCompleted();
  todoList.resetIndex();
  todoList.saveItems();
  todoList.render(todos);
});

document.addEventListener('DOMContentLoaded', () => {
  todoList.savedItems();
  todoList.render(todos);
});