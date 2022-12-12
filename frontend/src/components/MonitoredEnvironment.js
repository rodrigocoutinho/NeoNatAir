import * as React from 'react';
import { useState,useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container,Grid } from '@mui/material';
import axios from 'axios';
import CardMonitored from '../components/CardMonitored';
import CircularProgress from '@mui/material/CircularProgress';

const MonitoredEnvironmente = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(false);
  

    const getToken  =  async ()=> {
    var response = await axios.post('https://backend-api-floats.vercel.app/api/login', { 'usr': 'inf', 'pass': '25d55ad283aa400af464c76d713c07ad' });
    const {session_token} = response.data;
    return session_token;
    }
  
  useEffect(()=>{
    
    const getAmbientes = async()=>{
      setLoading(true); 
      var sessionToken =  await getToken();  
      let response = await axios.get(`https://backend-api-floats.vercel.app/api/ambientes/4`, { headers: { sessionToken: sessionToken }})
      setLoading(false); 
      return setAmbientes(response.data);
    } 
    
    getAmbientes();
       
  
  },[])
 

  const reload = () =>{
    window.location.reload('false');

  }
  const cardDelete = ()=>{
    
     
  }
  
  return (
     <Container maxWidth="md" sx={{textAlign: 'center'}}>
        
          <Typography variant="h4" component="div" sx={{marginBottom: 1}}>
                Ambientes Monitorados
          </Typography>
          <Typography variant="body" component="div" sx={{mt: 1, marginLeft: 2, color:'#888888'}}>
              Acompanhamento dos senssores de ambientes configurados para receber alertas.<Button variant="text" onClick={reload}>Atualizar</Button>
          </Typography>

          {loading ? 
            <CircularProgress sx={{ mt: 20}}/>
              :
              <Grid container spacing={2}>
              { 
                ambientes.map((data)=>(
                      <Grid item key={data.id} xs={12} md={4} sm={12}>
                          <CardMonitored 
                            data={data}
                            handleDelete={cardDelete}
                          />
                      </Grid>
                ))
              }
            </Grid>
          }
     </Container>   
  );
}
export default MonitoredEnvironmente