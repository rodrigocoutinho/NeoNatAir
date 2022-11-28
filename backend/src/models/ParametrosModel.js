import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";
import { AirPure } from "./AirPureModel.js";


//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Parametros = conexao.define('parametro', {
    idParametro:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    limitCo2: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    limitRuidoSonoro: {
        type: Sequelize.INTEGER,
        defaultValue: null

    },
    limitLuminosidade: {
        type: Sequelize.INTEGER,
        defaultValue: null

    },
    limitTemperatura: {
        type: Sequelize.INTEGER,
        defaultValue: null

    },
    limitCOVT: {
        type: Sequelize.INTEGER,
        defaultValue: null
        

    },
    limitUmidade: {
        type: Sequelize.INTEGER,
        defaultValue: null

    },
   
});

Parametros.belongsTo(AirPure, {
    constraints: true,
    foreignKey: 'idAirPure'
});

//Cria tabela
Parametros.sync();