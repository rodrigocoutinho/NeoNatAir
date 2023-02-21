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
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import FlareOutlinedIcon from '@mui/icons-material/FlareOutlined';
import InvertColorsOutlinedIcon from '@mui/icons-material/InvertColorsOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import { alertaCreate, createRelatorios } from '../services/serviceApi';
//import { createRelatorios } from '../services/serviceApi';


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

const CardMonitored = ({ data, handleDelete, handleUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [airpure, setAirpure] = useState([]);
  const open = Boolean(anchorEl);


  const getToken = async () => {
    var response = await axios.post('https://backend-api-floats.vercel.app/api/login', { 'usr': 'inf', 'pass': '25d55ad283aa400af464c76d713c07ad' });
    const { session_token } = response.data;
    return session_token;
  }

  useEffect(() => {

    const getAmbientes = async () => {
      var sessionToken = await getToken();
      let response = await axios.get(`https://backend-api-floats.vercel.app/api/ultimoValor/${data.idAirPure}`, { headers: { sessionToken: sessionToken } });
      return setAirpure(...response.data);
    }

    getAmbientes();


  }, [data.idAirPure]);

  console.log(data);
  const gravarRelatorio = async (data, airpure) => {
    var response = await createRelatorios(
      data.nome,
      data.idLeito,
      data.idAirPure,
      airpure.temperatura,
      airpure.co2,
      airpure.tvoc,
      airpure.umidade,
      airpure.luminosidade,
      airpure.ruido
    );
    return response.data;
  }
  setTimeout(() => { gravarRelatorio(data, airpure); }, 10000)

  const gravarAlerta = async (data, airpure) => {
    var response = await alertaCreate(
      data.nome,
      data.idLeito,
      airpure.temperatura,
      airpure.co2,
      airpure.tvoc,
      airpure.umidade,
      airpure.luminosidade,
      airpure.ruido
    );
    return response.data;
  }

  if (!airpure.temperatura || airpure.temperatura > data.limitCOVT) {
    gravarAlerta(data, airpure);
  } else if (!airpure.co2 || airpure.co2 > data.limitCo2) {
    gravarAlerta(data, airpure);
  } else if (!airpure.tvoc || airpure.tvoc > data.limitUmidade) {
    gravarAlerta(data, airpure);
  } else if (!airpure.umidade || airpure.umidade > data.limitTemperatura) {
    gravarAlerta(data, airpure);
  } else if (!airpure.luminosidade || airpure.luminosidade > data.limitLuminosidade) {
    gravarAlerta(data, airpure);
  } else if (!airpure.ruido || airpure.ruido > data.limitRuidoSonoro) {
    gravarAlerta(data, airpure);
  }

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

      backgroundColor: '#C3DAFD',
      mt: 2,
      mb: 2,
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
        subheader={airpure.datamedicao}
      />
      <CardMedia

      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          <strong>AirPure:{data.idAirPure}</strong>
        </Typography>



        <List
          sx={{

            maxWidth: '100%',
            color: '#000'
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CloudOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="body1" >
                Co2:  <strong>{airpure.co2}</strong>ppm
              </Typography>
            </ListItemText>
          </ListItem>

          <Divider component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CoronavirusOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="body1" >
                COTV: <strong>{airpure.tvoc}</strong>ppb
              </Typography >
            </ListItemText>
          </ListItem>

          <Divider component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FlareOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="body1" >
                Luminosidade: <strong>{airpure.lux}</strong>lx
              </Typography>
            </ListItemText>
          </ListItem>

          <Divider component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CampaignOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="body1" >
                Ruido: <strong>{airpure.db}</strong>db
              </Typography>
            </ListItemText>
          </ListItem>


          <Divider component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ThermostatOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="body1" >
                Temperatura: <strong>{airpure.temperatura}</strong>°C
              </Typography>
            </ListItemText>
          </ListItem>


          <Divider component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                < InvertColorsOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="body1" >
                Umidade: <strong>{airpure.umidade}</strong>%
              </Typography>
            </ListItemText>
          </ListItem>
        </List>

      </CardContent>

      <Typography variant="body1" color="text.secondary">
        <strong>Parâmetros de alertas</strong>
      </Typography>
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
        <CardContent sx={{ textAlign: "justify" }}>


          <Typography paragraph>
            <strong>Co2: </strong> {data.limitCo2} ppm
          </Typography>

          <Typography paragraph>
            <strong>COTV: </strong>  {data.limitCOVT} ppb
          </Typography >

          <Typography paragraph>
            <strong>Luminosidade: </strong>  {data.limitLuminosidade} lx
          </Typography>

          <Typography paragraph>
            <strong>Ruido: </strong>{data.limitRuidoSonoro} db
          </Typography>

          <Typography paragraph>
            <strong>Temperatura: </strong>{data.limitTemperatura} °C
          </Typography>



          <Typography paragraph>
            <strong>Umidade: </strong> {data.limitUmidade} %
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default CardMonitored