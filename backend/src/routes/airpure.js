import { AirPure } from '../models/airpureModel.js';

export async function GetAirPures (req, res) {
    try {
        const amostragens = await AirPure.findAll()
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}