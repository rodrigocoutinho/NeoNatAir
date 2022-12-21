import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const createLeito = (idAirPure, nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade) => {
  return axios.post(API_URL + "leito", {
    idAirPure,
    nome, 
    limitCo2, 
    limitRuidoSonoro, 
    limitLuminosidade, 
    limitTemperatura, 
    limitCOVT, 
    limitUmidade,
  });
};



{
    /*
     export const getLeito = () => {
    return axios.get(API_URL + "leito");
  };
    
    
    */
}
  export default createLeito