require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
const userController = require('./controllers/userController');
const links = [
    { href: "/", text: "Home" },
    { href: "about", text: "About" },
];

app.get("/", userController.getUsernames);
app.get("/new", (req, res) => {
    res.render("form", {});
});
app.post("/new", userController.createUsernamePost);
app.get("/delete", userController.deleteUsernames);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})