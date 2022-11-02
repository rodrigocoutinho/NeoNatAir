import fetch from "node-fetch";
import { Amostragem } from "./models/amostragemModel.js";

const serverURL = 'https://backend-api-airpure.vercel.app'

let TOKEN = null

//primeiro precisa fazer login no dispositivo
export async function LoginAirPure(req,res){

    const loginBody = JSON.stringify({
        //senha: teste
        //usr: "heitor1", 
        //pass: "698dc19d489c4e4db73e28a713eab07b"
    
        //senha: 12345678
        usr: "inf",
        pass: "25d55ad283aa400af464c76d713c07ad"
    })
    
    "p2qf31a2m7psxzc2e3ddcl"

    const airPureResponse = await fetch(`${serverURL}/api/login`,{
        method: "POST",
        headers:{
            accept : "application/json",
            "content-type": "application/json"
        },
        body: loginBody
    })
    
    //res.status(airPureResponse.status)

    let body = await airPureResponse.json()
    //res.json(body)
    TOKEN = body.session_token

   // return TOKEN
    //console.log(TOKEN)
}

//obtendo infos do ambiente
export async function GetInfoAmbientes(req,res){

    let id = req.params.id;

    console.log(`${serverURL}/api/ambiente/${id}`);

    const airPureResponse = await fetch(`${serverURL}/api/ambiente/${id}`, {
        method: "GET",
        headers:{
            'sessiontoken': TOKEN, //ou `Bearer ${TOKEN}`
            accept : "application/json", 
            "content-type": "application/json"
        },
        
    })
    res.status(airPureResponse.status)
    
    // Alternative way of relaying air pure response:
    // res.setHeader("content-type", "application/json")
    // res.end(await airPureResponse.text())
    // BUT, you can't peek into the response body.
    
    let body = await airPureResponse.json()
    res.json(body)
}

//consulta leituras da data x 
export async function GetLeiturasDia(req,res){

    let parametro = req.params.parametro;
    let idAmbiente = req.params.idAmbiente;
    let data = req.params.data;


    const airPureResponse = await fetch(`${serverURL}/api/mediaDia/${parametro}/${idAmbiente}/${data}`, {
        method: "GET",
        headers:{
            'sessiontoken': TOKEN, 
            accept : "application/json",
            "content-type": "application/json"
        },
    })
    res.status(airPureResponse.status)
    let body = await airPureResponse.json()
    res.json(body)
}

//consulta última leitura
export async function GetUltimaLeitura(req,res){

    await LoginAirPure();

    let idAmbiente = req.params.idAmbiente;

    const airPureResponse = await fetch(`${serverURL}/api/ultimoValor/2`, {
        method: "GET",
        headers:{
            'sessiontoken': TOKEN, 
            accept : "application/json",
        },
    })
    const body = await airPureResponse.json()
    await Amostragem.create({
        idAmbiente: 1,
        data: body[0]?.datamedicao,
        temperatura: body[0]?.temperatura,
        co2: body[0]?.co2,
        tvoc: body[0]?.tvoc,
        umidade: body[0]?.umidade,
        luminosidade: body[0]?.lux,
        ruido: body[0]?.db
    })


    res.status(airPureResponse.status)
    res.json(body)
}


//consulta última leitura todos os ambientes
export async function GetUltimoAmbientes(req,res){

    let id = req.params.id;

    console.log(`${serverURL}/api/ambientes/${id}`);

    const airPureResponse = await fetch(`${serverURL}/api/ambientes/${id}`, {
        method: "GET",
        headers:{
            'sessiontoken': TOKEN, 
            accept : "application/json",
        },
    })
    res.status(airPureResponse.status)
    res.json(await airPureResponse.json())
}