const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  content: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const TodoItem = mongoose.model('TodoItem', todoItemSchema);

module.exports = TodoItem;
