import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TodoType = {
  _id: string;
  todo: string;
  created_at: string;
  completed: boolean;
};

export const todosApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  reducerPath: "todoApi",
  tagTypes: ["Todos"],
  endpoints: build => ({
    getTodos: build.query<TodoType[], void>({
      query: () => "/todos",
      providesTags: result => (result ? [{ type: "Todos", id: "LIST" }] : []),
    }),

    postTodo: build.mutation<TodoType, { todo: string }>({
      query: body => ({
        url: "/todo",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    deleteTodo: build.mutation<{ success: boolean }, string>({
      query: id => ({
        url: `/todo/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    updateTodo: build.mutation<
      { success: boolean },
      { id: string; completed: boolean }
    >({
      query: ({ id, completed }) => ({
        url: `/todo/${id}`,
        method: "PUT",
        body: { completed },
      }),

      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todosApiSlice;
