import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import AuthserveceApi from "../services/authService"
import { useForm } from "react-hook-form";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';



function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


const EditUsers = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = (data, e) => {
        e.preventDefault();
        console.log(JSON.stringify(data))

        setMessage("");
        setLoading(true);

        if (JSON.stringify(data) !== {}) {
            AuthserveceApi.registerUser(data.cpf, data.telefone, data.name, data.email, data.password, data.confPassword).then(
                () => {
                    navigate("/wellcome");
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
    return (
        <>
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Paper elevation={3} sx={{ width: '260px', height: '360px', position: 'fixed' }}>
                            <Box sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginLeft: 2,
                                marginRight: 2
                            }} >
                                <Avatar {...stringAvatar('Kent Dodds')} />
                                <Grid container>
                                    <Grid item xs={12}>

                                        <Typography variant="h6" component="div" sx={{ paddingTop: 2, color: '#888888' }}>
                                            Nome:
                                        </Typography>
                                        <Typography variant="h6" component="div" sx={{ paddingTop: 2, color: '#888888' }}>
                                            Nome:
                                        </Typography>
                                        <Typography variant="h6" component="div" sx={{ paddingTop: 2, color: '#888888' }}>
                                            Nome:
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper sx={{ width: '800px', position: 'fixed' }}>
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginLeft: 2,
                                    marginRight: 2
                                }}
                            >
                                <Typography variant="h6" component="div" sx={{ paddingTop: 2, color: '#888888' }}>
                                    Criar conta do usuário reponsável pelo o manitoramento dos leitos
                                </Typography>

                                <Box component="form" noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                variant="outlined"
                                                fullWidth
                                                id="name"
                                                label="Nome"
                                                {...register("name", {
                                                    required: {
                                                        value: true,
                                                        message: 'Por favor informe seu Nome'
                                                    },
                                                    pattern: {
                                                        value: /[a-z-A-Z][a-z]/,
                                                        message: 'Insira um Nome valido!'
                                                    }
                                                })}
                                                error={Boolean(errors.name)}
                                                helperText={errors.name?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                variant="outlined"
                                                fullWidth
                                                id="cpf"
                                                label="CPF"
                                                {...register("cpf", {
                                                    required: {
                                                        value: true,
                                                        message: 'Por favor informe seu CPF'
                                                    },
                                                    pattern: {
                                                        value: /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/,
                                                        message: 'Insira um CPF valido!'
                                                    }
                                                })}
                                                error={Boolean(errors.cpf)}
                                                helperText={errors.cpf?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                variant="outlined"
                                                fullWidth
                                                id="telefone"
                                                label="Telefone"
                                                {...register("telefone", {
                                                    required: {
                                                        value: true,
                                                        message: 'Por favor informe seu número de telefone'
                                                    },
                                                    pattern: {
                                                        value: /[0-9]{11}/,
                                                        message: 'Insira um número valido!'
                                                    }
                                                })}
                                                error={Boolean(errors.telefone)}
                                                helperText={errors.telefone?.message}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                variant="outlined"
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                autoComplete="email"
                                                {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message: 'Por favor informe seu Email'
                                                    },
                                                    pattern: {
                                                        value: /^[a-z.!#$%&'*+/=?^_`{|}~-]+@[a-z-0-9](?:[a-z-0-9-]{0,61}[a-z-0-9])?(?:\.[a-z-0-9](?:[a-z-0-9-]{0,61}[a-z-0-9])?)*$/,
                                                        message: 'Por favor insira um Email valido !'
                                                    }
                                                })}
                                                error={Boolean(errors.email)}
                                                helperText={errors.email?.message}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                variant="outlined"
                                                fullWidth
                                                label="Criar senha"
                                                type="password"
                                                id="password"
                                                {...register("password", {
                                                    required: {
                                                        value: true,
                                                        message: 'Por favor Cria uma senha'
                                                    },
                                                    pattern: {
                                                        value: /[A-Za-z0-9]/,
                                                        message: 'Por favor insira um senha valido !'
                                                    }
                                                })}
                                                error={Boolean(errors.password)}
                                                helperText={errors.password?.message}

                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={handleSubmit(handleRegister)}
                                    >
                                        {loading ? <CircularProgress /> : <strong>Salvar</strong>}
                                    </Button>

                                    {message ? <Alert severity="error">{message}</Alert> : ''}

                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>

            </Container>
        </>
    );
}

export default EditUsers;