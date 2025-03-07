const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  todo: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Todo = model("todos", todoSchema);

module.exports = Todo;
