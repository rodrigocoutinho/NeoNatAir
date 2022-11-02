import express from 'express'
import cors from 'cors'
import { LoginAirPure, GetInfoAmbientes, GetLeiturasDia, GetUltimaLeitura, GetUltimoAmbientes  } from './air-pure.js'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//import router from "./routes/index.js";
import { GetAmostragens } from './routes/amostragem.js'
import { conexao } from './config/db.js'
import { GetAirPures } from './routes/airpure.js'
import { GetLeitos } from './routes/leito.js'
//import { GetUsers } from './routes/usuario.js'
import { GetUsers, Register, Login, Logout } from "./controllers/Users.js";
import { verifyToken } from "./middleware/VerifyToken.js";
import { refreshToken } from "./controllers/RefreshToken.js";
import { getParameters ,setParameters} from './controllers/Parameters.js'
import Chart from './controllers/chart.js'
import Alert from './controllers/Alert.js'
import {Parameters} from './models/parametersModel.js'


dotenv.config();

//iniciando banco
await conexao.sync();

try{
    const parameters = await Parameters.findOrCreate({
        where:{
            idAirPure: null,
            limitCo2: null,
            limitRuidoSonoro: null,
            limitLuminosidade: null,
            limitTemperatura: null,
            limitCOVT: null,
            limitUmidade: null,
        },
    })
    console.log("parameters")
    console.log(parameters)

}catch(error){
    console.log(error)

}


const app = express()
const port = 8080;

app.use(express.json())
app.use(cors())

//rotas para air-pure.js 
app.post('/loginAirPure', LoginAirPure)
app.get('/infoAmbientes/:id', GetInfoAmbientes)
app.get('/leiturasDia/:parametro/:idAmbiente/:data', GetLeiturasDia)
app.get('/ultimaLeitura', GetUltimaLeitura)
app.get('/ultimoAmbientes/:id', GetUltimoAmbientes)

//rotas NeoNatAir
app.get('/api/amostragens', GetAmostragens);
app.get('/api/airpures', GetAirPures);
app.get('/api/leitos', GetLeitos);

app.get('/users', verifyToken, GetUsers);
app.post('/login', Login);
app.post('/register', Register);
app.get('/token', refreshToken);
app.delete('/logout', Logout);
app.get('/chart', Chart);
app.get('/alert', Alert);

//Parameters
app.get('/parameter',getParameters);
app.post('/parameter',setParameters);





app.listen(port,()=>{
    console.log(`Server is running in the port: ${port}`)
})
