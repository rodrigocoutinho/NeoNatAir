import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AuthserviceApi from '../services/authService';
import { useForm } from "react-hook-form";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Avatar, Card, CardActions, CardContent, Divider, } from '@mui/material';




// Estilização dos alertas de feedback 

const CreateUsers = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [messageError, setMessageError] = useState("");
    const [successful, setSuccessful] = useState(false);


    const handleRegister = (data, e) => {
        e.preventDefault();
        data.roles = ['equipeTecnica'];
        console.log(JSON.stringify(data))

        if (JSON.stringify(data) !== {}) {
            AuthserviceApi.registerUser(data.cpf, data.telefone, data.name, data.email, data.roles, data.password, data.confPassword).then(
                () => {
                    setSuccessful(true);
                    reset();
                    setTimeout(() => setSuccessful(false), 2000);

                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessageError(resMessage);
                    setTimeout(() => window.location.reload(), 3000);
                }
            );
        } 


    };

    return (
        <>

            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                {
                    messageError ? <Alert severity="error"  >{messageError}</Alert> :
                        successful ? <Alert severity="success" ><strong>Novo Usuário criado com sucesso!</strong></Alert> : ''
                }
                <Grid container spacing={3}>
                    <Grid item lg={4} md={6} xs={12}>
                        <Card {...props}>
                            <CardContent>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Avatar

                                        sx={{
                                            height: 64,
                                            mb: 2,
                                            width: 64
                                        }}
                                    />

                                </Box>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button
                                    color="primary"
                                    fullWidth
                                    variant="text"
                                >
                                    Upload picture
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item lg={8} md={6} xs={12}>
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
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                variant="outlined"
                                                fullWidth
                                                label="Confirma senha"
                                                type="password"
                                                id="confPassword"
                                                {...register("confPassword", {
                                                    required: {
                                                        value: true,
                                                        message: 'Por favor confirma a senha'
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
                                         <strong>Cadastrar</strong>
                                    </Button>

                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </>
    );
}

export default CreateUsers;