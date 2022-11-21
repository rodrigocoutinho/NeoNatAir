import { Leito } from '../models/LeitoModel.js';

export async function CadastrarLeito (req,res) {
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

export async function ApagarLeito (req,res) {
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

export async function AtualizarLeito (req,res) {
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