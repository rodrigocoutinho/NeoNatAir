import { Usuario } from '../models/usuarioModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EquipeTecnica } from '../models/equipeTecnicaModel.js';
import { Administrador } from '../models/administradorModel.js';

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







// export async function GetAdministradores (req, res) {
//     try {
//         const amostragens = await Administrador.findAll()
//         res.json(amostragens)
//     } catch (error) {
//         console.error(error)
//     }
// }

// export async function GetEquipesTecnicas (req, res) {
//     try {
//         const amostragens = await EquipeTecnica.findAll()
//         res.json(amostragens)
//     } catch (error) {
//         console.error(error)
//     }
// }

