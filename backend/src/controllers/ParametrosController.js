import { Parametros } from "../models/ParametrosModel.js"

export async function getParametros(req,res){
    const body = req.body

    const response = await Parametros.findAll()
    console.log(response)
    res.json(response)
}

export async function getParametro(req,res){

    const response = await Parametros.findByPk(req.params.id)
    console.log(response)
    res.json(response)
}

export async function atualizarParametros(req,res){
    const {idParametro, idAirPure, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade}= req.body
    const response = await Parametros.update(
        {
            idAirPure: idAirPure,
            limitCo2: limitCo2,
            limitRuidoSonoro: limitRuidoSonoro,
            limitLuminosidade: limitLuminosidade,
            limitTemperatura: limitTemperatura,
            limitCOVT: limitCOVT,
            limitUmidade: limitUmidade             
        },
        {
            where:{
                idParametro: idParametro
            }
        })
    console.log(response)
    res.json(response)
}

export async function cadastrarParametros(req,res){
    const {idAirPure, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade}= req.body

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
    const { idParametro }= req.body
    const response = await Parametros.destroy(
        {
            where:{
                idParametro:idParametro
            }
        })
    console.log(response)
    res.json(response)
}


export default { getParametros, atualizarParametros, cadastrarParametros, apagarParametros }