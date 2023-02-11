import * as React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Typography, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import server from '../services/server';

import Alert from '@mui/material/Alert';

const UpdateLeito = () => {

    const [ambientes, setAmbientes] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [idAirPure, setIdAirPure] = useState('');
    const [nome, setNome] = useState('');
    const [limitCo2, setLimitCo2] = useState('');
    const [limitRuidoSonoro, setLimitRuidoSonoro] = useState('');
    const [limitLuminosidade, setLimitLuminosidade] = useState('');
    const [limitTemperatura, setLimitTemperatura] = useState('');
    const [limitCOVT, setLimitCOVT] = useState('');
    const [limitUmidade, setLimitUmidade] = useState('');
    


    useEffect(() => {

        axios.get(`${server}/api/leito/${id}`)
            .then((resp) => {
                setIdAirPure(resp.data.idAirPure)
                setNome(resp.data.nome)
                setLimitCo2(resp.data.limitCo2)
                setLimitRuidoSonoro(resp.data.limitRuidoSonoro)
                setLimitLuminosidade(resp.data.limitLuminosidade)
                setLimitTemperatura(resp.data.limitTemperatura)
                setLimitCOVT(resp.data.limitCOVT)
                setLimitUmidade(resp.data.limitUmidade)
            })
            .catch((err) => console.log(err))

    }, [id]);



    const handleUpdate = async () => {
        await axios.put(`${server}/api/leito/${id}`, {
            idAirPure,
            nome,
            limitCo2,
            limitRuidoSonoro,
            limitLuminosidade,
            limitTemperatura,
            limitCOVT,
            limitUmidade
        }).then(
            () => {
                setSuccessful(true);
                setTimeout(() => navigate('/monitored-leitos'), 2000);

            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setSuccessful(false);
                setMessage(resMessage);

            }
        );

    };

    const getToken = async () => {
        var response = await axios.post('https://backend-api-floats.vercel.app/api/login', { 'usr': 'inf', 'pass': '25d55ad283aa400af464c76d713c07ad' });
        const { session_token } = response.data;
        return session_token;
    }

    useEffect(() => {

        const getAmbientes = async () => {

            var sessionToken = await getToken();
            let response = await axios.get(`https://backend-api-floats.vercel.app/api/ambientes/4`, { headers: { sessionToken: sessionToken } })

            return setAmbientes(response.data);
        }

        getAmbientes();


    }, [])

    //console.log(ambientes);

    return (

        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
            <Paper sx={{ width: '800px' }}>
                {
                    message ? <Alert severity="error" >{message}</Alert> :
                        successful ? <Alert severity="success">Leito editado com sucesso!</Alert> : ''
                }
                <Typography variant="h4" component="div" sx={{ paddingTop: 2 }}>
                    Editar leito para monitoramento
                </Typography>
                <Typography variant="body" component="div">
                    Preencha o formulário para alterar os parâmetros de monitoramento.
                </Typography>

                <Box component="form" noValidate sx={{ mt: 2, marginLeft: 2, marginRight: 2 }}>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="idAirPure"
                                select
                                label="Selecione o AirPure"
                                variant="standard"
                                fullWidth
                                value={idAirPure}
                                required
                                onChange = {(e) => setIdAirPure(e.target.value)}
                            >
                                {
                                    ambientes.map((data) => (
                                        <MenuItem key={data.id} value={data.id}>{data.sala}</MenuItem>
                                    ))
                                }

                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField

                                id="nome"
                                variant="standard"
                                label="Nome para o leito"
                                fullWidth
                                value={nome}
                                onChange = {(e) => setNome(e.target.value)}

                            />
                        </Grid>
                        <Typography variant="body" component="div" sx={{ mt: 4, marginLeft: 25, color: '#888888' }}>
                            Define os valores limite dos sensores de monitoramento.
                        </Typography>

                        <Grid container spacing={2} sx={{ marginTop: 2 }}>

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
                                    value={limitCo2}
                                    variant="standard"
                                    onChange = {(e) => setLimitCo2(e.target.value)}
                                />
                            </Grid>


                        </Grid>

                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                                    value={limitCOVT}
                                    onChange = {(e) => setLimitCOVT(e.target.value)}
                                />
                            </Grid>


                        </Grid>

                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                                    value={limitUmidade}
                                    onChange = {(e) => setLimitUmidade(e.target.value)}
                                />
                            </Grid>

                        </Grid>


                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                                    value={limitLuminosidade}
                                    onChange = {(e) => setLimitLuminosidade(e.target.value)}
                                />
                            </Grid>

                        </Grid>


                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                                    value={limitTemperatura}
                                    onChange = {(e) => setLimitTemperatura(e.target.value)}
                                />
                            </Grid>

                        </Grid>
                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                                    value={limitRuidoSonoro}
                                    onChange = {(e) => setLimitRuidoSonoro(e.target.value)}
                                />
                            </Grid>

                        </Grid>


                    </Grid>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleUpdate()}
                    >
                        Atualizar Leito
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default UpdateLeito