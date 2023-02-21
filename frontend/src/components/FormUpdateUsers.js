import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthserveceApi from "../services/authService"
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

;

const AccountProfileDetails = (props) => {
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
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Altere as informações no formulário"
          title="Editar"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
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
            <Grid
              item
              md={6}
              xs={12}
            >
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
            <Grid
              item
              md={6}
              xs={12}
            >
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
            <Grid
              item
              md={6}
              xs={12}
            >
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
            <Grid
              item
              md={12}
              xs={12}
            >
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
            
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(handleRegister)}
          >
           {loading ? <CircularProgress /> : <strong>Salvar</strong>}
          </Button>
          
          {message ? <Alert severity="error">{message}</Alert> : ''}

        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;