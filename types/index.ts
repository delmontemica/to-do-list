export interface ICreateTodoRequest {
  text: string;
}

export interface ITodoResponse {
  _id: string;
  createdAt: number;
  isDone: boolean;
  text: string;
}
