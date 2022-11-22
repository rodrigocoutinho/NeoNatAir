import { Leito } from '../models/LeitoModel.js';

export async function getLeitos (req, res) {
    try {
        const amostragens = await Leito.findAll()
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}

export async function cadastrarLeito (req,res) {
    const { idLeito, idAirPure, idAlerta } = req.body;
    
    try {
        
        await Leito.create({
            idLeito: idLeito,
            idAirPure: idAirPure,
            idAlerta: idAlerta
        });
        res.json({msg: "Leito criado com sucesso!"});
    } catch (error){
        res.status (400)
        res.send ({msg: "Erro 400", error})
        console.log(error);
    }
}

export async function apagarLeito (req,res) {
    const { idLeito } = req.body;
    
    try {
        
        await Leito.destroy({
            where: {
                idLeito: idLeito
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
    const { idLeito, idAirPure, idAlerta } = req.body;
    
    try {
        
        await Leito.update({ idAirPure: idAirPure, idAlerta: idAlerta },{
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