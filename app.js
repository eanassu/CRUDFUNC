require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const methodOverride = require('method-override');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

// Protege os cabeçalhos HTTP (permitindo o CDN do Bootstrap nas views)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
    },
  },
}));

// cria a sessão para login com configurações seguras de cookie
app.use(session({
  secret: process.env.SESSION_SECRET || 'chave-secreta-fallback-dev',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 // 1 hora
  }
}));

// Parsers nativos do Express e suporte a PUT/DELETE via method-override
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(authRoutes);
app.use('/funcionarios', funcionarioRoutes);

app.get('/', (req, res) => {
  res.redirect('/funcionarios');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
