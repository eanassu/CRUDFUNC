use crud;

create table Funcionarios(
    re int, 
    nome varchar(50),
    dataAdmissao date,
    salario decimal(15,2),
    primary key(re));
    
 create table logins(
    email varchar(255),
    senha varchar(2000),
    primary key(email)); 