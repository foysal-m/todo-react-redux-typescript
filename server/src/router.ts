import express from "express";
const todos = require("./controllers/todo.controller");

const router = express.Router();

router.get("/todos", todos.getAllTodos);

router.post("/todo", todos.postTodo);

router.put("/todo/:id", todos.updateTodo);

router.delete("/todo/:id", todos.deleteTodo);

module.exports = router;
