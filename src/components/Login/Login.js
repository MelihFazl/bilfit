import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Login.css";
import { useParams, withRouter, useHistory } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from "react";

function Copyright(props) {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Bilfit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      
    </Typography>
  );
}


const theme = createTheme();

export default function SignIn() {

  const [myToken, setMyToken] = useState();
  const [userType, setUserType] = useState("member");
  const handleSubmit = (event) => {
   
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /*console.log({
      email: data.get('email'),
      password: data.get('password'),
    })*/
    let adminLogin = (userType === "admin") ? true : false
    let staffLogin = (userType === "staff") ? true : false

    if(staffLogin)
    {
      console.log("http://localhost:8080/user/gymStaff/login/" + data.get("email") + "?password=" + data.get("password") )
    fetch("http://localhost:8080/user/gymStaff/login/" + data.get("email") + "?password=" + data.get("password")  , {
      method:"POST",
      Accept:"*/*",
      "Accept-Encoding":"gzip, deflate, br",
      Connection:"keep-alive"
  }).then((result)=>{   
          result.text().then((resultStr) => {
          let signal = true;  
          if(resultStr.substring(0, 2) === "GS")
          {
            localStorage.setItem("usertype", "staff")
          }
          else if(resultStr.length < 400)
          {
            alert(resultStr)
            signal = false;
          }
          if(signal)
          {
            localStorage.setItem("usertoken", resultStr)
            localStorage.setItem("userid", data.get("email"))
            setMyToken(resultStr);
            if(myToken !== "")
            history.push("/home");
          }
      })
  })
    }
    else if(adminLogin)
    {
      fetch("http://localhost:8080/admin/login/" + data.get("email") + "?password=" + data.get("password")  , {
        method:"POST",
        Accept:"*/*",
        "Accept-Encoding":"gzip, deflate, br",
        Connection:"keep-alive"
    }).then((result)=>{   
            result.text().then((resultStr) => {
            let signal = true; 
            if(resultStr.length < 400)
              signal = false;
            if(signal)
            {
              localStorage.setItem("usertoken", resultStr)
              localStorage.setItem("userid", data.get("email"))
              setMyToken(resultStr);
              localStorage.setItem("usertype", "admin")
              history.push("/admin-panel");
            }
            else
            {
              alert(resultStr)
            }
        })
    })
    }
    else
    {
      fetch("http://localhost:8080/user/gymMember/login/" + data.get("email") + "?password=" + data.get("password")  , {
      method:"POST",
      Accept:"*/*",
      "Accept-Encoding":"gzip, deflate, br",
      Connection:"keep-alive"
  }).then((result)=>{   
          result.text().then((resultStr) => {
          let signal = true;  
          if(resultStr.substring(0, 2) === "GM")
          {
            localStorage.setItem("usertype", "member")
          }
          else if(resultStr.length < 400)
          {
            alert(resultStr)
            signal = false;
          }
          if(signal)
          {
            localStorage.setItem("usertoken", resultStr)
            localStorage.setItem("userid", data.get("email"))
            setMyToken(resultStr);
            if(myToken !== "")
            history.push("/home");
          }
      })
  })
    }

  

    
  };
  const history =  useHistory();
  const handleUserType = (event) => 
  {
    setUserType(event.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar src="./images/bilfit_logo.png" className = "bilfitLogin" sx={{ height: "15rem", width: "auto" }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to Bilfit
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="ID"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              //href = "/home"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "#30475E"}}
            >
                    Log In
            </Button>
            <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Login Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleUserType}
        defaultValue= "member"
      >
        <FormControlLabel value="member" control={<Radio />} label="Gym Member" />
        <FormControlLabel value="staff" control={<Radio />} label="Gym Staff" />
        <FormControlLabel value="admin" control={<Radio />}  label="Admin" />
      </RadioGroup>
    </FormControl>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}