import { DataTypes } from "sequelize";
import { conexao } from "../config/db.js";

export const Alerta = conexao.define('alerta', {
    idAlerta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idLeito: {
        type: DataTypes.INTEGER,
        allowNull: false
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
Alerta.sync();