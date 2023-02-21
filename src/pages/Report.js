import * as React from 'react';
import { Box, Container } from '@mui/system';
import { Typography } from '@mui/material';
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CollapsibleTable from '../components/CollapsibleTable'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getRelatorios } from '../services/serviceApi';


// Dashboard 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: new Date(),
    },
  },
};

const labels = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];

const data = {
  labels,
  datasets: [
    {
      label: 'Não conformidade',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },

  ],
};

// Tabs 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




const Report = () => {
  const [value, setValue] = useState(0);
  const [reports, setReports] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const getReports = async () => {
    let response = await getRelatorios();
    return setReports(response.data);
  }


  useEffect(() => {
  
    getReports();
  }, [])

 
 console.log(reports)

//Datagrid

const rows = reports.map((row,index)=>({
  id: index,
  idRelatorio: row.idRelatorio,
  idLeito: row.idLeito,
  idAirPure: row.idAirPure,
  nome: row.nome,
  co2: row.co2,
  tvoc: row.tvoc,
  luminosidade: row.luminosidade,
  ruido: row.ruido,
  temperatura: row.limitTemperatura,
  umidade: row.limitUmidade,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt

}));

const columns = [
  { field: 'idRelatorio', headerName: 'IdRelatorio', width: 150 },
  { field: 'idLeito', headerName: 'IdLeito', width: 150 },
  { field: 'idAirPure', headerName: 'IdAirPure', width: 150 },
  { field: 'nome', headerName: 'Nome', width: 150 },
  { field: 'co2', headerName: 'CO2', width: 150 },
  { field: 'tvoc', headerName: 'Tvoc', width: 150 },
  { field: 'luminosidade', headerName: 'Luminosidade', width: 150 },
  { field: 'ruido', headerName: 'Ruido sonoro', width: 150 },
  { field: 'temperatura', headerName: 'Temperatura', width: 150 },
  { field: 'umidade', headerName: 'Umidade', width: 150 },
  { field: 'createdAt', headerName: 'Data de criação', width: 150 },
  { field: 'updatedAt', headerName: 'Data de update', width: 150 },
];

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ width: '100%' }}>
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
              <Tab label="Dashboard" {...a11yProps(0)} />
              <Tab label="Histórico por Filtro" {...a11yProps(1)} />
              <Tab label="Relatório de Criação " {...a11yProps(2)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Box>
              <Line options={options} data={data} />
            </Box>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Typography variant="body" component="div" sx={{ mt: 5, mb: 5, marginLeft: 2, fontWeight: 'bold'}}>
              Relatórios dos Alertas 
            </Typography>
            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} />
            </Box>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Typography variant="body" component="div" sx={{ mt: 5, marginLeft: 2, fontWeight: 'bold' }}>
              Históricos de Criação dos Leitos
            </Typography>
            <Box sx={{ mt: 5, mb: 5, maxWith: '100%' }}>
              <CollapsibleTable />
            </Box>
          </TabPanel>

        </Box>
      </Container>
    </>
  );
}

export default Report