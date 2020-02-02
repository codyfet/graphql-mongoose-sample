import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';

import Todo from "./mongoose/todo";
import schema from './graphql/schema/Schema';

mongoose.connect('mongodb://localhost:27017/todo')

/**
 * Подключаемся к БД.
 */
const db = mongoose.connection;

db.on('error', () => {
    console.log('---FAILED to connect to mongoose');
});
db.once('open', () => {
    console.log('+++Connected to mongoose');
});

/**
 * Создаём серверное приложение.
 */
const app = express();

app.use(bodyParser());

app.listen(3002, () => {
    console.log("+++Express Server is Running at 3002 port!!!");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/quotes', (req, res) => {
    const todoItem = new Todo({
        itemId: 1,
        item: req.body.item,
        completed: false
    })
    todoItem.save((err, result) => {
        if (err) { console.log("---TodoItem save failed " + err) }
        console.log("+++TodoItem saved successfully " + todoItem.item)
        res.redirect('/')
    })
});

app.use('/graphql', graphqlHTTP(req => {
    return{
        schema
        //,graphiql:true
    }
}));