import { Usuario } from "../models/usuarioModel.js";
import jwt from "jsonwebtoken";

export async function refreshToken (req, res) {
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.sendStatus(401);
        }
        const user = await Usuario.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]){
            return res.sendStatus(403);
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err){
                return res.sendStatus(403);
            }
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error){
        console.log(error);
    }
}