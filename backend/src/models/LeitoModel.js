import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";
import { AirPure } from "./AirPureModel.js";

//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Leito = conexao.define('leito', {
    idLeito: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idAirPure: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idAlerta: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }

});
// Referenciar airpure e parametros

Leito.belongsTo(AirPure);

//Cria tabela
Leito.sync();

//Força alteração na tabela
//Leito.sync({alter: true})