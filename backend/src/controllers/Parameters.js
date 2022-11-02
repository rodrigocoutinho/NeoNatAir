import { Parameters } from "../models/parametersModel.js"

export async function getParameters(req,res){
    const body = req.body

    const response = await Parameters.findAll()
    console.log(response)
    res.json(response)
}

export async function setParameters(req,res){
    const body = req.body
    console.log(body)
    const response = await Parameters.update(
        {
            ...body            
        },
        {
            where:{
                id:1
            }
        })
    console.log(response)
    res.json(response)
}

export default { getParameters, setParameters }