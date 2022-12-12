import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const drawerWidth = 240;

const Layout = ()=> {
  const navigate = useNavigate();
  const id = uuidv4();
  const menuItem = [
    {
        text: 'Ambientes',
        icon: <MonitorHeartOutlinedIcon/>,
        path:  '/ambientes'
    },

    {
      text: 'Definir Parâmetros',
      icon: <DisplaySettingsOutlinedIcon/>,
      path:  "/parametros-form/"+id
    },

    {
        text: 'Relatório',
        icon:  <BarChartIcon />,
        path:  '/report'
    },
    
  ]
  const menuItemSub = [

    {
        text: 'Configurações',
        icon: <SettingsOutlinedIcon/>,
        path:  '/setting'
    },

    {
        text: 'Notificações',
        icon: <NotificationsNoneOutlinedIcon/>,
        path:  "/"
    },

    {
        text: 'Perfil',
        icon: <PermIdentityIcon/>,
        path:  '/profile'
    },
    
  ]


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
                {menuItem.map(item =>(    
                  <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
                  <ListItemIcon>
                   {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
          <Divider />
          <List>
                {menuItemSub.map(item =>(    
                  <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
                  <ListItemIcon>
                   {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3,}}>
        <Toolbar />
     
      </Box>
    </Box>
  );
}
export default Layout