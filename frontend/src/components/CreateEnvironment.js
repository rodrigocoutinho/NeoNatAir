import * as React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Typography, MenuItem} from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createParametros } from '../services/service';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const CreateEnvironment = () =>{
    const { register, handleSubmit } = useForm();
    const [ambientes, setAmbientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const getToken  =  async ()=> {
        var response = await axios.post('https://backend-api-floats.vercel.app/api/login', { 'usr': 'inf', 'pass': '25d55ad283aa400af464c76d713c07ad' });
        const {session_token} = response.data;
        return session_token;
        }

        useEffect(()=>{
    
            const getAmbientes = async()=>{
            
              var sessionToken =  await getToken();  
              let response = await axios.get(`https://backend-api-floats.vercel.app/api/ambientes/4`, { headers: { sessionToken: sessionToken }})
           
              return setAmbientes(response.data);
            } 
            
            getAmbientes();
               
          
          },[])

          console.log(ambientes);

    const handleParametros = (data,e) => {
        e.preventDefault();
        console.log(JSON.stringify(data))

    if (JSON.stringify(data) !== {}) {
        createParametros(data.idAirPure, data.limitCo2, data.limitRuidoSonoro, data.limitLuminosidade, data.limitTemperatura, data.limitCOVT, data.limitUmidade ).then(
          () => {
            navigate("/");
            window.location.reload();
            
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setLoading(false);
            setMessage(resMessage);
          }
        );
      } else {
        setLoading(false);
      }
    };



    


    return(
        <Container maxWidth="sm" sx={{textAlign: 'center'}}>
            <Paper sx={{width: '600px'}}>
            <Typography variant="h4" component="div" sx={{ paddingTop: 2}}>
               Define parâmetros
            </Typography>
            <Typography variant="body" component="div">
                Preencha o formulário para definir os parâmetros.
            </Typography>
           
            <Box component="form" noValidate  sx={{ mt: 3, marginLeft:2, marginRight: 2 }}>
             
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="idAirPure"
                            select
                            label="Selecione o ambiente"  
                            variant="standard"
                            fullWidth
                            {...register("idAirPure",{required:'Por favor insera o nome do ambiente'})}
                            >
                            {
                                ambientes.map((data)=>(
                                    <MenuItem value={data.id}>{data.sala}</MenuItem>
                                ))
                            }  

                        </TextField>
                    </Grid>

                      <Typography variant="body" component="div" sx={{mt: 4, marginLeft: 8.75, color:'#888888'}}>
                        Define os valores limite dos sensores de monitoramento.
                      </Typography>

                    <Grid container spacing={2} sx={{marginTop: 2}}>
                           
                                <Grid item xs={4}>
                                    <Typography variant="h6">
                                        Co2
                                    </Typography>
                                </Grid>
                      
                           
                            <Grid item xs={4}>    
                                <TextField
                                    id="limitCo2"
                                    label="Valor limite CO2"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    {...register("limitCo2",{required:'Por favor insera o valor'})}
                                    />
                            </Grid>
                       
                       
                    </Grid>

                    <Grid container spacing={2} sx={{marginTop: 2}}>
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                                COTV
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={4}>    
                            <TextField
                                id="limitCOVT"
                                label="Valor limite COTV"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                {...register("limitCOVT",{required:'Por favor insera o valor '})}
                                />
                        </Grid>

                        
                    </Grid>

                    <Grid container spacing={2} sx={{marginTop: 2}}>
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                                Umidade 
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            
                        <TextField
                            id="limitUmidade"
                            label="Valor limite Umidade"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            {...register("limitUmidade",{required:'Por favor insera o valor'})}
                            />
                        </Grid>
                       
                    </Grid>


                    <Grid container spacing={2} sx={{marginTop: 2}}>
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                                Luminosidade
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            
                        <TextField
                            id="limitLuminosidade"
                            label="Valor limite luminosidade"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            {...register("limitLuminosidade",{required:'Por favor insera o valor'})}
                            />
                        </Grid>
                     
                    </Grid>


                    <Grid container spacing={2} sx={{marginTop: 2}}>
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                                Temperatura
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            
                        <TextField
                            id="limitTemperatura"
                            label="Valor limite Temperatura"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            {...register("limitTemperatura",{required:'Por favor insera o valor '})}
                            />
                        </Grid>
                     
                    </Grid>
                    <Grid container spacing={2} sx={{marginTop: 2}}>
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                                Ruido sonoro
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            
                        <TextField
                            id="limitRuidoSonoro"
                            label="Valor limite ruido sonoro"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            {...register("limitRuidoSonoro",{required:'Por favor insera o valor'})}
                            />
                        </Grid>
                     
                    </Grid>

                    
                </Grid>
                
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit(handleParametros)}
                    >
                     {loading ? <CircularProgress/>:"Criar parâmetros"}
                </Button>
            </Box>
            </Paper>
        </Container>
    );
}

export default CreateEnvironment