const express = require('express')
const app = express()
const port = process.env.Port || 3001


app.listen(port, () => console.log(`server is listening on port: ${port}`))

app.use(express.json())

let essays = []

app.get('/essays', (req, res) => {
    res.json({ essays })
})

app.post('/essays', (req, res) => {
    essays = req.body
    res.json({ essays })
})

app.delete('/essays', (req, res) => {
    const id = req.body.id
    const index = essays.findIndex(item => item.id == id)
    if (index != -1) {
        essays.splice(index, 1)
    }
    res.json({ essays })
})

app.put('/essays', (req, res) => {
    const id = req.body.id
    const content = req.body.content
    const index = essays.findIndex(item => item.id == id)
    if (index != -1) {
        essays[index] = {id, content}
    }
    res.json({ essays })
})



if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}