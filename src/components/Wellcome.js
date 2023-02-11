import React from 'react'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const Wellcome = () => {
    const navigate = useNavigate();
   
     
    return (
        <Container maxWidth="sm" sx={{textAlign: 'center',color:'#888888'}}>
            <Typography variant="h4" component="div" sx={{marginTop:20,color:'#143053'}}>
                Bem vindo ao Sistema NeoNatAir !
            </Typography>
            <Typography variant="h6" component="div" >
                Vamos començar nossa jornada ?!
            </Typography>
            <Typography variant="body2" gutterBottom sx={{textAlign: 'justify'}}>
              Primeiramente precisamos definir os parâmetros de alertas dos ambientes que serão monitorados.
            </Typography>
            <Button variant="contained" sx={{marginTop:2}} onClick={()=>{navigate("/leitoform")}}>Definir Parâmetros</Button>
      </Container>
    );
}

export default Wellcome