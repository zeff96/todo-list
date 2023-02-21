import icon from '../assets/menu.png';

const addList = document.querySelector('.list-items');

const todos = [
  {
    description: 'wash dishes',
    completed: false,
    index: '1',
  }, {
    description: 'complete To Do list project',
    completed: false,
    index: '2',
  },
];

const render = () => {
  todos.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${todo.description}`;
    listItem.className = 'list-item';
    listItem.id = `${todo.index}`;
    const img = document.createElement('img');
    img.setAttribute('src', icon);
    img.className = 'image';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.id = `${todo.index}`;

    listItem.prepend(checkbox);
    listItem.appendChild(img);
    addList.appendChild(listItem);
  });
};

window.onload = render();