import { DataTypes } from "sequelize";
import { conexao } from "../config/db.js";
import { Alerta } from "./AlertaModel.js";
//Define a tabela de usuários e suas colunas, conforme documentação do DataTypes

export const Leito = conexao.define('leito', {
    idLeito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    idAirPure: {
        type: DataTypes.INTEGER
    },

    nome: {
        type: DataTypes.STRING
    },
    limitCo2: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    limitRuidoSonoro: {
        type: DataTypes.INTEGER,
        defaultValue: null

    },
    limitLuminosidade: {
        type: DataTypes.INTEGER,
        defaultValue: null

    },
    limitTemperatura: {
        type: DataTypes.INTEGER,
        defaultValue: null

    },
    limitCOVT: {
        type: DataTypes.INTEGER,
        defaultValue: null


    },
    limitUmidade: {
        type: DataTypes.INTEGER,
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