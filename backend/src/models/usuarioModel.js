import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";

//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Usuario = conexao.define('usuario', {
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    telefone: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    perfil: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    refresh_token: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

//Cria tabela
Usuario.sync();

//Força alteração na tabela
//Usuario.sync({alter: true})
