import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, {collection: "TodoList"});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
