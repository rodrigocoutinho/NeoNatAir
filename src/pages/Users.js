import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Container from '@mui/material/Container';
import UsersList from '../components/UsersList';
import CreateUsers from '../components/CreateUsers';

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

const Users = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Container maxWidth="md">
            <Box sx={{ width: '100%' }}>
                <Box>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="Criar Usuários" {...a11yProps(0)} />
                        <Tab label="Usuários" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <Typography variant="body" component="div" sx={{ mb: 1 ,mt: 2, marginLeft: 3, fontSize: "1.25rem", }}>
                        Cadastrar Novo Usuário para EquipeTecnica
                    </Typography>
                    <CreateUsers />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Typography variant="body" component="div" sx={{ mt: 5, mb: 5 }}>
                        Lista dos Usuários cadastrados 
                    </Typography>
                    <UsersList />
                </TabPanel>
            </Box>
        </Container>
    );
}

export default Users;