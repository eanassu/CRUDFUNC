const bcrypt = require('bcrypt');
const Login = require('../models/loginModel');

exports.showLoginForm = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Login.getByEmail(email);

    if (!user) {
      return res.status(401).render('login', { error: 'E-mail ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(password, user.senha);
    if (!senhaValida) {
      return res.status(401).render('login', { error: 'E-mail ou senha inválidos' });
    }

    req.session.login = user.email;
    res.redirect('/funcionarios');
  } catch (err) {
    console.error(err);
    res.status(500).render('login', { error: 'Erro ao processar autenticação' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
