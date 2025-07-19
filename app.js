const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(session({
  secret: 'chave-secreta-teste',
  resave: false,
  saveUninitialized: false
}));   

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/funcionarios', funcionarioRoutes);
app.use(authRoutes);

app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
  res.redirect('/funcionarios'); // ou res.render('algumaView') se quiser uma página inicial
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));