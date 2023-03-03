/**
 * @jest-environment jsdom
 */
import { Node } from "./app";

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
    })
  });
  
});