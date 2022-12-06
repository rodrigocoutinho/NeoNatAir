import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";
import { Leito } from "./LeitoModel.js";

export const Alerta = conexao.define('alerta', {
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
Alerta.sync();