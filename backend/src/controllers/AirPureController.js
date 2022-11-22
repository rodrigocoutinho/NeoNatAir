import { AirPure } from '../models/AirPureModel.js';

export async function getAirPures(req,res){
    const response = await AirPure.findAll()
    console.log(response)
    res.json(response)
};
