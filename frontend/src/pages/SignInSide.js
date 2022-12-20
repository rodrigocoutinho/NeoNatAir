import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImgSignin from '../assets/signinImg.png';
 
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sistema NeoNatAir
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignInSide = () => {
  
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        <Grid item xs={12} sm={8} md={6} >
        <Box
          sx={{
             mt:15,
            textAlign: 'center',
            marginRight: 10,
            marginLeft: 10,
            color:'#143053'
          }}
        >
          <Typography variant="h3" component="div">
             Sistema NeoNatAir
          </Typography>
          <Typography variant="body1" gutterBottom sx={{textAlign: 'justify'}}>
          A importância do monitoramento dos recém-nascidos e o ambiente de Unidade de Terapia Intensiva Neonatal,
           a IoT pode ser utilizada para não só garantir o monitoramento constante e ininterrupto, 
           mas também para automação de ações e, principalmente, para análise de dados, 
           isando a identificação precoce de problemas com o ambiente, melhorando a prevenção e tratamento dos casos. Sendo assim, 
           é necessário monitorar esse ambiente em seus diversos aspectos, 
           como concentração de dióxido de carbono, temperatura, umidade, compostos orgânicos voláteis, nível de ruídos e 
           intensidade da luminosidade.

          </Typography>
            <Box>
              <img src={ImgSignin} alt=""/>
            </Box>
        </Box>   
        </Grid>
        
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              mt: 20,
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
                variant="standard" 
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="email"
              />
              <TextField
               variant="standard" 
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default SignInSide