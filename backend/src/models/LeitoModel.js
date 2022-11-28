import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";
import { AirPure } from "./AirPureModel.js";
import { Parametros } from "./ParametrosModel.js";

//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Leito = conexao.define('leito', {
    idLeito: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }

});
// Referenciar airpure e parametros

Leito.belongsTo(AirPure, {
    foreignKey:'idAirPure',
    allowNull: false
});
Leito.belongsTo(Parametros, {
    foreignKey:'idParametro',
    constraints: true,
    allowNull: false
});

//Cria tabela
Leito.sync();

//Força alteração na tabela
//Leito.sync({alter: true})