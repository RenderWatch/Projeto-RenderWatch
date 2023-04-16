create database RenderWatchDB;

use RenderWatchDB;

create table Empresa (
	id int primary key auto_increment,
    razaoSocial varchar(45),
    cnpj char(14),
    telefone varchar(15),
    logradouro varchar(60),
    numero int,
    bairro varchar(45),
    complemento varchar(45),
    cidade varchar(45),
    estado varchar(45),
    cep varchar(45)
);

create table Usuario (
	id int primary key auto_increment,
    nome varchar(45),
    sobrenome varchar(45),
    email varchar(100),
    senha varchar(30),
    telefone varchar(15),
    cpf char(11),
    adm tinyint,
    empresa_id int,
    foreign key (empresa_id) references Empresa (id)
);

create table Cluster (
	id int primary key auto_increment,
    nome  varchar (45)
);

create table  Maquina (	
	id int primary key auto_increment,
	apelido double,
    sistema_operacional varchar(45),
    fabricante varchar(45),
    arquitetura varchar(45),
    cluster_id int,
    foreign key (cluster_id) references Cluster (id)
);

create table MetricaComponente (
	id int primary key auto_increment,
    limite double,
    componente varchar(45)
);

create table Componente (
	id int primary key auto_increment,
    nome varchar(45),
    modelo varchar(45),
    total double,
    identificador varchar(45),
    tipo varchar(45),
    frequencia double,
    maquina_id int,
    metrica_id int,
    foreign key (maquina_id) references Maquina (id),
    foreign key (metrica_id) references MetricaComponente (id)
);

create table RegistroComponente (
	id int primary key auto_increment,
    em_uso double,
    dt_hora datetime,
    bytes_leitura double,
    bytes_escrita double,
    componente_id int,
    foreign key (componente_id) references Componente (id)
);

create table Rede (
	id int primary key auto_increment,
    nome varchar(45),
    ipv4 varchar(45),
    ipv6 varchar(45),
    endereco_mac varchar(45),
    nome_dominio varchar(45),
    hostname varchar(45),
    dns varchar(45),
    maquina_id int,
    metrica_id int,
    foreign key (maquina_id) references Maquina (id),
    foreign key (metrica_id) references MetricaComponente (id)
);

create table MetricaRede (
	id int primary key auto_increment,
    limite_dados_enviados Double,
    limite_dados_recebidos Double
);

create table RegistroRede (
	id int primary key auto_increment,
    bytes_enviados int,
    bytes_recebidos int,
    dt_hora datetime,
    rede_id int,
    foreign key (rede_id) references Rede (id) 
);

create table Alerta (
	id int primary key auto_increment,
    status_alerta tinyint,
    dt_hora datetime,
    registro_componente_id int,
    registro_rede_id int,
    foreign key (registro_componente_id) references RegistroComponente (id),
    foreign key (registro_rede_id) references RegistroRede (id)
);

create table GrupoProcessos (
	id int primary key auto_increment,
    lista_processos varchar(200),
    total_threads int,
    total_processos int,
    maquina_id int,
    foreign key (maquina_id) references Maquina (id)
);
