import { Relatorio } from '../models/RelatorioModel.js';

export async function getRelatorios (req, res){
    const response = await Relatorio.findAll();
    console.log(response)
    res.json(response)
}

export async function getRelatorio (req, res){
    const response = await Relatorio.findByPk(req.params.id);
    console.log(response)
    res.json(response)
}

export async function cadastrarRelatorio(req,res){
    const { nome, idLeito, idAirPure, temperatura, co2, tvoc, umidade, luminosidade, ruido } = req.body;
    
    try {
        
        await Relatorio.create({
            nome: nome,
            idLeito: idLeito,
            idAirPure: idAirPure,
            temperatura: temperatura,
            co2: co2,
            tvoc: tvoc,
            umidade: umidade,
            luminosidade: luminosidade,
            ruido: ruido

        });
        res.json({msg: "Relatório criado com sucesso!"});
    } catch (error){
        res.status (400)
        res.send ({msg: "Erro 400", error})
        console.log(error);
    }
};

export async function apagarRelatorio (req,res) {
   
    try {
        
        await Relatorio.destroy({
            where: {
                idRelatorio: req.params.id
              }
        });
        res.json({msg: "Relatório excluido com sucesso!"});
    } catch (error){
        res.status (400)
        res.send ({msg: "Erro 400", error})
        console.log(error);
    }
}