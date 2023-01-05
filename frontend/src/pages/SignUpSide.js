import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";




const SignUpSide = () => {
  const [cpf, setCPF] = useState('');
  const [telefone, setTelefone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const server = 'http://localhost:8080'

  async function Register() {

    const response = await axios.post(`${server}/register`, {
      cpf: cpf,
      telefone: telefone,
      name: name,
      email: email,
      password: password,
      confPassword: confPassword
    })
    navigate('/');
    const bodyResponse = await response.json();
    console.log(bodyResponse.body);
  }


  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
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
                variant="standard"
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="telefone"
                label="Telefone"
                name="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}

              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => Register()}
          >
            "Continuar"
          </Button>

          {<Alert severity="error">{ }</Alert>}
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