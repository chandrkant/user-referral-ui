
import React,{useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../api/axios';
import AuthContext from "../context/AuthProvider";
const theme = createTheme();

export default function Home({Link}) {
  const { isLoggedin,setIsLoggedin } = useContext(AuthContext);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedin && <Button color="inherit" variant="" onClick={()=>axios.delete("/users/sign_out").then(()=> {localStorage.removeItem('token');setIsLoggedin(false)})}>login out</Button>}
          {!isLoggedin && <Link to="/login" style={{color: "#FFF",textDecoration: "none"}}><Button color="inherit" variant="">login</Button></Link>}
          {!isLoggedin && <Link to="/sign-up" style={{color: "#FFF",textDecoration: "none"}}><Button color="inherit" variant="">SignUp</Button></Link>}
          {isLoggedin && <Link to="/dashboard" style={{color: "#FFF",textDecoration: "none"}}><Button color="inherit" variant="">Dashboard</Button></Link>}
        </Toolbar>
      </AppBar>
    </Box>
    {isLoggedin && <Link to="/user-profile">User</Link>}
    </ThemeProvider>
  );
}