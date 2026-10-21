const db = require('../config/db');

// DAO do Login (usando Promises / async-await)
const Login = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM logins');
    return rows;
  },

  async getByEmail(email) {
    const [rows] = await db.query('SELECT * FROM logins WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async create(data) {
    const [result] = await db.query('INSERT INTO logins SET ?', [data]);
    return result;
  },

  async update(email, data) {
    const [result] = await db.query('UPDATE logins SET ? WHERE email = ?', [data, email]);
    return result;
  },

  async delete(email) {
    const [result] = await db.query('DELETE FROM logins WHERE email = ?', [email]);
    return result;
  },
};

module.exports = Login;
