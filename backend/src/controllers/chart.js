import { Amostragem } from "../models/amostragemModel.js"

export default async function Chart(req,res){
    const body = req.body

    const response = await Amostragem.findAll({
        order: [
            ['id', 'DESC']
        ],
        attributes: ["temperatura"],
        limit: 5
    })
    console.log(response)
    res.json(response)

}