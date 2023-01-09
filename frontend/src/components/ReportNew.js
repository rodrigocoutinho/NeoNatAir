import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

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
    field: 'idAirPure',
    headerName: 'ID AirPure',
    type: 'number',
  },
  {
    field: 'Co2',
    headerName: 'Co2 (PPM)',
    type: 'number',
  },
  {
    field: 'RuidoSonoro',
    headerName: 'RuidoSonoro (db)',
    type: 'number',
  },
  {
    field: 'Luminosidade',
    headerName: 'Luminosidade',
    type: 'number',
  },
  {
    field: 'Temperatura',
    headerName: 'Temperatura (°C)',
    type: 'number',
  },
  {
    field: 'COVT',
    headerName: 'COVT (PPB)',
    type: 'number',
  },
  {
    field: 'Umidade',
    headerName: 'Umidade (%)',
    type: 'number',
  },
];

const rows = [
  {  nome: 'Nome 1', id: 1, idLeito: 1, idAirPure: 1, Co2: 1, RuidoSonoro: 1, Luminosidade: 1, Temperatura: 1, COVT: 1, Umidade: 1 },
  {  nome: 'Nome 2', id: 2, idLeito: 2, idAirPure: 2, Co2: 2, RuidoSonoro: 2, Luminosidade: 2, Temperatura: 2, COVT: 2, Umidade: 2 },
  {  nome: 'Nome 3', id: 3, idLeito: 3, idAirPure: 3, Co2: 3, RuidoSonoro: 3, Luminosidade: 3, Temperatura: 3, COVT: 3, Umidade: 3 },
];

const ReportNew = () => {
  return (
    <Container maxWidth="lg" >
        <Box>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
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