import { Usuario } from '../models/UsuarioModel.js';
import { Role } from '../models/RoleModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from 'sequelize';
import 'dotenv/config';

const saltRounds = 10;

export async function getUserAll(req, res) {
    try {
        const users = await Usuario.findAll({
            attributes: { exclude: ['password'] },
            include: {
                model: Role,
                through:{
                    attributes:[]
                }
            }
        });
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
    }
};

export async function getUserId(req, res) {
    try {
        const user = await Usuario.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
};

export async function deleteUser(req, res) {

    try {

        await Usuario.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Usuário deletado com sucesso!" });
    } catch (error) {
        res.status(400)
        res.send({ msg: "Erro 400", error })
        console.log(error);
    }
};

export async function userUpdate(req, res) {
    const { cpf, telefone, name, email, password, confPassword } = req.body;
    const uniqueUser = await Usuario.findOne({
        where: {
            id: req.params.id
        }
    });



    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });


    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    await uniqueUser.set({
        cpf: cpf,
        telefone: telefone,
        name: name,
        email: email,
        password: hashPassword
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                })
                    .then(roles => {
                        user.setRoles(roles)
                            uniqueUser.save();
                            res.status(200).json(uniqueUser)
                        
                    });

            } else {

                res.status(200).send({ message: "Usuario não atulizado com sucesso !" });

            }

        })

        .catch(error => {
            res.status(500).send({ message: error.message });
        });


};



export async function Register(req, res) {
    const { cpf, telefone, name, email, roles, password, confPassword } = req.body;

    const validaCPF = (cpf) => {
        var soma;
        var resto;
        soma = 0;
        if (cpf == "00000000000") return false;

        for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    function validarEmail(email) {
        var regex = /^[\w._-]+@[\w_.-]+\.[\w][2,]/;
        //var regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    if (cpf == null || cpf == '') return res.status(400).json({ msg: "CPF inválido!" });
    if (telefone == null || telefone == '') return res.status(400).json({ msg: "Telefone inválido!" });
    if (name == null || name == '') return res.status(400).json({ msg: "Nome inválido!" });
    // if (email == null || email == '' || !validarEmail(email)) return res.status(400).json({ msg: "Email inválido!" });
    // if (password == null || password == '' || !validaCPF(cpf)) return res.status(400).json({ msg: "Password inválido!" });

    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });


    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    await Usuario.create({
        cpf: cpf,
        telefone: telefone,
        name: name,
        email: email,
        password: hashPassword
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                })
                    .then(roles => {
                        user.setRoles(roles).then(() => {
                            res.send({ message: "Usuario resgistrado com sucesso !" })
                        });
                    });
            } else {
                user.setRoles([1]).then(() => {
                    res.send({ message: "Usuario resgistrado com sucesso !" });
                })
            }
        })

        .catch(error => {
            res.status(500).send({ message: error.message });
        });
};



export async function Login(req, res) {
    await Usuario.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "usuário não encontrado" });
            }
            var passwordIsvalid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsvalid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Senha invalida"
                });
            }

            var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 86400 // 24 horas
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    cpf: user.cpf,
                    name: user.name,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });

        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        });
}

