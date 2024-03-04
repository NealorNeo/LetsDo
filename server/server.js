const express = require('express')
const app = express()
const port = process.env.PORT || 3001
// const cors = require('cors');

// app.use(cors());
app.listen(port, () => console.log(`server is listening on port: ${port}`));
app.use(express.json());

let lists = [];

app.get('/lists', (req, res) => {
    res.json({ lists });
});

app.post('/lists', (req, res) => {
    lists = req.body;
    res.json({ lists });
});

app.delete('/lists', (req, res) => {
    const id = req.body.id;
    const index = lists.findIndex(item => item.id == id);
    if (index != -1) {
        lists.splice(index, 1);
    }
    res.json({ lists });
});

app.put('/lists', (req, res) => {
    const id = req.body.id;
    const content = req.body.content;
    const index = lists.findIndex(item => item.id == id);
    if (index != -1) {
        lists[index] = {id, content};
    }
    res.json({ lists });
});



if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}