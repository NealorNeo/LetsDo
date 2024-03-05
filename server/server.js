const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const TodoItem = require('./models/todoItem');

let connectedToDB = false;

async function connectToMongoDB() {
    try {
        await mongoose.connect('mongodb://localhost/mydatabase');
        console.log('Connected to MongoDB');
        connectedToDB = true;
    } catch {
        console.log('Connected to Memory');
    }
}
connectToMongoDB();

app.listen(port, () => console.log(`server is listening on port: ${port}`));
app.use(express.json());

let lists = [];

app.get('/lists', async (req, res) => {
    if (connectedToDB) {
        try {
            const todoItems = await TodoItem.find();
            res.json(todoItems);
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.json({ lists });
    }
}); 

app.post('/lists', async(req, res) => {
    if (connectedToDB) {
        const todoItem = new TodoItem({
            content: req.body.content,
            isCompleted: req.body.isCompleted
            });
        try {
        const savedItem = await todoItem.save();
        res.json(savedItem);
        } catch (err) {
        res.status(400).send(err);
        }
    } else {
        lists.push(req.body);
        res.json({ lists });
        console.log(lists);
    }
});

app.delete('/lists/:id', async (req, res) => {
    if (connectedToDB) {
        try {
            const result = await TodoItem.findByIdAndRemove(req.params.id);
            if (!result) {
            return res.status(404).send('The item not found.');
            }
            res.send(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    } else {
        const id = req.body.id;
        const index = lists.findIndex(item => item.id == id);
        if (index != -1) {
            lists.splice(index, 1);
        }
        res.json({ lists });
    }
});
    
app.put('/lists/:id', async (req, res) => {
    if (connectedToDB) {
        try {
            const todoItem = await TodoItem.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true }
            );
            if (!todoItem) {
            return res.status(404).send('The item not found.');
            }
            res.send(todoItem);
        } catch (err) {
            res.status(500).send(err.message);
        }
    } else {
        const id = req.body.id;
        const content = req.body.content;
        const index = lists.findIndex(item => item.id == id);
        if (index != -1) {
            lists[index] = {id, content};
        }
        res.json({ lists });
    }
});

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}