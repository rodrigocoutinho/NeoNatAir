import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";

//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Amostragem = conexao.define('amostragen', {
    idAmbiente: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    data: {
        type: Sequelize.DATE,
    },

    temperatura: {
        type: Sequelize.FLOAT,
    },

    co2: {
        type: Sequelize.FLOAT,
    },

    tvoc: {
        type: Sequelize.FLOAT,
    },

    umidade: {
        type: Sequelize.FLOAT,
    },

    luminosidade: {
        type: Sequelize.FLOAT,
    },

    ruido: {
        type: Sequelize.FLOAT,
    }
});

//Cria tabela
Amostragem.sync();

//Força alteração na tabela
//Amostragem.sync({alter: true})
