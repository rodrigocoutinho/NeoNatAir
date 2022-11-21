import { AirPure } from '../models/AirpureModel.js';

export async function GetAirPures (req, res) {
    try {
        const amostragens = await AirPure.findAll()
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}