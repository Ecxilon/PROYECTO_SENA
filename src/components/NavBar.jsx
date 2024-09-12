import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Smart Locker
                </Typography>
                <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button color="inherit" onClick={() => navigate('/administradores')}>Administradores</Button>
                <Button color="inherit" onClick={() => navigate('/tipo_paquetes')}>Tipos de Paquete</Button>
                <Button color="inherit" onClick={() => navigate('/residentes')}>Residentes</Button>
                <Button color="inherit" onClick={() => navigate('/propietarios')}>Propietarios</Button>
<<<<<<< HEAD
                <Button color="inherit" onClick={() => navigate('/paquetes')}>Paquete</Button>
=======
>>>>>>> a952c2ad246fb99825bd2d77a80aaa6b4b42a105
                <Button color="inherit" onClick={handleLogout}>Salir</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
