const bcrypt = require('bcrypt');
const Login = require('../models/loginModel');

exports.showLoginForm = (req, res) => {
  res.render('login');
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = Login.getByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.render('login', { error: 'Login não encontrado' });
    bcrypt.compare(password, results[0].senha, (err, result) => {
      if (result) {
        console.log('Senha correta');
        req.session.login = results[0].email;
        res.redirect('/funcionarios');
      } else {
        res.render('login', { error: 'Senha incorreta' });
      }
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};