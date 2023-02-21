import fetch from "node-fetch";
//import { Amostragem } from "./models/amostragemModel.js";
import 'dotenv/config';

const serverURL = 'https://backend-api-floats.vercel.app'

let TOKEN = null

//primeiro precisa fazer login no dispositivo
export async function LoginAirPure(req,res){

    const loginBody = JSON.stringify({
        usr: process.env.ACESS_USER,
        pass: process.env.ACESS_PASS
    })
    
    const airPureResponse = await fetch(`${serverURL}/api/login`,{
        method: "POST",
        headers:{
            accept : "application/json",
            "content-type": "application/json"
        },
        body: loginBody
    })
    
    res.status(airPureResponse.status)

    //console.log(airPureResponse)

    let body = await airPureResponse.json()
    //res.json(body)
    TOKEN = body.session_token
    res.json(body)
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

    console.log("aaaaa:", parametro, idAmbiente, data);


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
   // res.json(await airPureResponse.json())
}

//consulta última leitura
export async function GetUltimaLeitura(req,res){

    await LoginAirPure();

    let idAmbiente = req.params.idAmbiente;

    const airPureResponse = await fetch(`${serverURL}/api/ultimoValor/${idAmbiente}`, {
        method: "GET",
        headers:{
            'sessiontoken': TOKEN, 
            accept : "application/json",
        },
    })
/*    const body = await airPureResponse.json()
    await Amostragem.create({
        idAmbiente: 1,
        data: body[0]?.datamedicao,
        temperatura: body[0]?.temperatura,
        co2: body[0]?.co2,
        tvoc: body[0]?.tvoc,
        umidade: body[0]?.umidade,
        luminosidade: body[0]?.lux,
        ruido: body[0]?.db
    })*/


    res.status(airPureResponse.status)
    res.json(await airPureResponse.json())
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