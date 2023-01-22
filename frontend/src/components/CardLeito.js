import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ITEM_HEIGHT = 40;

const CardLeito = ({ data, handleLeitura, handleDelete, handleUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  let [airPure, setAirPure] = useState([]);
  //const [status, setStatus] = useState();
  //const {status, co2, datamedicao, lux, temperatura, db, tvoc, umidade } = useState('');

  const getToken = async () => {
    var response = await axios.post('https://backend-api-floats.vercel.app/api/login', { 'usr': 'inf', 'pass': '25d55ad283aa400af464c76d713c07ad' });
    const { session_token } = response.data;
    return session_token;
  }

  useEffect(() => {

    const getAmbientes = async () => {
      //setLoading(true); 
      var sessionToken = await getToken();
      let response = await axios.get(`https://backend-api-floats.vercel.app/api/ultimoValor/${data.idAirPure}`, { headers: { sessionToken: sessionToken } })
      //setLoading(false);
      //setStatus(response.data.status);
      return setAirPure(...response.data);
    }

    getAmbientes();


  }, [data.idAirPure])

  let getLeitura = async (idAirPure) => {
    //setLoading(true); 
    var sessionToken = await getToken();
    let response = await axios.get(`https://backend-api-floats.vercel.app/api/ultimoValor/${idAirPure}`, { headers: { sessionToken: sessionToken } })
    //setLoading(false);
    //setStatus(response.data.status);
    setAirPure(...response.data)
    console.log(...response.data);
  }


  const gravarRelatorio = async (data, airPure) => {
    var response = await axios.post('http://localhost:8080/api/relatorio', {
      nome: data.nome,
      idLeito: data.idLeito,
      idAirPure: data.idAirPure,
      temperatura: airPure.temperatura,
      co2: airPure.co2,
      tvoc: airPure.tvoc,
      umidade: airPure.umidade,
      luminosidade: airPure.luminosidade,
      ruido: airPure.ruido
    })
    return response.data;
  }
  setTimeout(() => { gravarRelatorio(data, airPure); }, 10000)

  const handleExpandClick = () => {
    setExpanded(!expanded);

  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{
      maxWidth: 345,
      backgroundColor: '#C3DAFD',
      mt: 2,
      textAlign: 'center',

    }}>
      <CardHeader

        action={
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '150px',
                },
              }}
            >

              <MenuItem onClick={handleClose} >
                <VisibilityOutlinedIcon
                  onClick={() => { setLoading(false) }}
                  sx={{ mr: 1 }} />
                Leitura Atual
              </MenuItem>
              <MenuItem onClick={() => { handleUpdate(data.idLeito) }} >
                <EditOutlinedIcon sx={{ mr: 1 }} />
                Editar
              </MenuItem>
              <MenuItem onClick={() => { handleDelete(data.idLeito) }} >
                <DeleteOutlineOutlinedIcon sx={{ mr: 1 }} />
                Excluir
              </MenuItem>

            </Menu>
          </>
        }
        title={data.nome}
        subheader={airPure.status}
      />
      <CardMedia

      />
      { }
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          ID Leito: {data.idLeito}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID AirPure: {data.idAirPure}
        </Typography>
        <Typography paragraph>
          COTV : {airPure.tvoc} PPB
        </Typography>
        <Typography paragraph>
          Co2 : {airPure.co2} PPM
        </Typography>
        <Typography paragraph>
          Umidade: {airPure.umidade} %
        </Typography>
        <Typography>
          Temperatura: {airPure.temperatura}°C
        </Typography>
        <Typography>
          Luminosidade: {airPure.lux}
        </Typography>
        <Typography>
          Ruido: {airPure.db} db
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Valor limite COTV : {data.limitCOVT} PPB
          </Typography>
          <Typography paragraph>
            Valor limite Co2 : {data.limitCo2} PPM
          </Typography>
          <Typography paragraph>
            Valor limite Umidade: {data.limitUmidade} %
          </Typography>
          <Typography>
            Valor limite Temperatura: {data.limitTemperatura}°C
          </Typography>
          <Typography>
            Valor limite Luminosidade: {data.limitLuminosidade}
          </Typography>
          <Typography>
            Valor limite Ruido: {data.limitRuidoSonoro} db
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default CardLeito