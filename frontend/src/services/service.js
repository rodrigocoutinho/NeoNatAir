import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const createParametros = (idAirPure, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade) => {
  return axios.post(API_URL + "parametro", {
    idAirPure, 
    limitCo2, 
    limitRuidoSonoro, 
    limitLuminosidade, 
    limitTemperatura, 
    limitCOVT, 
    limitUmidade,
  });
};

export const createLeito = (idAirPure,idParametro  ) => {
    return axios.post(API_URL + "leito", {
      idAirPure, 
      idParametro,
     
    });
  };


{
    /*
     export const getLeito = () => {
    return axios.get(API_URL + "leito");
  };
    
    
    */
}
  