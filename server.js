const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');

const ToDo = require("./mongoose/todo");

import schema from './graphql/schema/Schema';

const app = express();

mongoose.connect('mongodb://localhost:27017/todo')
const db = mongoose.connection;
db.on('error', () => { console.log('---FAILED to connect to mongoose') })
db.once('open', () => {
    console.log('+++Connected to mongoose')
});

app.use(bodyParser());

// start the server
app.listen(3002, () => { console.log("+++Express Server is Running at 3002 port!!!") });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/quotes', (req, res) => {
    // Insert into TodoList Collection
    const todoItem = new ToDo({
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