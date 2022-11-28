import { AirPure } from '../models/AirPureModel.js';

export async function getAirPures(req,res){
    const response = await AirPure.findAll()
    console.log(response)
    res.json(response)
};
export async function cadastrarAirPure(req,res){
    const { data, temperatura, co2, tvoc, umidade, luminosidade, ruido } = req.body;
    
    try {
        
        await AirPure.create({
            data: data,
            temperatura: temperatura,
            co2: co2,
            tvoc: tvoc,
            umidade: umidade,
            luminosidade: luminosidade,
            ruido: ruido

        });
        res.json({msg: "AirPure criado com sucesso!"});
    } catch (error){
        res.status (400)
        res.send ({msg: "Erro 400", error})
        console.log(error);
    }
};