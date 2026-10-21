const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');
const { requireLogin } = require('../middlewares/authMiddleware');

// Aplica autenticação em todas as rotas de funcionários de uma só vez
router.use(requireLogin);

// Tela inicial
router.get('/', funcionarioController.inicio);

// Listar todos os funcionários
router.get('/list', funcionarioController.listFuncionarios);

// Exibir formulário para novo funcionário e criar funcionário
router.get('/new', funcionarioController.showCreateForm);
router.post('/new', funcionarioController.createFuncionario);

// Exibir tela de busca e formulário de edição (via GET)
router.get('/search', funcionarioController.showSearchForm);
router.get('/edit', funcionarioController.showEditForm);
router.get('/:re/edit', funcionarioController.showEditForm);

// Exibir tela de exclusão e deletar funcionário (via DELETE com method-override)
router.get('/showDelete', funcionarioController.showDeleteForm);
router.delete('/delete', funcionarioController.deleteFuncionario);
router.delete('/:re', funcionarioController.deleteFuncionario);

// Atualizar funcionário (via PUT com method-override)
router.put('/:re', funcionarioController.updateFuncionario);

module.exports = router;
