import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImgSignin from '../assets/signinImg.png';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import SignUpSideForm from '../components/SignUpSideForm';
import SignInSideForm from '../components/SignInSideForm';


const theme = createTheme();


// Tabs 
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}




const LoginOrRegister = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid item xs={12} sm={8} md={6} >
                    <Box
                        sx={{
                            mt: 15,
                            textAlign: 'center',
                            marginRight: 10,
                            marginLeft: 10,
                            color: '#143053'
                        }}
                    >
                        <Typography variant="h3" component="div">
                            Sistema NeoNatAir
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ textAlign: 'justify' }}>
                            Monitoramento dos  ambiente de Unidade de Terapia Intensiva Neonatal,
                            a IoT pode ser utilizada para monitorar esses ambientes em seus diversos aspectos,
                            como concentração de dióxido de carbono, temperatura, umidade, compostos orgânicos voláteis, nível de ruídos e
                            intensidade da luminosidade.

                        </Typography>
                        <Box>
                            <img src={ImgSignin} alt="" />
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            mt: 15,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                                <Tab label="Login" {...a11yProps(0)} />
                                <Tab label="SignUp" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <SignInSideForm />
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <SignUpSideForm/>
                        </TabPanel>

                    </Box>
                </Grid>

            </Grid>
        </ThemeProvider>
    );
}
export default LoginOrRegister