import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";

export const Alerta = conexao.define('alerta', {
    idAlerta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idLeito: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    temperatura: {
        type: Sequelize.FLOAT,
        allowNull: true
    },

    co2: {
        type: Sequelize.FLOAT,
        allowNull: true
    },

    tvoc: {
        type: Sequelize.FLOAT,
        allowNull: true
    },

    umidade: {
        type: Sequelize.FLOAT,
        allowNull: true
    },

    luminosidade: {
        type: Sequelize.FLOAT,
        allowNull: true
    },

    ruido: {
        type: Sequelize.FLOAT,
        allowNull: true
    }
}
)


//Cria tabela
Alerta.sync();