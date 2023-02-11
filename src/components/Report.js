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
import CollapsibleTable from './CollapsibleTable'



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

const labels = ['00:00','03:00','06:00','09:00','12:00','15:00','18:00','21:00','24:00'];

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

const Report = ()=>{
    
 
    return(
      <>
        <Container maxWidth="sm">
          <Box>
           <Line options={options} data={data} />
          </Box>
          <Typography variant="body" component="div" sx={{mt: 5, marginLeft: 2, color:'#888888'}}>
              Históricos dos alertas.
          </Typography>

          <Box sx={{mt: 2, mb:5}}>
            <CollapsibleTable/>
          </Box>
        </Container>
  
      </>
    );
}

export default Report