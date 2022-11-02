import { Leito } from '../models/leitoModel.js';

export async function GetLeitos (req, res) {
    try {
        const amostragens = await Leito.findAll()
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}