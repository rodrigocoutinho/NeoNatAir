import * as React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Typography, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getLeitosId, updateLeitos } from '../services/serviceApi';
import Alert from '@mui/material/Alert';
import { useParams, useNavigate } from 'react-router-dom';


// Estilização dos alertas de feedback 
const style = {
    display: 'flex',
    position: 'absolute',
    left: '17%',
    top: '2%',
    width: '530px',
    height: '66px',
    justifyContent: 'center',

}

// Estilização dos label sensores 
const fontStyle = {
    color: '#191a1c',
    fontSize: '1.25rem'
}


const UpdateLeito = () => {
   
    const [ambientes, setAmbientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [successful, setSuccessful] = useState(false);



    const [idAirPure, setIdAirPure] = useState('');
    const [nome, setNome] = useState('');
    const [limitCo2, setLimitCo2] = useState('');
    const [limitRuidoSonoro, setLimitRuidoSonoro] = useState('');
    const [limitLuminosidade, setLimitLuminosidade] = useState('');
    const [limitTemperatura, setLimitTemperatura] = useState('');
    const [limitCOVT, setLimitCOVT] = useState('');
    const [limitUmidade, setLimitUmidade] = useState('');


    const { id } = useParams();
    const navigate = useNavigate();

    const getToken = async () => {
        var response = await axios.post('https://backend-api-floats.vercel.app/api/login', { 'usr': 'inf', 'pass': '25d55ad283aa400af464c76d713c07ad' });
        const { session_token } = response.data;
        return session_token;
    }

    useEffect(() => {
        const getAmbientes = async () => {
            setLoading(true);
            var sessionToken = await getToken();
            let response = await axios.get(`https://backend-api-floats.vercel.app/api/ambientes/4`, { headers: { sessionToken: sessionToken } })
            setLoading(false);
            return setAmbientes(response.data);
        }


        getAmbientes();

    }, []);

    useEffect(() => {
        const getLeitosCreated = async (id) => {
            await getLeitosId(id).then((resp) => {
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

        }
        getLeitosCreated(id);
    }, [id]);


    const handleUpdate = async () => {
        await updateLeitos(id, idAirPure, nome, limitCOVT, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade).then(
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
                setMessageError(resMessage);
                setTimeout(() => window.location.reload(), 2000);

            }
        );

    };







    return (

        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
            <Paper sx={{ width: '800px', position: 'fixed', mt: 5 }}>

                {
                    messageError ? <Alert severity="error" sx={style} >{messageError}</Alert> :
                        successful ? <Alert severity="success" sx={style}><strong>Leito atualizado com sucesso!</strong></Alert> : ''
                }
                <Typography variant="h4" component="div" sx={{ paddingTop: 3 }}>
                    Atulizar  leito para monitoramento
                </Typography>

                <Box component="form" noValidate sx={{ mt: 5, marginLeft: 2, marginRight: 2 }}>

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
                                onChange={(e) => setIdAirPure(e.target.value)}

                            >
                                {
                                     loading ? <MenuItem>Aguarde...</MenuItem> :
                                    ambientes.map((data) => (
                                        <MenuItem key={data.id} value={data.id}>AirPure - {data.id} -- <strong> {data.status} </strong></MenuItem>
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
                                onChange={(e) => setNome(e.target.value)}
                            />

                        </Grid>
                        <Typography variant="body" component="div" sx={{ mt: 4, marginLeft: 25, color: '#888888' }}>
                            Define os valores limite dos sensores de monitoramento.
                        </Typography>

                        <Grid container spacing={2} sx={{ marginTop: 2 }}>

                            <Grid item xs={2}>
                                <Typography sx={fontStyle}>
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
                                    onChange={(e) => setLimitCo2(e.target.value)}

                                />
                            </Grid>

                            <Grid item xs={2}>
                                <Typography sx={fontStyle}>
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
                                    onChange={(e) => setLimitCOVT(e.target.value)}

                                />
                            </Grid>

                        </Grid>



                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
                            <Grid item xs={2}>
                                <Typography sx={fontStyle}>
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
                                    onChange={(e) => setLimitUmidade(e.target.value)}
                                />
                            </Grid>


                            <Grid item xs={2}>
                                <Typography sx={fontStyle}>
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
                                    onChange={(e) => setLimitLuminosidade(e.target.value)}

                                />
                            </Grid>

                        </Grid>




                        <Grid container spacing={1} sx={{ marginTop: 2 }}>
                            <Grid item xs={2}>
                                <Typography sx={fontStyle}>
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
                                    onChange={(e) => setLimitTemperatura(e.target.value)}

                                />
                            </Grid>

                            <Grid item xs={2}>
                                <Typography sx={fontStyle}>
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
                                    onChange={(e) => setLimitRuidoSonoro(e.target.value)}

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
                        <strong>Atulizar Leito</strong>
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default UpdateLeito