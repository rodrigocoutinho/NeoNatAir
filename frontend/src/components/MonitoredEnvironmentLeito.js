import * as React from 'react';
import { useState,useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container,Grid } from '@mui/material';
import axios from 'axios';
import CardLeito from '../components/CardLeito';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';

const MonitoredEnvironmentLeito = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const datetime = new Date().toJSON().slice(0, 19).replace('T', ' ')
  console.log(datetime);

  useEffect(()=>{
    
    const getAmbientes = async()=>{
      setLoading(true); 
      //var sessionToken =  await getToken();  
      let response = await axios.get(`http://localhost:8080/api/leitos`, { /*headers: { sessionToken: sessionToken }*/})
      setLoading(false); 
      return setAmbientes(response.data);
    } 
    
    getAmbientes();
       
  
  },[])
 

  const reload = () =>{
    window.location.reload('false');

  }

  const cardDelete = async(id)=>{
    setLoading(true); 
      //var sessionToken =  await getToken();  
      let response = await axios.delete(`http://localhost:8080/api/leito/${id}`);
      return setAmbientes(response.data);
     
  }

  const cardUpdate = async(id)=>{
    setLoading(true); 
    navigate(`/leito/${id}`);
     
  }
  
  return (
     <Container maxWidth="md" sx={{textAlign: 'center'}}>
        
          <Typography variant="h4" component="div" sx={{marginBottom: 1}}>
                Monitoramento dos Leitos
          </Typography>
          <Typography variant="body" component="div" sx={{mt: 1, marginLeft: 2, color:'#888888'}}>
              Acompanhamento dos leitos configurados para receber alertas.<Button variant="text" onClick={reload}>Atualizar</Button>
          </Typography>

          {loading ? 
            <CircularProgress sx={{ mt: 20}}/>
              :
              <Grid container spacing={2}>
              { 
                ambientes.map((data)=>(
                      <Grid item key={data.id} xs={12} md={4} sm={12}>
                          <CardLeito 
                            data={data}
                            handleDelete={cardDelete}
                            handleUpdate={cardUpdate}
                          />
                      </Grid>
                ))
              }
            </Grid>
          }
     </Container>   
  );
}
export default MonitoredEnvironmentLeito