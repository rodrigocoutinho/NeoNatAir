import {DataTypes  } from "sequelize";
import { conexao } from "../config/db.js";

export const Relatorio = conexao.define('relatorio', {
    idRelatorio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idLeito: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idAirPure: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    temperatura: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    co2: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    tvoc: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    umidade: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    luminosidade: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    ruido: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}
)


//Cria tabela
Relatorio.sync();