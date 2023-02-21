/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "https://neonatair-backend.azurewebsites.net/api/";

// API leitos 
export const createLeito = (idAirPure, nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade) => {
  return axios.post(API_URL + "leito", {
    idAirPure,
    nome,
    limitCo2,
    limitRuidoSonoro,
    limitLuminosidade,
    limitTemperatura,
    limitCOVT,
    limitUmidade,
  }, { headers: authHeader() });
};

export const getLeitosId = (id) => {
  return axios.get(API_URL + `leito/${id}`, { headers: authHeader() });
};

export const getLeitos = () => {
  return axios.get(API_URL + "leitos" ,{ headers: authHeader() });
};

export const updateLeitos = (idLeito ,idAirPure, nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade) => {
  return axios.put(API_URL + `leito/${idLeito}`,{
    idAirPure,
    nome,
    limitCo2,
    limitRuidoSonoro,
    limitLuminosidade,
    limitTemperatura,
    limitCOVT,
    limitUmidade,

  },{ headers: authHeader() });
};

export const deleteLeitos = (id) => {
  return axios.delete(API_URL + `leito/${id}`, { headers: authHeader() });
};


// API ALERTAS
export const alertaCreate = (nome, idLeito, temperatura, co2, tvoc, umidade, luminosidade, ruido) => {
  return axios.post(API_URL + 'alerta',{
    nome, idLeito, temperatura, co2, tvoc, umidade, luminosidade, ruido
  }, { headers: authHeader() });
};

export const getIdAlerta = (id) => {
  return axios.get(API_URL + `alerta/${id}`, { headers: authHeader() });
};

export const getAlerta = () => {
  return axios.get(API_URL + "alertas", { headers: authHeader() });
};

export const alertaUpdate = (id, nome, idLeito, temperatura, co2, tvoc, umidade, luminosidade, ruido) => {
  return axios.put(API_URL + `alerta/${id}`,{
    nome, idLeito, temperatura, co2, tvoc, umidade, luminosidade, ruido
  }, { headers: authHeader() });
};


export const deleteAlerta = (id) => {
  return axios.delete(API_URL + `alerta/${id}`, { headers: authHeader() });
};


// API RELATÓRIOS
export const getRelatorioId = (id) => {
  return axios.get(API_URL + `relatorio/${id}`, { headers: authHeader() });
};

export const getRelatorios = () => {
  return axios.get(API_URL + "relatorios", { headers: authHeader() });
};

export const createRelatorios = (idLeito ,idAirPure, nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade) => {
  return axios.post(API_URL + "relatorio",{
    idLeito ,idAirPure, nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade
  }, { headers: authHeader() });
};


export const deleteRelatorio = (id) => {
  return axios.delete(API_URL + `relatorio/${id}`, { headers: authHeader() });
};



