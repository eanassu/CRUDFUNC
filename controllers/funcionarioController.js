const Funcionario = require('../models/funcionarioModel');

exports.inicio = (req, res) => {
  res.render('funcionarios/index');
};

// Listar todos os usuários
exports.listFuncionarios = (req, res) => {
  Funcionario.getAll((err, results) => {
  console.log(results);
  if (err) return res.status(500).send('Erro ao buscar Funcionários');
    res.render('funcionarios/list', { funcionarios: results });
  });
};

// Exibir formulário de novo usuário
exports.showCreateForm = (req, res) => {
  res.render('funcionarios/new');
};

// Função utilitária para converter 'dd/MM/yyyy' para 'yyyy-MM-dd'
function formatDateToMySQL(dateStr) {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split('/');
  return year + '-' + month.padStart(2, '0') + '-' + day.padStart(2, '0');
}

// Criar novo usuário
exports.createFuncionario = (req, res) => {
  req.body.dataAdmissao = formatDateToMySQL(req.body.dataAdmissao);
  const { re, nome, dataAdmissao, salario } = req.body;
  Funcionario.create({ re, nome, dataAdmissao, salario }, err => {
    if (err) return res.status(500).send('Erro ao criar Funcionário');
    res.redirect('/funcionarios');
  });
};

function formatDateToBR(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return day+'/'+month+'/'+year;
}

// Exibir formulário de edição
exports.showEditForm = (req, res) => {
  const { re } = req.body;
  Funcionario.getByRe(re, (err, results) => {
    if (err || results.length === 0) return res.status(404).send('Funcionário não encontrado');
    results[0].dataAdmissao = formatDateToBR(results[0].dataAdmissao);
    res.render('funcionarios/edit', { funcionario: results[0] });
  });
};

// Atualizar usuário
exports.updateFuncionario = (req, res) => {
  req.body.dataAdmissao = formatDateToMySQL(req.body.dataAdmissao);
  const { re } = req.params;
  const { nome, dataAdmissao, salario } = req.body;
  Funcionario.update(re, { nome, dataAdmissao, salario }, err => {
    if (err) return res.status(500).send('Erro ao atualizar funcionário');
    res.redirect('/funcionarios');
  });
};

// Deletar usuário
exports.deleteFuncionario = (req, res) => {
  const { re } = req.body;
  Funcionario.delete(re, err => {
  if (err) return res.status(500).send('Erro ao excluir funcionário');
    res.redirect('/funcionarios');
  });
};

exports.showDeleteForm = (req, res) => {
  res.render('funcionarios/deleteForm');
};

exports.showSearchForm = (req, res) => {  
  res.render('funcionarios/searchForm');
};