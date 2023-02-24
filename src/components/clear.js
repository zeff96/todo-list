const clearButton = document.querySelector('.btn');
const addList = document.querySelector('.list-items');
const btn = document.querySelector('.add-todo');
const addElem = document.querySelector('.add-list');

let lists;

const saveItems = () => {
  localStorage.setItem('data', JSON.stringify(lists));
};

const savedItems = JSON.parse(localStorage.getItem('data'));

if (Array.isArray(savedItems)) {
  lists = savedItems;
} else {
  lists = [];
}

class Node {
  constructor(description) {
    this.description = description;
    this.completed = false;
    this.index = lists.length + 1;
  }
}

const createItems = (description) => {
  const newList = new Node(description);
  lists.push(newList);
  saveItems();
};

const setEditing = (itemId) => {
  lists.forEach((list) => {
    if (list.index === itemId) list.isEditing = true;
  });

  saveItems();
};

const updateItem = (itemId, newdescription) => {
  lists.forEach((list) => {
    if (list.index === itemId) {
      list.description = newdescription;
      list.completed = false;
      list.isEditing = false;
    }
  });
  saveItems();
};

const deleteItems = (listId) => {
  lists = lists.filter((list) => list.index !== listId);
  lists.forEach((e, i) => {
    e.index = i + 1;
  });
  saveItems();
};

const toggleCheck = (checkboxId, checked) => {
  for (let i = 0; i < lists.length; i += 1) {
    if (lists[i].index === checkboxId) {
      if (checked === true) lists[i].completed = true;
      else lists[i].completed = false;
    }
  }

  saveItems();
};

const checkList = (event) => {
  const checkbox = event.target;
  const checkboxId = Number(checkbox.dataset.id);
  const { checked } = checkbox;

  toggleCheck(checkboxId, checked);
};

const render = () => {
  addList.innerHTML = '';

  lists.forEach((list) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.id = list.index;
    listItem.draggable = true;

    if (list.isEditing) {
      const textElem = document.createElement('input');
      textElem.type = 'text';
      textElem.id = list.index;
      textElem.classList.add('new-text');

      const updateButton = document.createElement('button');
      updateButton.type = 'button';
      updateButton.innerHTML = '&#10003;';
      updateButton.classList.add('updatebtn');
      updateButton.dataset.id = list.index;

      updateButton.addEventListener('click', (e) => {
        const itemId = Number(e.target.dataset.id);
        const newdescription = textElem.value;
        if (newdescription === '') return;
        updateItem(itemId, newdescription);
        render();
      });

      listItem.append(textElem, updateButton);
    } else {
      const text = document.createElement('p');
      text.className = 'text-node';
      text.innerHTML = list.description;

      const btnContainer = document.createElement('div');
      btnContainer.className = 'icon-container';

      const editButton = document.createElement('button');
      editButton.type = 'button';
      editButton.dataset.id = list.index;
      editButton.classList.add('editbtn');
      editButton.innerHTML = '&#9998;';

      editButton.addEventListener('click', (e) => {
        const itemId = Number(e.target.dataset.id);

        setEditing(itemId);
        render();
      });

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.classList.add('deletebtn');
      deleteButton.dataset.id = list.index;
      deleteButton.innerText = 'del';
      deleteButton.addEventListener('click', (e) => {
        const listId = Number(e.target.dataset.id);

        deleteItems(listId);
        render();
      });

      btnContainer.append(editButton, deleteButton);

      const menuContainer = document.createElement('button');
      menuContainer.type = 'button';
      menuContainer.classList.add('menu-container');
      menuContainer.id = list.index;
      menuContainer.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';

      menuContainer.addEventListener('click', () => {
        btnContainer.classList.toggle('active');
      });

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
      checkbox.dataset.id = list.index;
      checkbox.onchange = checkList;

      listItem.prepend(checkbox);
      listItem.append(text, btnContainer, menuContainer);
    }
    addList.appendChild(listItem);
  });
};

const addItems = () => {
  const description = addElem.value;
  if (addElem.value === '') return;
  createItems(description);
  render();
};

btn.addEventListener('click', (e) => {
  e.preventDefault();

  addItems();
  addElem.value = '';
});

addElem.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addItems();
    addElem.value = '';
  }
});

clearButton.addEventListener('click', (e) => {
  e.preventDefault();

  lists = lists.filter((list) => list.completed !== true);
  lists.forEach((e, i) => {
    e.index = i + 1;
  });

  saveItems();
  render();
});

window.onload = render();
