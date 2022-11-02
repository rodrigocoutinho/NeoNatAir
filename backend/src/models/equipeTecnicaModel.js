import { Sequelize } from "sequelize";
import { conexao } from "../config/db.js";

//Define a tabela de usuários e suas colunas, conforme documentação do sequelize

export const EquipeTecnica = conexao.define('equipetecnica', {
    idLeito: {
        type: Sequelize.STRING(11),
        allowNull: false,
    },
});

//Cria tabela
EquipeTecnica.sync();

//Força alteração na tabela
//EquipeTecnica.sync({alter: true})