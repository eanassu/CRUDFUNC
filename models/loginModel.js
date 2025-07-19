const db = require('../config/db');

const Login = {
    getAll: cb => db.query('SELECT * FROM LOGINS', cb),
    getByEmail: (email, cb) => db.query('SELECT * FROM LOGINS WHERE EMAIL = ?', [email], cb),
    create: (data, cb) => db.query('INSERT INTO LOGINS SET ?', data, cb),
    update: (email, data, cb) => db.query('UPDATE LOGINS SET ? WHERE EMAIL = ?', [data, email], cb),
    delete: (email, cb) => db.query('DELETE FROM LOGINS WHERE EMAIL = ?', [email], cb),
};

module.exports = Login;