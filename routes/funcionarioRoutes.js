const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');
const authController = require('../controllers/authController');

function requireLogin(req, res, next) {
  if ( !req.session || (req.session && !req.session.login)) return res.redirect('/login');
  next();
}

// tela inicial
router.get('/', requireLogin, funcionarioController.inicio);

// Listar todos os usuários
router.get('/list', requireLogin, funcionarioController.listFuncionarios);

// Deletar usuário
router.post('/delete', requireLogin, funcionarioController.deleteFuncionario);

// Exibir formulário para novo usuário
router.get('/new', requireLogin, funcionarioController.showCreateForm);

// Criar novo usuário
router.post('/new', requireLogin, funcionarioController.createFuncionario); // ou use PUT com method-override

// exibe tela de busca
router.get('/search', requireLogin, funcionarioController.showSearchForm);

// Exibir formulário de edição de um usuário
router.post('/edit', requireLogin, funcionarioController.showEditForm);

// Atualizar usuário
router.post('/:re', requireLogin, funcionarioController.updateFuncionario); // ou use PUT com 7method-override

// Exibir formulário para novo usuário
router.get('/showDelete', requireLogin, funcionarioController.showDeleteForm);

// exibe tela de login
router.get('/login', authController.showLoginForm);
// trata o login
router.post('/login', authController.login);
// executa logout
router.get('/logout', authController.logout);

module.exports = router;