const { Router } = require("express");
const messageController = require('../controllers/messageController.js');
const db = require('../db/queries');
const msgRouter = Router();
msgRouter.get("/edit/:id", async(req, res) => {
    console.log("params", req.params)
    const { id } = req.params;
    const msg = await db.getUserById(id);
    console.log('msg', msg[0])
    res.render("form", { message: msg[0], edit: true });
})
msgRouter.post("/edit/:id", messageController.editMessage)

msgRouter.get("/new", (req, res) => {
    console.log('form called in line 5')
    res.render("form", { edit: false })
});
msgRouter.post("/new", messageController.createMessagePost)

msgRouter.get("/delete/:id", messageController.deleteMessage);



module.exports = msgRouter;