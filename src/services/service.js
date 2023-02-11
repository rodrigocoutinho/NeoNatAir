import axios from "axios";
import server from './server';

const createLeito = (idAirPure, nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade) => {
  return axios.post(server + "/api/leito", {
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