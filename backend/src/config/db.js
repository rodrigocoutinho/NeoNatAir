import {Sequelize} from 'sequelize';
import 'dotenv/config';

export const conexao = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

conexao.authenticate().then(() => {
    console.log('conexão com o banco realizada com sucesso!')
}).catch(() => {
    console.error('Ação não realizada')
})