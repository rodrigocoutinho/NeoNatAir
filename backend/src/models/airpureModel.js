import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";
import { Usuario } from "./usuarioModel.js";

//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const AirPure = conexao.define('airpure', {

    data: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    temperatura: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    co2: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    tvoc: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    umidade: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    luminosidade: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    ruido: {
        type: Sequelize.FLOAT,
        allowNull: false,
    }
});

AirPure.belongsTo(Usuario);

//Cria tabela
AirPure.sync();

//Força alteração na tabela
//AirPure.sync({alter: true})