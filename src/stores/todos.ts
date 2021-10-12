import { makeAutoObservable } from "mobx";

export enum TodoState {
  Edit,
  Todo,
  Complete,
}

export interface Todo {
  id: string;
  content: string;
  time: number;
  status: TodoState;
}

export class Todos {
  state = [] as Todo[];

  constructor() {
    makeAutoObservable(this);
  }

  add(todo: Todo) {
    this.state.push(todo);
  }

  remove(id: Todo["id"]) {
    this.state = this.state.filter((todo) => todo.id !== id);
  }
}

export const todos = new Todos();
