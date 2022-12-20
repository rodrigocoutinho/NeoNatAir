import express from 'express'
import cors from 'cors'
import { LoginAirPure, GetInfoAmbientes, GetLeiturasDia, GetUltimaLeitura, GetUltimoAmbientes  } from './air-pure.js'
import dotenv from "dotenv";
import { conexao } from './config/db.js'
<<<<<<< HEAD


import { getParametros, getParametro, atualizarParametros, cadastrarParametros, apagarParametros} from './controllers/ParametrosController.js'
import { getAirPures, getAirPure, cadastrarAirPure, apagarAirPure } from './controllers/AirPureController.js';
=======
import { GetUsers, Register, Login, Logout } from "./controllers/UsuarioController.js";
import { verifyToken } from "./middleware/VerifyToken.js";
import { refreshToken } from "./controllers/RefreshToken.js";
>>>>>>> alteracoes-estrutura
//import Chart from './controllers/chart.js'
//import Alert from './controllers/Alert.js'
import { getLeitos, getLeito, apagarLeito, atualizarLeito, cadastrarLeito } from './controllers/LeitoController.js';
import { cadastrarAlerta, getAlerta, getAlertas, apagarAlerta } from './controllers/AlertaController.js';


dotenv.config();

//iniciando banco
await conexao.sync();


const app = express();
const port = 8080;

app.use(express.json())
app.use(cors())

//rotas para air-pure.js 
app.post('/loginAirPure', LoginAirPure);
app.get('/infoAmbientes/:id', GetInfoAmbientes);
app.get('/leiturasDia/:parametro/:idAmbiente/:data', GetLeiturasDia);
app.get('/ultimaLeitura', GetUltimaLeitura);
app.get('/ultimoAmbientes/:id', GetUltimoAmbientes);


//Leito
app.post('/api/leito', cadastrarLeito);
app.get('/api/leitos', getLeitos);
app.get('/api/leito/:id', getLeito);
app.delete('/api/leito/:id', apagarLeito);
app.put('/api/leito:id', atualizarLeito);

//app.get('/users', verifyToken, GetUsers);
//app.post('/login', Login);
//app.post('/register', Register);
//app.get('/token', refreshToken);
//app.delete('/logout', Logout);
//app.get('/chart', Chart);
//app.get('/alert', Alert);

//Alerta
app.get('/api/alerta/:id', getAlerta);
app.get('/api/alertas', getAlertas);
app.post('/api/alerta', cadastrarAlerta);
app.delete('/api/alerta', apagarAlerta);






app.listen(port,()=>{
    console.log(`Server is running in the port: ${port}`)
})