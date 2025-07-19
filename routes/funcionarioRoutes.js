const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');
const authController = require('../controllers/authController');

function requireLogin(req, res, next) {
  if ( !req.session || (req.session && !req.session.login)) return res.redirect('/login');
  next();
}

// Listar todos os usuários
router.get('/', requireLogin, funcionarioController.inicio);

router.get('/list', requireLogin, funcionarioController.listFuncionarios);

// Deletar usuário
router.post('/delete', requireLogin, funcionarioController.deleteFuncionario);

// Exibir formulário para novo usuário
router.get('/new', requireLogin, funcionarioController.showCreateForm);

// Criar novo usuário
router.post('/new', requireLogin, funcionarioController.createFuncionario); // ou use PUT com method-override

router.get('/search', requireLogin, funcionarioController.showSearchForm);

// Exibir formulário de edição de um usuário
router.post('/edit', requireLogin, funcionarioController.showEditForm);

// Atualizar usuário
router.post('/:re', requireLogin, funcionarioController.updateFuncionario); // ou use PUT com 7method-override


// Exibir formulário para novo usuário
router.get('/showDelete', requireLogin, funcionarioController.showDeleteForm);

router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


module.exports = router;