const express = require('express');
const app = express();
const fs = require('node:fs');

const PORT = 3000;
app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));

app.get("/", (req, res) => {
    fs.readFile('./index.html', 'utf8', (err, data) => {
        if (err) {
            res.send('./404.html', 'utf8', (err, data) => {
                res.send(data);
            })
            return;
        }
        res.send(data);
    });
})

app.get("/about", (req, res) => {
    fs.readFile('./about.html', 'utf8', (err, data) => {
        if (err) {
            fs.readFile('./404.html', 'utf8', (err, data) => {
                res.send(data);
            })
            return;
        }
        res.send(data);
    });
})

app.get("/contact-me", (req, res) => {
    fs.readFile('./contact-me.html', 'utf8', (err, data) => {
        if (err) {
            fs.readFile('./404.html', 'utf8', (err, data) => {
                res.end(data);
            })
            return;
        }
        res.send(data);
    });
})