const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Listar todos os usuários
router.get('/', funcionarioController.inicio);

router.get('/list', funcionarioController.listFuncionarios);

// Deletar usuário
router.post('/delete', funcionarioController.deleteFuncionario);

// Exibir formulário para novo usuário
router.get('/new', funcionarioController.showCreateForm);

// Criar novo usuário
router.post('/new', funcionarioController.createFuncionario); // ou use PUT com method-override

router.get('/search', funcionarioController.showSearchForm);

// Exibir formulário de edição de um usuário
router.post('/edit', funcionarioController.showEditForm);

// Atualizar usuário
router.post('/:re', funcionarioController.updateFuncionario); // ou use PUT com method-override


// Exibir formulário para novo usuário
router.get('/showDelete', funcionarioController.showDeleteForm);

module.exports = router;