import { DataTypes  } from "sequelize";
import { conexao } from "../config/db.js";

//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Usuario = conexao.define('usuarios', {
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    telefone: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    
});

//Cria tabela
Usuario.sync();

//Força alteração na tabela
//Usuario.sync({alter: true})