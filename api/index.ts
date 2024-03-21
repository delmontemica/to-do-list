import { ICreateTodoRequest } from "@/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_USER}`;

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * [GET] List to-dos
 */
export async function fetchTodoList() {
  const data = await httpClient.get("/todos");

  return data.data;
}

/**
 * [POST] Create a to-do
 */
export async function createTodoItem(params: ICreateTodoRequest) {
  const data = await httpClient.post("/todos/create", params, {
    baseURL: API_URL,
  });

  return data.data;
}

/**
 * [PUT] Mark/unmark a to-do as done
 */
export async function markUnmarkTodoItem(id: string) {
  const data = await httpClient.put(`/todos/${id}/toggle`, {
    baseURL: API_URL,
  });

  return data.data;
}

/**
 * [DELETE] Delete a to-do
 */
export async function deleteTodoItem(id: string) {
  const data = await httpClient.delete(`/todos/${id}`, {
    baseURL: API_URL,
  });

  return data.data;
}
