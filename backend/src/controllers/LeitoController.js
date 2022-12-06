import { Leito } from '../models/LeitoModel.js';

export async function getLeitos (req, res) {
    try {
        const amostragens = await Leito.findAll()
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}

export async function getLeito (req, res) {
    try {
        const amostragens = await Leito.findByPk(req.params.id)
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}

export async function cadastrarLeito (req,res) {
    const { idAirPure, idParametro } = req.body;
    
    try {
        
        await Leito.create({
            idAirPure: idAirPure,
            idParametro: idParametro
        });
        res.json({msg: "Leito criado com sucesso!"});
    } catch (error){
        res.status (400)
        res.send ({msg: "Erro 400", error})
        console.log(error);
    }
}

export async function apagarLeito (req,res) {

    try {
        
        await Leito.destroy({
            where: {
                idLeito: req.params.id
              }
        });
        res.json({msg: "Leito excluido com sucesso!"});
    } catch (error){
        res.status (400)
        res.send ({msg: "Erro 400", error})
        console.log(error);
    }
}

export async function atualizarLeito (req,res) {
    const { idLeito, idAirPure, idParametro } = req.body;
    
    try {
        
        await Leito.update({ idAirPure: idAirPure, idParametro: idParametro },{
            where: {
                idLeito: idLeito
              }
        });
        res.json({msg: "Leito atualizado com sucesso!"});
    } catch (error){
        res.status (400)
        res.send ({msg: "Erro 400", error})
        console.log(error);
    }
}