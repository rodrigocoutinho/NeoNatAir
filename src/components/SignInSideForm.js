import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthserveceApi from '../services/authService';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://neonatair.com/">
        Sistema NeoNatAir
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}





const SignInSideForm = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (data, e) => {
    e.preventDefault();

    console.log(JSON.stringify(data))

    setMessage("");
    setLoading(true);

    if (JSON.stringify(data) !== {}) {
      AuthserveceApi.login(data.email, data.password).then(
        () => {
          navigate("/wellcome");
        
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
    <Box
      sx={{
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
        <TextField
        sx={{ mt: 3 }}
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit(handleLogin)}
        >
          {loading ? <CircularProgress /> : "Logar"}
        </Button>

        {message ? <Alert severity="error">{message}</Alert> : ''}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>





  );
}
export default SignInSideForm