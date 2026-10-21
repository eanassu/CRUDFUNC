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
