import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";

export const Relatorio = conexao.define('relatorio', {
    idRelatorio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idLeito: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false,
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
Relatorio.sync();