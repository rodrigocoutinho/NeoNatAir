## NeoNatAir
O NeoNatAir auxiliará os cuidados do ambiente UTIN através do monitoramento das condições das incubadoras, especificamente da luminosidade, da umidade, do nível de ruído, da presença de compostos orgânicos voláteis (VOC’s) e da temperatura. Essas informações serão disponibilizadas numa plataforma web para os profissionais responsáveis pela UTIN.

#### Concepção
* Termo de abertura
* Documento de concepção

#### Elaboração
* Documento de elaboração

#### Construção
* Planejamento
* Cronograma
* Backlog
* Relatórios por sprint

### Tecnologias utilizadas
* Javascript
* NodeJS
* ExpressJS
* Sequelize
* MySQL

## Pré-requisitos
- NodeJS
- MySQL

- Criar arquivo .env na pasta raiz backend com as credenciais
```
EX:
//Credenciais Locais
DB_HOST = "endereço do banco de dados"
DB_USER = "usuario do banco de dados"
DB_PASS = "senha do banco de dados"
DB_NAME = "nome do banco de dados"
//Credenciais AirPure
ACESS_USER = "usuario de acesso"
ACESS_PASS = "senha de acesso"
```

## Instalação
- npm install

## Start backend e frontend
- Dentro da pasta backend
- npm run dev

## Start backend
- node api.js
ou
- nodemon api.js

## Start frontend
- npm run dev
ou
- yarn run dev
