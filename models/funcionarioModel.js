const db = require('../config/db');

const Funcionario = {
  getAll: cb => db.query('SELECT * FROM FUNCIONARIOS', cb),
  getByRe: (re, cb) => db.query('SELECT * FROM FUNCIONARIOS WHERE re = ?', [re], cb),
  create: (data, cb) => db.query('INSERT INTO FUNCIONARIOS SET ?', data, cb),
  update: (re, data, cb) => db.query('UPDATE FUNCIONARIOS SET ? WHERE RE = ?', [data, re], cb),
  delete: (re, cb) => db.query('DELETE FROM FUNCIONARIOS WHERE RE = ?', [re], cb),
};

module.exports = Funcionario;