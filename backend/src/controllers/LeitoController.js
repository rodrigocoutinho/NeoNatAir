import { Leito } from '../models/LeitoModel.js';

export async function getLeitos(req, res) {
    try {
        const Leitos = await Leito.findAll()
        res.json(Leitos)
    } catch (error) {
        console.error(error)
    }
}

export async function getLeito(req, res) {
    try {
        const amostragens = await Leito.findByPk(req.params.id)
        res.json(amostragens)
    } catch (error) {
        console.error(error)
    }
}

export async function cadastrarLeito(req, res) {
    const { idAirPure, nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade } = req.body;

    try {
        let Leitos = await Leito.findAll({
            where: idAirPure
        })
        if (Leito.length == 0) {
            await Leito.create({
                idAirPure: idAirPure,
                nome: nome,
                limitCo2: limitCo2,
                limitRuidoSonoro: limitRuidoSonoro,
                limitLuminosidade: limitLuminosidade,
                limitTemperatura: limitTemperatura,
                limitCOVT: limitCOVT,
                limitUmidade: limitUmidade
            });
            res.json({ msg: "Leito criado com sucesso!" });
        }else{
            res.send({ msg: "AirPure está vinculado a um leito ativo!", error })
            console.log(error);
        }

    } catch (error) {
        res.status(400)
        res.send({ msg: "Erro 400", error })
        console.log(error);
    }
}

export async function apagarLeito(req, res) {

    try {

        await Leito.destroy({
            where: {
                idLeito: req.params.id
            }
        });
        res.json({ msg: "Leito excluido com sucesso!" });
    } catch (error) {
        res.status(400)
        res.send({ msg: "Erro 400", error })
        console.log(error);
    }
}

export async function atualizarLeito(req, res) {
    const { nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade } = req.body;

    try {

        await Leito.update({
            nome: nome,
            limitCo2: limitCo2,
            limitRuidoSonoro: limitRuidoSonoro,
            limitLuminosidade: limitLuminosidade,
            limitTemperatura: limitTemperatura,
            limitCOVT: limitCOVT,
            limitUmidade: limitUmidade
        }, {
            where: {
                idLeito: req.params.id
            }
        });
        res.json({ msg: "Leito atualizado com sucesso!" });
    } catch (error) {
        res.status(400)
        res.send({ msg: "Erro 400", error })
        console.log(error);
    }
}