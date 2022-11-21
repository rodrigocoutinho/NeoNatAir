import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";


//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Parametros = conexao.define('alerta', {
    idAirPure: {
        type: Sequelize.INTEGER,
        defaultValue: null
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

//Cria tabela
Parametros.sync();