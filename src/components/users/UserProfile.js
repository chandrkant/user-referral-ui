import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { RWebShare } from "react-web-share";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));
export default function UserProfile({NavLink}) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  const { isLoggedin } = useContext(AuthContext);
  // const classes = useStyles();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  useEffect(() => {
    getUser();
  }, []);
  const [open, setOpen] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setSubscribed(false);
    setEmail("")
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubscribe = () => {
    
    const payload = {
      email: email,
      link: `${window.location.origin}/sign-up`
    }
    axios.post('/api/v1/send_user_referral',payload).then((res)=>{
      setSubscribed(true);
      console.log(res);
    })
    console.log(email);
  };
  const getUser = () => {
    axios
      .get("/api/v1/user")
      .then(function (response) {
        if (response?.status === 200) {
          setUser(response?.data?.user);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // const token = localStorage.getItem('token')
  // if (token == null){
  //  return <NavLink to ="/login">Please Login</NavLink>
  // }
  return (
    <div>
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
            User Details
          </Typography>
          <NavLink to="/dashboard" style={{color: "#FFF",textDecoration: "none"}}><Button color="inherit" variant="">Dashboard</Button></NavLink>
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
    
      <RWebShare
        data={{
          text: "This is demo app",
          url: `${window.location.origin}/sign-up?referral_code=${user?.referral_code}`,
          title: "Flamingos",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button>Please share this app 🔗</Button>
      </RWebShare>
      {isLoggedin && <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Share on Email
      </Button>}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          {!subscribed && (
          <DialogContentText>
            To Share this website, please enter your email address here. We will send the referral.
          </DialogContentText>)}
          
          {!subscribed && (<TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />)}
          {subscribed &&(<Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>Referral link send!</strong>
          </Alert>)}
        </DialogContent>
        
        {!subscribed &&(<DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubscribe} color="primary">
            Subscribe
          </Button>
        </DialogActions>)}
        {subscribed &&(<DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>)}
      </Dialog>

    </div>
  );
}
