import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGrid } from '@mui/x-data-grid';
import AuthserviceApi from '../services/authService';
import { Box } from '@mui/system';

const ITEM_HEIGHT = 40;

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const getUsers = async () => {
        let response = await AuthserviceApi.getAllUsers();
        return setUsers(response.data);
    }

    useEffect(() => {
        getUsers();
    }, [])

    console.log(users)
    const rows = users.map((row) => ({
        id: row.id,
        name: row.name,
        cpf: row.cpf,
        email: row.email,
        roles: row.roles.name,
        createdAt: row.createdAt


    }));


    const columns = [
        { field: 'id', headerName: 'IdUsuário', width: 150 },
        { field: 'name', headerName: 'Nome', width: 150 },
        { field: 'cpf', headerName: 'cpf', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'roles', headerName: 'Roles', width: 150 },
        { field: 'createdAt', headerName: 'Data de criação', width: 150 },

        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClickMenu}
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


                            <MenuItem >
                                <EditOutlinedIcon sx={{ mr: 1 }} />
                                Editar
                            </MenuItem>
                            <MenuItem  >
                                <DeleteOutlineOutlinedIcon sx={{ mr: 1 }} />
                                Excluir
                            </MenuItem>

                        </Menu>
                    </>
                );
            },
        },
    ];




    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} disableColumnMenu />
        </Box>
    );
}
export default UsersList;