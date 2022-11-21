import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";
import { Usuario } from "./usuarioModel.js";

//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Leito = conexao.define('leito', {
    idLeito: {
        type: Sequelize.Integer,
        allowNull: false,
    },
    idAirPure: {
        type: Sequelize.Integer,
        allowNull: false,
    },
    idAlerta: {
        type: Sequelize.Integer,
        allowNull: false,
    }

});
// Referenciar airpure e parametros

//Leito.belongsTo(Usuario);

//Cria tabela
Leito.sync();

//Força alteração na tabela
//Leito.sync({alter: true})