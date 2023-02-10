import { Alerta } from '../models/AlertaModel.js';

export async function getAlertas (req, res){
    const response = await Alerta.findAll();
    console.log(response)
    res.json(response)
}

export async function getAlerta (req, res){
    const response = await Alerta.findByPk(req.params.id);
    console.log(response)
    res.json(response)
}

export async function cadastrarAlerta(req,res){
    const { nome, idLeito, temperatura, co2, tvoc, umidade, luminosidade, ruido } = req.body;
    
    try {
        
        await Alerta.create({
            nome: nome,
            idLeito: idLeito,
            temperatura: temperatura,
            co2: co2,
            tvoc: tvoc,
            umidade: umidade,
            luminosidade: luminosidade,
            ruido: ruido

        });
        res.json({msg: "Alerta criado com sucesso!"});
    } catch (error){
        res.status (400)
        res.send ({msg: "Erro 400", error})
        console.log(error);
    }
};

export async function apagarAlerta (req,res) {
   
    try {
        
        await Alerta.destroy({
            where: {
                idAlerta: req.params.id
              }
        });
        res.json({msg: "Alerta excluido com sucesso!"});
    } catch (error){
        res.status (400)
        res.send ({msg: "Erro 400", error})
        console.log(error);
    }
}