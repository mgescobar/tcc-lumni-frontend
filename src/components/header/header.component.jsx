import * as React from "react";
import { useState, useEffect, useContext } from "react";    
/* Material UI */
import makeStyles from "@mui/styles/makeStyles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import api from "../../services/api";

import mascote from "./mascote.png";

const useStyles = makeStyles((theme) => ({
    forgotPasswordButton: {
        display: "grid",
        border: "0px solid black",
        margin: "0px auto",
        marginBottom: 5,
        cursor: "pointer",
        width: "65%",
        textDecoration: "none !important",
    },
    button: {
        fontFamily: "Poppins, sans-serif",
        textTransform: "none",
        padding: "12px",
        marginBottom: 20,
    },
    showPassword: {
        height: 56,
        marginTop: "0px",
        border: "1px solid #bdbdbd",
        borderLeft: "none",
    },
    menuList: {
        display: "flex",
        padding: "20px 10px",
    },
    letterMenu: {
        fontSize: "24px",
        fontWeight: 600,
        padding: "20px 10px",
        color: "#fafafa",
        textDecoration: "none",
        fontFamily: "Roboto",
    },
    letterMenu1: {
        fontSize: "16px",
        fontWeight: "bold",
        padding: "10px",
        color: "#01263f",
        textDecoration: "none",
        fontFamily: "Roboto",
    },
}));

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const classes = useStyles();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { logout } = useContext(AuthContext);
    const [playerData, setPlayerData] = useState({});
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        async function data () {        
            const id = JSON.parse(localStorage.getItem("user")).id;  
            const player = await api.get(`/findUser/${id}`);
            setPlayerData(player.data);
            setLoaded(true);
        }
        data()
    }, []);

    return (
        <AppBar position="static" sx={{ background: "#01263f" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters style={{ height: "80px" }}>
                    {loaded && (
                        <>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/dashboard"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                Lumni
                            </Typography>

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "flex", md: "none" },
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <NavLink
                                                className={classes.letterMenu1}
                                                to="/Dashboard"
                                            >
                                                <ListItemButton>
                                                    Dashboard
                                                </ListItemButton>
                                            </NavLink>
                                            {playerData && playerData.user?.type !== 3 ?
                                                <NavLink
                                                    className={classes.letterMenu1}
                                                    to="/Questions"
                                                >
                                                    <ListItemButton>
                                                        Perguntas
                                                    </ListItemButton>
                                                </NavLink>
                                            : null}
                                            <NavLink
                                                className={classes.letterMenu1}
                                                to="/Filter"
                                            >
                                                <ListItemButton>Quiz</ListItemButton>
                                            </NavLink>
                                            <NavLink
                                                className={classes.letterMenu1}
                                                to="/Highscore"
                                            >
                                                <ListItemButton>Placar</ListItemButton>
                                            </NavLink>
                                            <NavLink
                                                className={classes.letterMenu1}
                                                onClick={() => logout()}
                                            >
                                                <ListItemButton>Sair da plataforma</ListItemButton>
                                            </NavLink>
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>

                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                    mr: 2,
                                    display: { xs: "flex", md: "none" },
                                    flexGrow: 1,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                Lumni
                            </Typography>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                <List className={classes.menuList}>
                                    <NavLink
                                        className={classes.letterMenu}
                                        to="/Dashboard"
                                    >
                                        <ListItemButton>Dashboard</ListItemButton>
                                    </NavLink>
                                    {playerData && playerData.user?.type !== 3 ? (
                                        <NavLink
                                        className={classes.letterMenu}
                                        to="/Questions"
                                    >
                                        <ListItemButton>Perguntas</ListItemButton>
                                    </NavLink>
                                    ) : null }
                                    {/* <NavLink className={classes.letterMenu} to="/Quiz">
                                        <ListItemButton>Quiz</ListItemButton>
                                    </NavLink> */}
                                    <NavLink
                                        className={classes.letterMenu}
                                        to="/Filter"
                                    >
                                        <ListItemButton>Quiz</ListItemButton>
                                    </NavLink>
                                    
                                    <NavLink
                                        className={classes.letterMenu}
                                        to="/Highscore"
                                    >
                                        <ListItemButton>Placar</ListItemButton>
                                    </NavLink>
                                </List>
                            </Box>
                            
                            {playerData && playerData.user?.type === 1 ? (
                                    <h3>Admnistrador: {playerData.user?.name}</h3>
                                    ) : playerData && playerData.user?.type === 2 ? (
                                    <h3>Professor: {playerData.user?.name}</h3>
                                    ) : playerData && playerData.user?.type === 3 ? (
                                    <h3>Aluno: {playerData.user?.name}</h3>
                                    ) : null 
                            }

                            <Box sx={{ flexGrow: 0, marginLeft: '20px' }}>
                                <Tooltip title="Abrir configurações">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <img
                                            src={mascote}
                                            style={{ width: "80px", height: "80px" }}
                                            alt="Icone Perfil"
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{
                                        display: { xs: "none", md: "flex" },
                                        fontWeight: 700,
                                        justifyContent: "center",
                                        color: "#01263f",
                                        textDecoration: "none",
                                    }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <button 
                                        style={{
                                            border: 'none', 
                                            backgroundColor: 'transparent',
                                            padding: '10px 10px',
                                            color: '#01263f',
                                            cursor: 'pointer',
                                            fontWeight: 700
                                        }} 
                                        onClick={() => logout()}
                                    >
                                        Sair da plataforma
                                    </button>
                                </Menu>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
