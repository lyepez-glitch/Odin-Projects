const db = require("../db/queries");

async function getMessages(req, res) {
    const messagesPromise = await db.getAllMessages();
    const messages = await messagesPromise;
    console.log('messages =>', messages)
    res.render('index', { messages });
    // res.send("messages: " + messages.map(user => user.message).join(", "));
}

async function createMessageGet(req, res) {
    res.render('form', {})
}
async function createMessagePost(req, res) {
    console.log('req body', req.body)
    const { author, msg } = req.body;
    await db.insertMessage(author, msg);

    res.redirect("/");

}
async function editMessage(req, res) {
    console.log('req params', req.params)
    const { id } = req.params;
    const { author, msg } = req.body;
    const result = await db.updateMessage({ id, user: author, text: msg });
    console.log('update res', result);
    res.redirect("/");

}
async function deleteMessage(req, res) {
    console.log('req params', req.params)
    const { id } = req.params;

    const result = await db.deleteMessage(id);

    res.redirect("/");

}

module.exports = {
    getMessages,
    createMessageGet,
    createMessagePost,
    editMessage,
    deleteMessage
};