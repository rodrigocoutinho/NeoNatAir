import express from 'express'
import cors from 'cors'
import { LoginAirPure, GetInfoAmbientes, GetLeiturasDia, GetUltimaLeitura, GetUltimoAmbientes } from './air-pure.js'
import dotenv from "dotenv";
import { conexao } from './config/db.js'
import { deleteUser, getUserAll, getUserId, Login, Register, userUpdate } from "./controllers/UsuarioController.js";

import { getLeitos, getLeito, apagarLeito, atualizarLeito, cadastrarLeito } from './controllers/LeitoController.js';
import { cadastrarAlerta, getAlerta, getAlertas, apagarAlerta } from './controllers/AlertaController.js';
import { cadastrarRelatorio, getRelatorio, getRelatorios, apagarRelatorio } from './controllers/RelatorioController.js';
import { Role } from './models/RoleModel.js';
import {checkDuplicateNameOrEmail, checkRolesExisted}  from './middleware/VerifySignUp.js';
import { isAdmin, verifyToken } from './middleware/authJwt.js';

dotenv.config();

//iniciando banco
await conexao.sync({ force: true }).then(() => {
    initial();
});


const app = express();
const port = 8080;

app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
    res.header(
        "Access-control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//rotas para air-pure.js 
app.post('/loginAirPure', LoginAirPure);
app.get('/infoAmbientes/:id', GetInfoAmbientes);
app.get('/leiturasDia/:parametro/:idAmbiente/:data', GetLeiturasDia);
app.get('/ultimaLeitura', GetUltimaLeitura);
app.get('/ultimoAmbientes/:id', GetUltimoAmbientes);


//Leito
app.post('/api/leito',verifyToken,isAdmin, cadastrarLeito);
app.get('/api/leitos',verifyToken,isAdmin, getLeitos);
app.get('/api/leito/:id',verifyToken,isAdmin, getLeito);
app.delete('/api/leito/:id',verifyToken,isAdmin, apagarLeito);
app.put('/api/leito/:id',verifyToken,isAdmin, atualizarLeito);

//Usuários admin e equipe técnica
app.get('/users',verifyToken,isAdmin, getUserAll);
app.get('/user/:id',verifyToken,isAdmin, getUserId);
app.put('/userUpdate/id',verifyToken,isAdmin,userUpdate);
app.delete('/user/:id',verifyToken,isAdmin,deleteUser);
app.post('/register',[checkDuplicateNameOrEmail, checkRolesExisted], Register);
app.post('/login', Login);

//Alerta
app.get('/api/alerta/:id',verifyToken,isAdmin, getAlerta);
app.get('/api/alertas', verifyToken,isAdmin,getAlertas);
app.post('/api/alerta',verifyToken,isAdmin, cadastrarAlerta);
app.delete('/api/alerta',verifyToken,isAdmin, apagarAlerta);

//Relatório 
app.get('/api/relatorio/:id',verifyToken,isAdmin, getRelatorio);
app.get('/api/relatorios', verifyToken,isAdmin,getRelatorios);
app.post('/api/relatorio',verifyToken,isAdmin, cadastrarRelatorio);
app.delete('/api/relatorio/:id',verifyToken,isAdmin, apagarRelatorio);






app.listen(port, () => {
    console.log(`Server is running in the port: ${port}`)
});

function initial() {

    Role.create({
        id: 1,
        name: "admin"
    });
    Role.create({
        id: 2,
        name: "equipeTecnica"
    });

}