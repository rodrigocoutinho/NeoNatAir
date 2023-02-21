import {React, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import EventExp from '../checkToken/EventExp'
import { Logout } from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import AuthserveceApi from '../services/authService';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  

const NavBar = () =>{
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(()=>{
        const user = AuthserveceApi.getCurrentUser();
        if(user){
            setCurrentUser(user);
        }
        EventExp.on("logout",()=>{
            Logout();
        });
        return ()=>{
            EventExp.remove("logout");
        };
    },[])

    const logOut = () => {
      AuthserveceApi.logout();
        setCurrentUser(undefined);
        navigate("/")
    };
    return(
        <Box sx={{ flexGrow: 1 }}>  
         <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                   <strong>{"NeoNatAir"}</strong> 
                </Typography>
               {currentUser ? (
                <Box sx={{ flexGrow: 0 ,me: 2 }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                    <Avatar/>
                  </StyledBadge>
                  <Button color="inherit" onClick={logOut} sx={{ ml: 2}}>logout</Button>
              </Box>
                ) : ( 
                  ""
                )}
            </Toolbar>
        </AppBar>
     </Box> 
    );
}
export default NavBar