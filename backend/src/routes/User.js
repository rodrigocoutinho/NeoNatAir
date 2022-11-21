import { Usuario } from '../models/UsuarioModel.js';

export async function GetUsers (req, res) {
    try {
        const users = await Usuario.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users)
    } catch (error) {
        console.error(error)
    }
}