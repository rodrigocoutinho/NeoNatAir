import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import AuthserviceApi from "../services/authService"


const SignUpSide = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = (data, e) => {
    e.preventDefault();
    data.roles = ["admin"]
    console.log(JSON.stringify(data))

    setMessage("");
    setLoading(true);

    if (JSON.stringify(data) !== {}) {
     AuthserviceApi.registerUser(data.cpf, data.telefone, data.name, data.email, data.roles, data.password, data.confPassword).then(
        () => {
          navigate("/");
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

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                variant="standard"
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
                variant="standard"
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
                variant="standard"
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
                variant="standard"
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
                variant="standard"
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
                variant="standard"
                fullWidth
                label="Confirmar senha"
                type="password"
                id="confPassword"
                {...register("confPassword", {
                  required: {
                    value: true,
                    message: 'Por favor confirma sua senha'
                  },
                  pattern: {
                    value: /[A-Za-z0-9]/,
                    message: 'Por favor insira um senha valido!'
                  }
                })}
                error={Boolean(errors.confPassword)}
                helperText={errors.confPassword?.message}

              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(handleRegister)}
          >
            {loading ? <CircularProgress /> : "Criar conta admin"}
          </Button>

          {message ? <Alert severity="error">{message}</Alert> : ''}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  );
}
export default SignUpSide 