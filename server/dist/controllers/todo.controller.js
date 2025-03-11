"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todos = require("../models/todo.model");
exports.getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todos.find();
        res.status(200);
        res.send(todos);
    }
    catch (err) {
        console.error("Error in getAllTodos", err);
        res.status(500);
        res.send(err);
    }
});
exports.postTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todo } = req.body;
        const todoCreated = yield Todos.create({ todo });
        res.status(200);
        res.send(todoCreated);
    }
    catch (err) {
        console.error("Error postTodos", err);
        res.status(500);
        res.send(err);
    }
});
exports.updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const result = yield Todos.findByIdAndUpdate(id, { completed }, { new: true });
        if (!result) {
            return res.status(404).send({ message: "Todo not found" });
        }
        res.status(200).send(result);
    }
    catch (err) {
        console.error("Error updating todo", err);
        res.status(500).send({ message: "Server error" });
    }
});
exports.deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Todos.findByIdAndDelete(id);
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "todos not found" });
        }
        res.status(200).send({ message: "todo deleted successfully" });
    }
    catch (err) {
        console.error("Error postTopics", err);
        res.status(500);
        res.send(err);
    }
});
