import * as React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Typography, MenuItem} from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useForm } from "react-hook-form";

const CreateEnvironment = () =>{
    const { register, handleSubmit } = useForm();

    const handleLogin = (data,e) => {
        e.preventDefault();
        console.log(JSON.stringify(data))
    }
    return(
        <Container maxWidth="sm" sx={{textAlign: 'center'}}>
            <Paper sx={{width: '600px'}}>
            <Typography variant="h4" component="div" sx={{mt: 5, paddingTop: 2}}>
                Configurações de Alerta
            </Typography>
            <Typography variant="body" component="div">
                Preencha o formulário para monitoramento do ambiente.
            </Typography>
           
            <Box component="form" noValidate  sx={{ mt: 3, marginLeft:2, marginRight: 2 }}>
             
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="select-environments"
                            select
                            label="Selecione o ambiente"  
                            variant="standard"
                            fullWidth
                            {...register("select-environments",{required:'Por favor insera o Id do Airpure'})}
                            >
                            <MenuItem value='Recepção'>Recepção</MenuItem>
                            <MenuItem value='UTI-sala 100'> UTI-sala 100</MenuItem>
                            <MenuItem value='Consultorio'>Consultorio</MenuItem>



                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                        variant="standard" 
                        fullWidth
                        id="idAirpure"
                        label="Id Airpure"
                        name="idAirpure"
                        {...register("idAirpure",{required:'Por favor insera o Id do Airpure'})}
                        />
                    </Grid>

                      <Typography variant="body" component="div" sx={{mt: 2, marginLeft: 2, color:'#888888'}}>
                        Define os valores Mínimo e Máximo dos sensores de monitoramento.
                      </Typography>

                    <Grid container spacing={2} sx={{marginTop: 2}}>
                           
                                <Grid item xs={4}>
                                    <Typography variant="h6">
                                        Co2
                                    </Typography>
                                </Grid>
                      
                           
                            <Grid item xs={4}>    
                                <TextField
                                    id="co2-max"
                                    label="Mínimo"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    {...register("co2-min",{required:'Por favor insera o Id do Airpure'})}
                                    />
                            </Grid>
                       
                        <Grid item xs={4}>
                            <TextField
                                id="co2-min"
                                label="Máximo"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                {...register("co2-max",{required:'Por favor insera o Id do Airpure'})}
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
                                id="cotv-min"
                                label="Mínimo"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                {...register("cotv-min",{required:'Por favor insera o Id do Airpure'})}
                                />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                id="cotv-min"
                                label="Máximo"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                {...register("cotv-max",{required:'Por favor insera o Id do Airpure'})}
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
                            id="umidade-min"
                            label="Mínimo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            {...register("umidade-min",{required:'Por favor insera o Id do Airpure'})}
                            />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            id="umidade-max"
                            label="Máximo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            {...register("umidade-max",{required:'Por favor insera o Id do Airpure'})}
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
                            id="temperatura-min"
                            label="Mínimo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            {...register("temperatura-min",{required:'Por favor insera o Id do Airpure'})}
                            />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            id="temperatura-max"
                            label="Máximo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            {...register("temperatura-max",{required:'Por favor insera o Id do Airpure'})}
                            />
                        </Grid>
                    </Grid>
                
                </Grid>
                
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit(handleLogin)}
                    >
                    "Criar Ambiente"
                </Button>
            </Box>
            </Paper>
        </Container>
    );
}

export default CreateEnvironment