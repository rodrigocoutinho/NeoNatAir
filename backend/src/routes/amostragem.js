import { Amostragem } from '../models/amostragemModel.js';

export async function GetAmostragens (req, res) {
    try {
        const amostragens = await Amostragem.findAll()
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}