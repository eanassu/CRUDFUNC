const express = require('express');
const bodyParser = require('body-parser');
const funcionarioRoutes = require('./routes/funcionarioRoutes');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/funcionarios', funcionarioRoutes);

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => {
  res.redirect('/funcionarios'); // ou res.render('algumaView') se quiser uma página inicial
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));