create database if not exists CRUD;

use CRUD;

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

Insert into logins (email, senha) 
values ('teste@teste.com', '$2b$10$dT4YwdZeabGemhqv5ESUI.9Fr.16nCPg3f3jJ551fIN6BzmbYQfKq')
on duplicate key update logins.email=logins.email;
