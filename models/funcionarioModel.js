const db = require('../config/db');

// DAO do Funcionario (usando Promises / async-await)
const Funcionario = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM funcionarios');
    return rows;
  },

  async getByRe(re) {
    const [rows] = await db.query('SELECT * FROM funcionarios WHERE re = ?', [re]);
    return rows[0] || null;
  },

  async create(data) {
    const [result] = await db.query('INSERT INTO funcionarios SET ?', [data]);
    return result;
  },

  async update(re, data) {
    const [result] = await db.query('UPDATE funcionarios SET ? WHERE re = ?', [data, re]);
    return result;
  },

  async delete(re) {
    const [result] = await db.query('DELETE FROM funcionarios WHERE re = ?', [re]);
    return result;
  },
};

module.exports = Funcionario;
