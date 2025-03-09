describe("Todo list", () => {
  const todoText = "Test Todo";
  const todoId = "mocked-id-1234";

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should show a form, submit a todo, and show it in the list", () => {
    cy.intercept("POST", "http://localhost:4000/todo", {
      statusCode: 201,
      body: {
        todo: todoText,
        completed: false,
        _id: "mocked-id-1234",
        created_at: new Date().toISOString(),
        __v: 0,
      },
    }).as("postTodo");

    cy.intercept("GET", "http://localhost:4000/todos", {
      statusCode: 200,
      body: [
        {
          todo: todoText,
          completed: false,
          _id: "mocked-id-1234",
          created_at: new Date().toISOString(),
          __v: 0,
        },
      ],
    }).as("getTodos");

    cy.contains("Add Todo").should("be.visible");

    cy.wait(2000);

    cy.get('input[name="todo"]').type(todoText);
    cy.wait(2000);
    cy.get('button[type="submit"]').click();

    cy.wait("@postTodo");

    cy.wait("@getTodos");
    cy.wait(2000);
    cy.contains(todoText).should("be.visible");
  });

  it("should add a todo and delete it when the delete button is clicked", () => {
    cy.intercept("POST", "http://localhost:4000/todo", {
      statusCode: 201,
      body: {
        todo: "fix this code",
        completed: false,
        _id: todoId,
        created_at: new Date().toISOString(),
        __v: 0,
      },
    }).as("postTodo");

    cy.intercept("GET", "http://localhost:4000/todos", {
      statusCode: 200,
      body: [
        {
          todo: todoText,
          completed: false,
          _id: todoId,
          created_at: new Date().toISOString(),
          __v: 0,
        },
      ],
    }).as("getTodosAfterPost");

    cy.intercept("DELETE", `http://localhost:4000/todo/${todoId}`, {
      statusCode: 200,
      body: [],
    }).as("deleteTodo");

    cy.contains("Add Todo").should("be.visible");
    cy.get('input[name="todo"]').type(todoText);
    cy.wait(2000);
    cy.get('button[type="submit"]').click();

    cy.wait("@postTodo");

    cy.wait("@getTodosAfterPost");
    cy.wait(2000);
    cy.get('button[aria-label="Delete todo"]').click();

    cy.wait("@deleteTodo");
    cy.wait(2000);
    cy.contains("fix this code").should("not.exist");
  });
});
