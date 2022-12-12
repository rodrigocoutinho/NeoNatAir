import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
 
 
import {useNavigate} from "react-router-dom";

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
  

const Navbar = () =>{
   
    const navigate = useNavigate();
    return(
      <>
        <Box sx={{ flexGrow: 1 }}>  
         <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                   <strong>{"NeoNatAir"}</strong> 
                </Typography>
               {0 ? (
                <Box sx={{ flexGrow: 0 ,me: 2 }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                    <Avatar/>
                  </StyledBadge>
                  <Button color="inherit"  sx={{ ml: 2}}>logout</Button>
              </Box>
                ) : ( 
              <Box sx={{ flexGrow: 0 }}>
                 <Button color="inherit" onClick={()=>{navigate("/")}}>Sign In</Button>
                 <Button color="inherit" onClick={()=>{navigate("/signup")}}>Sign Up</Button>
                </Box>
                )}
            </Toolbar>
        </AppBar>
     </Box> 
     </>
    );
}
export default Navbar