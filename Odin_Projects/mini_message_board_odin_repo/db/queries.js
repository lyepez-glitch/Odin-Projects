const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}

async function insertMessage(user, text) {
    console.log('user, text', user, text);
    await pool.query("INSERT INTO messages (username,text) VALUES ($1,$2)", [user, text]);
}
async function updateMessage(msgObj) {
    const { id, user, text } = msgObj;
    const { rows } = await pool.query('UPDATE messages SET username=$2, text=$3 WHERE id=$1', [id, user, text]);

    console.log("row", rows)
    return rows;
}
async function getUserById(id) {
    const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
    console.log("rows", rows)
    return rows;
}
async function deleteMessage(id) {
    const { rows } = await pool.query('DELETE FROM messages WHERE id = $1', [id]);
    console.log("delete res", rows)
    return rows;
}

module.exports = {
    getAllMessages,
    insertMessage,
    getUserById,
    updateMessage,
    deleteMessage
};