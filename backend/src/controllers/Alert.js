import { Amostragem } from "../models/amostragemModel.js"

export default async function Alert(req,res){
    const body = req.body

    const response = await Amostragem.findAll({
        order: [
            ['id', 'DESC']
        ],        
        limit: 5
    })
    console.log(response)
    res.json(response)

}