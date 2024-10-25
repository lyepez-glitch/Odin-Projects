const express = require('express')
const messageController = require('./controllers/messageController');
const app = express()
const port = 3000;
const path = require('path');
const msgRouter = require("./routes/msgRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/messages", msgRouter);



app.get("/", messageController.getMessages);







app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})