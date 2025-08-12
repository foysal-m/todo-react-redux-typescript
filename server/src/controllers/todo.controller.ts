import { Request, Response } from "express";

const Todos = require("../models/todo.model");

exports.getAllTodos = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * limit;

    const totalCount = await Todos.countDocuments();

    const todos = await Todos.find().skip(skip).limit(limit);

    res.status(200).send({
      todos,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      perPage: limit,
    });
  } catch (err) {
    console.error("Error in getAllTodos", err);
    res.status(500).send(err);
  }
};

exports.postTodo = async (req: Request, res: Response) => {
  try {
    const { todo } = req.body;
    const todoCreated = await Todos.create({ todo });
    res.status(200);
    res.send(todoCreated);
  } catch (err) {
    console.error("Error postTodos", err);
    res.status(500);
    res.send(err);
  }
};

exports.updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const result = await Todos.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ message: "Todo not found" });
    }

    res.status(200).send(result);
  } catch (err) {
    console.error("Error updating todo", err);
    res.status(500).send({ message: "Server error" });
  }
};

exports.deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Todos.findByIdAndDelete(id);
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "todos not found" });
    }

    res.status(200).send({ message: "todo deleted successfully" });
  } catch (err) {
    console.error("Error postTopics", err);
    res.status(500);
    res.send(err);
  }
};
