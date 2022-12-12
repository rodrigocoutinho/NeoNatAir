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
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

const CardMonitored = ({data,handleDelete})=>{
    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

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
        <Card sx={{ maxWidth: 345,
            backgroundColor: '#C3DAFD',
            mt: 2, 
            textAlign:'center',
            
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
                  
                  <MenuItem  onClick={handleClose} >
                      <VisibilityOutlinedIcon sx={{mr:1}}/>
                        Parâmetros
                  </MenuItem>
                    <MenuItem  onClick={handleClose} >
                      <EditOutlinedIcon sx={{mr:1}}/>
                        Editar
                    </MenuItem>
                    <MenuItem  onClick={()=>{handleDelete(data.id)}} >
                      <DeleteOutlineOutlinedIcon sx={{mr:1}}/>
                        Excluir
                    </MenuItem>
                  
                </Menu>
              </>
                }
                title={data.sala}
                subheader={data.dtformatada}
            />
            <CardMedia
                
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {data.status}
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
                    COTV : {data.tvoc} PPB
                  </Typography>
                  <Typography paragraph>
                      Co2 : {data.co2} PPM
                  </Typography>
                  <Typography paragraph>
                      Umidade: {data.umidade} %
                  </Typography>
                  <Typography>
                    Temperatura: {data.temperatura}°C
                  </Typography>
                </CardContent>
            </Collapse>
          </Card>
    );
}
export default CardMonitored