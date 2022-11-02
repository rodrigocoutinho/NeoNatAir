import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";


//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Administrador = conexao.define('administrador', {
    idAdm: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

//Cria tabela
Administrador.sync();

//Força alteração na tabela
//Administrador.sync({alter: true})