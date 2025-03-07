const BASE_URL = "http://localhost:4000";

export const getTodos = () => {
  return fetch(`${BASE_URL}/todos`).then((res) => {
    return res.json();
  });
};

export const postTodo = (body: { todo: string }) => {
  return fetch(`${BASE_URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  });
};
