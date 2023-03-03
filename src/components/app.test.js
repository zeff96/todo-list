/**
 * @jest-environment jsdom
 */
import { Node } from './app.js';

describe('add and remove group', () => {
  it('should add a task to the list', () => {
    const todoList = new Node();
    todoList.createItems('Write code');
    expect(todoList.lists).toHaveLength(1);
    expect(todoList.lists[0]).toEqual({
      index: 1,
      description: 'Write code',
      completed: false,
    });
  });

  it('delete a task', () => {
    const todoList = new Node();
    todoList.createItems('Write code');
    todoList.createItems('Write code');
    todoList.deleteItems(1);
    expect(todoList.lists).toHaveLength(1);
    expect(todoList.lists[0]).toEqual({
      index: 2,
      description: 'Write code',
      completed: false,
    });
  });
});

describe('edit and update group', () => {
  it('edit function', () => {
    const todoList = new Node();
    todoList.createItems('Write code');
    const texts = document.querySelectorAll('.text-node');
    texts.forEach((text) => {
      text.value = 'Addeka & Mostafa';
      text.dispatchEvent(new Event('change'));
      expect(todoList.lists[0].description).toEqual('Addeka & Mostafa');
    })
  })
});