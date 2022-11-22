import express from 'express'
import cors from 'cors'
import { LoginAirPure, GetInfoAmbientes, GetLeiturasDia, GetUltimaLeitura, GetUltimoAmbientes  } from './air-pure.js'
import dotenv from "dotenv";
import { conexao } from './config/db.js'
import { GetUsers, Register, Login, Logout } from "./controllers/UsuarioController.js";
import { verifyToken } from "./middleware/VerifyToken.js";
import { refreshToken } from "./controllers/RefreshToken.js";
import { getParametros ,atualizarParametros, cadastrarParametros, apagarParametros} from './controllers/ParametrosController.js'
import { getAirPures } from './controllers/AirPureController.js';
//import Chart from './controllers/chart.js'
//import Alert from './controllers/Alert.js'
import { getLeitos, apagarLeito, atualizarLeito, cadastrarLeito } from './controllers/LeitoController.js';


dotenv.config();

//iniciando banco
await conexao.sync();


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
//app.get('/api/amostragens', GetAmostragens);
app.get('/api/airpures', getAirPures);
app.post('/api/leitos', cadastrarLeito);
app.get('/api/leitos', getLeitos);
app.delete('/api/leitos', apagarLeito);
app.put('/api/leitos', atualizarLeito);

app.get('/users', verifyToken, GetUsers);
app.post('/login', Login);
app.post('/register', Register);
app.get('/token', refreshToken);
app.delete('/logout', Logout);
//app.get('/chart', Chart);
//app.get('/alert', Alert);

//Parametros
app.delete('/api/parametro', apagarParametros);
app.get('/api/parametro', getParametros);
app.put('/api/parametro', atualizarParametros);
app.post('/api/parametro', cadastrarParametros);






app.listen(port,()=>{
    console.log(`Server is running in the port: ${port}`)
})