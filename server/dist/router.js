"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos = require("./controllers/todo.controller");
const router = express_1.default.Router();
router.get("/todos", todos.getAllTodos);
router.post("/todo", todos.postTodo);
router.put("/todo/:id", todos.updateTodo);
router.delete("/todo/:id", todos.deleteTodo);
module.exports = router;
