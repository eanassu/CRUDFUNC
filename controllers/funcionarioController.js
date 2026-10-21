const Funcionario = require('../models/funcionarioModel');

exports.inicio = (req, res) => {
  res.render('funcionarios/index');
};

// Listar todos os usuários
exports.listFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.getAll();
    res.render('funcionarios/list', { funcionarios });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar Funcionários');
  }
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
exports.createFuncionario = async (req, res) => {
  try {
    const dataAdmissao = formatDateToMySQL(req.body.dataAdmissao);
    const { re, nome, salario } = req.body;
    await Funcionario.create({ re, nome, dataAdmissao, salario });
    res.redirect('/funcionarios');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar Funcionário');
  }
};

// formata a data para o formato brasileiro 'dd/MM/yyyy'
function formatDateToBR(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return day + '/' + month + '/' + year;
}

// Exibir formulário de edição (suporta parâmetro de rota /:re/edit ou query ?re=...)
exports.showEditForm = async (req, res) => {
  try {
    const re = req.params.re || req.query.re || req.body.re;
    const funcionario = await Funcionario.getByRe(re);
    if (!funcionario) {
      return res.status(404).send('Funcionário não encontrado');
    }
    funcionario.dataAdmissao = formatDateToBR(funcionario.dataAdmissao);
    res.render('funcionarios/edit', { funcionario });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar Funcionário');
  }
};

// Atualizar usuário
exports.updateFuncionario = async (req, res) => {
  try {
    const dataAdmissao = formatDateToMySQL(req.body.dataAdmissao);
    const { re } = req.params;
    const { nome, salario } = req.body;
    await Funcionario.update(re, { nome, dataAdmissao, salario });
    res.redirect('/funcionarios');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar funcionário');
  }
};

// Deletar usuário (suporta parâmetro de rota /:re ou body.re)
exports.deleteFuncionario = async (req, res) => {
  try {
    const re = req.params.re || req.body.re;
    await Funcionario.delete(re);
    res.redirect('/funcionarios');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao excluir funcionário');
  }
};

// exibe a tela de exclusão
exports.showDeleteForm = (req, res) => {
  res.render('funcionarios/deleteForm');
};

// exibe a tela de busca
exports.showSearchForm = (req, res) => {
  res.render('funcionarios/searchForm');
};
