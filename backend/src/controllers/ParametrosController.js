import { Parametros } from "../models/ParametrosModel.js"

export async function getParametros(req,res){
    const body = req.body

    const response = await Parametros.findAll()
    console.log(response)
    res.json(response)
}

export async function atualizarParametros(req,res){
    const {id, idAirPure, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade}= req.body
    console.log(body)
    const response = await Parametros.update(
        {
            ...body            
        },
        {
            where:{
                id:id
            }
        })
    console.log(response)
    res.json(response)
}

export async function cadastrarParametros(req,res){
    const {idAirPure, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade}= req.body
    console.log(body)
    const response = await Parametros.create(
        {
            idAirPure: idAirPure,
            limitCo2: limitCo2,
            limitRuidoSonoro: limitRuidoSonoro,
            limitLuminosidade: limitLuminosidade,
            limitTemperatura: limitTemperatura,
            limitCOVT: limitCOVT,
            limitUmidade: limitUmidade         
        }
        )
    console.log(response)
    res.json(response)
}

export async function apagarParametros(req,res){
    const { id }= req.body
    console.log(body)
    const response = await Parametros.destroy(
        {
            where:{
                id:id
            }
        })
    console.log(response)
    res.json(response)
}


export default { getParametros, atualizarParametros, cadastrarParametros, apagarParametros }