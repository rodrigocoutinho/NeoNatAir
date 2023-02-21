import jwt from "jsonwebtoken";
import { Usuario } from "../models/UsuarioModel.js";

export function verifyToken  (req, res, next) {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message: "No token provided !"
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message: "Unauthorized !"
            });
        }
        req.usuarioId = decoded.id;
        next();
    });
};

export function isAdmin (req, res, next)  {
    Usuario.findByPk(req.usuarioId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

export function isEquipeTecnica (req, res, next) {
    Usuario.findByPk(req.usuarioId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++){
                if(roles[i].name === "equipeTecnica"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require equipetecnica Role!"
            });
            return;
        });
    });
};


