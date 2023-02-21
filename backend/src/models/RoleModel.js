import { DataTypes} from "sequelize";
import { conexao } from "../config/db.js";
import { Usuario } from "./UsuarioModel.js";



export const Role = conexao.define('roles', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    name:{
        type: DataTypes.STRING
    }

});



Role.belongsToMany(Usuario,{
    through: "usuario_roles",
    foreignKey: "roles.id",
    otherKey: "usuarioId"
});

Usuario.belongsToMany(Role,{
    through: "usuario_roles",
    foreignKey: "usuarioId",
    otherKey: "rolesId"
});


Role.sync();
