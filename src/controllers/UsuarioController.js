import { Usuario } from '../models/UsuarioModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { response } from 'express';

export async function GetUsers (req, res) {
    try {
        const users = await Usuario.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users)
    } catch (error) {
        console.error(error)
    }
}


export async function Register (req,res) {
    const { cpf, telefone, name, email, password, confPassword } = req.body;

    const validaCPF = (cpf) => {
        var soma;
        var resto;
        soma = 0;
      if (cpf == "00000000000") return false;
    
      for (i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
      resto = (soma * 10) % 11;
    
        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(cpf.substring(9, 10)) ) return false;
    
      soma = 0;
        for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;
    
        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(cpf.substring(10, 11) ) ) return false;
        return true;
    }

    function validarEmail(email) {
        var regex = /^[\w._-]+@[\w_.-]+\.[\w][2,]/;
        //var regex = /\S+@\S+\.\S+/;
        return regex.test(email);
      }

    if(cpf == null || cpf == '')return res.status(400).json({msg: "CPF inválido!"});
    if(telefone == null || telefone == '')return res.status(400).json({msg: "Telefone inválido!"});
    if(name == null || name == '')return res.status(400).json({msg: "Nome inválido!"});
    if(email == null || email == '' || !validarEmail(email))return res.status(400).json({msg: "Email inválido!"});
    if(password == null || password == '' || !validaCPF(cpf))return res.status(400).json({msg: "Password inválido!"});

    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        await Usuario.create({
            cpf: cpf,
            telefone: telefone,
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error){
        res.status (400)
        res.send ({msg: "Erro 400", error})
        console.log(error);
    }
}

export async function Login (req, res) {
    try{
        const user = await Usuario.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        
        if(!match){            
            return res.status(400).json({
                msg: "Usuario ou senha incorreta"                
            });
        }
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;

        let accessToken = null;

        try{
            accessToken = jwt.sign({name : name, email: email},"jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225",{
            expiresIn: 300
        });
        }catch(error){
            console.log(error)
        }
        const refreshToken = jwt.sign({userId, name, email},"825y8i3hnfjmsbv7gwajbl7fobqrjfvbs7gbfj2q3bgh8f42",{
            expiresIn: '1d'
        });
        await Usuario.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.json({ accessToken });              

    }catch (error){
        res.status(404).json({msg:"Usuario não encontrado"});
    }
}


export async function Logout (req,res) {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Usuario.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Usuario.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}