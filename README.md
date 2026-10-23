# CRUDFUNC — Sistema de Gerenciamento de Funcionários

Aplicação web em **Node.js** estruturada no padrão **MVC (Model-View-Controller)** para gerenciamento completo (**CRUD**) de funcionários, contando com autenticação baseada em sessão, criptografia de senhas, proteção de cabeçalhos HTTP, limitação de tentativas de login (*rate limiting*) e persistência em banco de dados **MySQL**.

---

## 📋 Funcionalidades

- **Autenticação e Controle de Acesso**:
  - Login com verificação de senha criptografada (`bcrypt`).
  - Proteção contra força bruta na rota de login (`express-rate-limit` — limite de 10 tentativas a cada 15 minutos por IP).
  - Gerenciamento de sessão com cookies seguros (`httpOnly`, `sameSite: 'lax'`, expiração de 1 hora).
  - Middleware de autenticação (`requireLogin`) que protege todas as rotas de `/funcionarios`.
- **CRUD de Funcionários**:
  - **Cadastrar (`CREATE`)**: Registro de funcionário com RE (Registro de Empregado), Nome, Data de Admissão e Salário.
  - **Listar e Buscar (`READ`)**: Listagem completa de funcionários cadastrados e busca individual por RE.
  - **Editar (`UPDATE`)**: Atualização de dados cadastrais via método HTTP `PUT` (suportado em formulários HTML com `method-override`).
  - **Excluir (`DELETE`)**: Remoção de funcionário por RE via método HTTP `DELETE`.

---

## 🗂️ Arquitetura e Estrutura de Pastas

```text
CRUDFUNC/
├── config/
│   └── db.js                      # Pool de conexões com o MySQL (mysql2/promise)
├── controllers/
│   ├── authController.js          # Lógica de login e logout
│   └── funcionarioController.js   # Lógica de negócio e formatação de dados do CRUD
├── middlewares/
│   └── authMiddleware.js          # Middleware de proteção de rotas autenticadas
├── models/
│   ├── funcionarioModel.js        # DAO da tabela 'funcionarios'
│   └── loginModel.js              # DAO da tabela 'logins'
├── routes/
│   ├── authRoutes.js              # Rotas de autenticação (/login, /logout)
│   └── funcionarioRoutes.js       # Rotas do CRUD (/funcionarios/*)
├── views/
│   ├── funcionarios/              # Páginas EJS do módulo de funcionários
│   ├── partials/                  # Cabeçalho e rodapé compartilhados (Bootstrap)
│   └── login.ejs                  # Tela de login
├── .env.example                   # Exemplo de variáveis de ambiente
├── app.js                         # Ponto de entrada e configuração do servidor Express
├── compose.yaml                   # Configuração Docker Compose
├── Dockerfile                     # Imagem Docker para a aplicação Node.js
├── db.sql                         # Script SQL de criação das tabelas
├── geraSenha.js                   # Utilitário CLI para gerar hash bcrypt de senhas
└── package.json                   # Manifesto do projeto e dependências
```

---

## 📦 Bibliotecas Utilizadas

| Biblioteca | Versão | Finalidade no Projeto |
| :--- | :--- | :--- |
| **[express](https://expressjs.com/)** | `^5.1.0` | Framework web principal para roteamento, middlewares e servidor HTTP. |
| **[mysql2](https://sidorares.github.io/node-mysql2/)** | `^3.14.1` | Driver MySQL com suporte a `Promises` (`mysql2/promise`) e *connection pooling*. |
| **[ejs](https://ejs.co/)** | `^3.1.10` | Motor de visualização (*template engine*) para renderização dinâmica das páginas HTML no servidor. |
| **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** | `^6.0.0` | Geração de hashes e validação segura de senhas dos usuários. |
| **[express-session](https://github.com/expressjs/session)** | `^1.18.2` | Controle de sessões de usuários autenticados via cookies. |
| **[helmet](https://helmetjs.github.io/)** | `^8.3.0` | Segurança da aplicação por meio da configuração de cabeçalhos HTTP e *Content Security Policy (CSP)*. |
| **[express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)** | `^8.7.1` | Limitação de requisições repetidas na rota de login para mitigar ataques de força bruta. |
| **[method-override](https://github.com/expressjs/method-override)** | `^3.0.0` | Permite o uso de verbos HTTP como `PUT` e `DELETE` a partir de formulários HTML (`?_method=PUT` / `?_method=DELETE`). |
| **[dotenv](https://github.com/motdotla/dotenv)** | `^18.0.8` | Carregamento de variáveis de ambiente a partir do arquivo `.env`. |

> **Front-end**: As views `.ejs` utilizam **Bootstrap (via CDN)** para estilização das tabelas, formulários e barra de navegação.

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- **[Node.js](https://nodejs.org/)** (recomendado v18+ ou v22 LTS) e **npm**
- **[MySQL Server](https://dev.mysql.com/downloads/mysql/)** (em execução local ou remota)
- *(Opcional)* **Docker** e **Docker Compose** para execução em contêiner

---

## 🚀 Instalação e Configuração Passo a Passo

### 1. Clonar ou acessar o diretório do projeto
```bash
cd CRUDFUNC
```

### 2. Instalar as dependências
Execute o comando abaixo na raiz do projeto para instalar todas as bibliotecas listadas no `package.json`:
```bash
npm install
```

### 3. Configurar as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto copiando o modelo `.env.example`:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com as credenciais do seu servidor MySQL e defina uma chave secreta para a sessão:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=crud

SESSION_SECRET=sua-chave-secreta-aqui
```

### 4. Criar o Banco de Dados e as Tabelas
Conecte-se ao seu MySQL e crie o banco de dados `crud` e as tabelas utilizando o script `db.sql`:
```sql
CREATE DATABASE IF NOT EXISTS crud;
USE crud;

CREATE TABLE IF NOT EXISTS funcionarios (
    re INT,
    nome VARCHAR(50),
    dataAdmissao DATE,
    salario DECIMAL(15,2),
    PRIMARY KEY (re)
);

CREATE TABLE IF NOT EXISTS logins (
    email VARCHAR(255),
    senha VARCHAR(2000),
    PRIMARY KEY (email)
);
```
Ou execute diretamente pelo terminal:
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS crud;"
mysql -u root -p crud < db.sql
```

### 5. Criar um Usuário de Login
As senhas salvas na tabela `logins` devem estar criptografadas com **bcrypt**.
1. Caso queira alterar a senha padrão (`senha123`), edite a constante `senha` no arquivo `geraSenha.js`.
2. Gere o hash executando:
   ```bash
   node geraSenha.js
   ```
3. Copie o hash exibido no terminal e insira um registro na tabela `logins` do MySQL:
   ```sql
   USE crud;
   INSERT INTO logins (email, senha) VALUES ('admin@empresa.com', '$2b$10$HASH_GERADO_AQUI');
   ```

---

## ▶️ Instruções de Execução

### Execução Local (Node.js)
No terminal, na raiz do projeto, execute:
```bash
node app.js
```
O servidor iniciará na porta configurada (padrão `3000`):
```text
Servidor rodando na porta 3000
```
Acesse no navegador: **[http://localhost:3000](http://localhost:3000)** (você será redirecionado para `/login` caso não esteja autenticado).

### Execução via Docker (Opcional)
Para subir a aplicação em contêiner utilizando Docker Compose:
```bash
docker compose up --build
```
*(Certifique-se de configurar a comunicação com a instância do MySQL através das variáveis de ambiente).*

---

## 🛣️ Principais Rotas da Aplicação

| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Redireciona para `/funcionarios` | — |
| `GET` | `/login` | Exibe a tela de login | Pública |
| `POST` | `/login` | Autentica o usuário (com *rate limit*) | Pública |
| `POST` | `/logout` | Encerra a sessão do usuário | Pública |
| `GET` | `/funcionarios` | Página inicial do painel de funcionários | Requer Login |
| `GET` | `/funcionarios/list` | Lista todos os funcionários cadastrados | Requer Login |
| `GET` | `/funcionarios/new` | Formulário de cadastro de funcionário | Requer Login |
| `POST` | `/funcionarios/new` | Cria um novo funcionário no banco | Requer Login |
| `GET` | `/funcionarios/search` | Formulário de busca por RE para edição | Requer Login |
| `GET` | `/funcionarios/edit` ou `/funcionarios/:re/edit` | Carrega os dados do funcionário para edição | Requer Login |
| `PUT` | `/funcionarios/:re` | Atualiza os dados de um funcionário | Requer Login |
| `GET` | `/funcionarios/showDelete` | Formulário para exclusão por RE | Requer Login |
| `DELETE` | `/funcionarios/delete` ou `/funcionarios/:re` | Exclui o funcionário do banco de dados | Requer Login |
