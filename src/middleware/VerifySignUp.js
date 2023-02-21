import { Usuario } from "../models/UsuarioModel.js";


export function checkDuplicateNameOrEmail(req, res, next) {
    Usuario.findOne({
        where: {
            name: req.body.name
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Name is already is use!"
            });
            return;
        }

        Usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

export function checkRolesExisted(req, res, next) {
    const ROLES = ["admin", "equipeTecnica"];
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

