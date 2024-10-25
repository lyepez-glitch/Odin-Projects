const pool = require("./pool");

async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}
async function deleteAllUsernames() {
    const { rows } = await pool.query("DELETE FROM usernames");
    return rows;
}
async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}
async function getUserByQuery(query) {
    const { rows } = await pool.query('SELECT * FROM usernames WHERE username LIKE $1', ['%' + query + '%']);
    console.log("rows", rows)
    return rows;
}

module.exports = {
    getAllUsernames,
    insertUsername,
    getUserByQuery,
    deleteAllUsernames
};