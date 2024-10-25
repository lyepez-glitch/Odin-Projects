const db = require("../db/queries");

async function getUsernames(req, res) {
    const { search } = req.query;
    const usernames = await db.getAllUsernames();
    if (search) {
        console.log("search", search)

        console.log("Usernames: ", usernames);

        const users = await db.getUserByQuery(search);
        console.log("users", users)
        const filteredUsers = users.map(user => user.username)
        res.render("index", { users: filteredUsers })

    } else {
        const allUsers = usernames.map(user => user.username)
        console.log("allUsers", allUsers);
        res.render("index", { users: allUsers })
    }

}

async function createUsernameGet(req, res) {
    res.render("form", {})
}

async function createUsernamePost(req, res) {
    const { username } = req.body;
    await db.insertUsername(username);
    res.redirect("/");
}
async function deleteUsernames(req, res) {

    await db.deleteAllUsernames();
    console.log("all users deleted")
    res.redirect("/");
}

module.exports = {
    getUsernames,
    createUsernameGet,
    createUsernamePost,
    deleteUsernames
};