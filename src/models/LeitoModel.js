import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";
import { Alerta } from "./AlertaModel.js";
//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const Leito = conexao.define('leito', {
    idLeito: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    idAirPure:{
        type: Sequelize.INTEGER
    },

    nome: {
        type: Sequelize.STRING
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

    }

});

Alerta.belongsToMany(Leito, {
    through: 'alerta_leitos',
    foreignKey: 'idAlerta',
    otherKey: 'idLeito'
})
Leito.belongsToMany(Alerta, {
    through: 'alerta_leitos',
    foreignKey: 'idLeito',
    otherKey: 'idAlerta'
})

//Cria tabela
Leito.sync();

//Força alteração na tabela
//Leito.sync({alter: true})