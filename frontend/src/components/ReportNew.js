import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import {useState, useEffect} from 'react';
import axios from 'axios';

const columns = [
  {
    field: 'nome',
    headerName: 'Nome',
    width: 150,
  },
  {
    field: 'id',
    headerName: 'ID',
    type: 'number',
  },
  {
    field: 'idLeito',
    headerName: 'ID Leito',
    type: 'number',
  },
  {
    field: 'co2',
    headerName: 'Co2 (PPM)',
    type: 'number',
  },
  {
    field: 'ruidoSonoro',
    headerName: 'RuidoSonoro (db)',
    type: 'number',
  },
  {
    field: 'luminosidade',
    headerName: 'Luminosidade',
    type: 'number',
  },
  {
    field: 'temperatura',
    headerName: 'Temperatura (°C)',
    type: 'number',
  },
  {
    field: 'tvoc',
    headerName: 'COVT (PPB)',
    type: 'number',
  },
  {
    field: 'umidade',
    headerName: 'Umidade (%)',
    type: 'number',
  },
];

/*const rows = [
  {  nome: 'Nome 1', id: 1, idLeito: 1, Co2: 1, RuidoSonoro: 1, Luminosidade: 1, Temperatura: 1, COVT: 1, Umidade: 1 },
  {  nome: 'Nome 2', id: 2, idLeito: 2, Co2: 2, RuidoSonoro: 2, Luminosidade: 2, Temperatura: 2, COVT: 2, Umidade: 2 },
  {  nome: 'Nome 3', id: 3, idLeito: 3, Co2: 3, RuidoSonoro: 3, Luminosidade: 3, Temperatura: 3, COVT: 3, Umidade: 3 },
];*/

const ReportNew = () => {
  let [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(false);

  //let {  nome, id, idLeito, Co2, RuidoSonoro, Luminosidade, Temperatura, COVT, Umidade } = relatorios;



  useEffect(()=>{
    
    const getRelatorios = async()=>{
      setLoading(true); 

      let response = await axios.get(`http://localhost:8080/api/relatorios`)
      setLoading(false); 
      return setRelatorios(response.data);
    } 
    
    getRelatorios();
       
  
  },[])
  const linhas = relatorios.map( ({ idRelatorio, nome, id, idLeito, co2, ruido, luminosidade, temperatura, tvoc, umidade }) => ({
    nome: nome, 
    id: idRelatorio,
    idLeito: idLeito,
    co2: co2,
    ruidoSonoro: ruido,
    luminosidade: luminosidade,
    temperatura: temperatura,
    tvoc: tvoc,
    umidade: umidade,
    key: idRelatorio
  }));
  console.log("relatorio:" + relatorios);
  console.log("linhas: " + linhas);

  return (
    <Container maxWidth="lg" >
        <Box>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={linhas}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </Box>
    </Container>
  );
}

export default ReportNew