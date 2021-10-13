import { getStorage, setStorage } from "@tarojs/taro";
import { makeAutoObservable, runInAction } from "mobx";
import { toStream } from "mobx-utils";
import { from } from "rxjs";
import { switchMap, throttleTime } from "rxjs/operators";

const storageKey = "todos";

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

  update(id: Todo["id"], newTodo: Partial<Todo>) {
    const idx = this.state.findIndex((todo) => todo.id === id);
    if (idx === -1) throw Error("未找到可用的id");
    this.state[idx] = {
      ...this.state[idx],
      ...newTodo,
    };
  }

  remove(id: Todo["id"]) {
    this.state = this.state.filter((todo) => todo.id !== id);
  }

  async load() {
    this.state = [];
    try {
      const todos: Todo[] = await (await getStorage({ key: storageKey })).data;
      runInAction(() => {
        this.state = todos;
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const todos = new Todos();

from(toStream(() => [...todos.state]))
  .pipe(
    throttleTime(1000),
    switchMap((state) => from(setStorage({ key: storageKey, data: state })))
  )
  .subscribe(console.log);
