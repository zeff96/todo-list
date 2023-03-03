export class Node {
  constructor() {
    this.lists = [];
  }

  createItems = (description) => {
    const completed = false;
    const index = this.lists.length + 1;
    const list = {
      completed,
      index,
      description,
    };
    this.lists.push(list);
  };

  deleteItems = (index) => {
    this.lists.forEach((list) => {
      if (list.index === index) {
        this.lists.splice(this.lists.indexOf(list), 1);
      }
    });
  };

  render=(list) => {
    list.innerHTML = '';
    this.lists.forEach((todo) => {
      const li = `<div id="${todo.index}" class="list">
        <input 
          type="checkbox" 
          name="list" 
          id="${todo.index}"
          class="checkbox"
        />
        <input
          type="text"
          id="${todo.index}"
          class="text-node"
          value="${todo.description}"
        />
        <button 
          type="button" 
          data-id="${todo.index}" 
          class="deletebtn"
          >del
        </button>  
      </div>`;
      list.innerHTML += li;
    });
    const checkbox = document.querySelectorAll('.checkbox');

    checkbox.forEach((check) => {
      check.addEventListener('change', () => {
        if (check.checked) {
          this.lists = this.lists.map((list) => {
            if (list.index === Number(check.parentNode.id)) {
              list.completed = true;
            }
            return list;
          });
          this.saveItems();
        } else {
          this.lists = this.lists.map((list) => {
            if (list.index === Number(check.parentNode.id)) {
              list.completed = false;
            }
            return list;
          });
          this.saveItems();
        }
      });
    });

    const texts = document.querySelectorAll('.text-node');

    texts.forEach((text) => {
      text.addEventListener('change', () => {
        this.lists.forEach((list) => {
          if (list.index === Number(text.id)) {
            list.description = text.value;
            this.saveItems();
          }
        });
      });
    });
  };

  resetIndex = () => {
    let initialIndex = 1;

    this.lists.forEach((list) => {
      list.index = initialIndex;
      initialIndex += 1;
    });
  };

  clearCompleted = () => {
    this.lists = this.lists.filter((list) => list.completed !== true);
  };

  saveItems = () => {
    const data = JSON.stringify(this.lists);
    localStorage.setItem('data', data);
  };

  savedItems = () => {
    if (localStorage.getItem('data')) {
      this.lists = JSON.parse(localStorage.getItem('data'));
    }
  };
}

export default Node;
