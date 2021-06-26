import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GoogleLogin from "react-google-login";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        XMail
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AuthSignIn() {
  const classes = useStyles();

  const handleSuccessfulLogin = async googleData=> {
    const res = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData
      }),
      headers: {
        "Content-Type" : "application/json"
      }
    })

    const data = await res.json();

  }

  const handleErrorLogin = () => {
    alert("Please Be Serious!")
  }
  const url = "http://127.0.0.1:3000/users/login"
  const [email , setEmail] = useState("");
  const [password , setpassword] = useState("");
  const [all , setall] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    const new_entry = { email : email , password : password };
    console.log(new_entry);
    setall([...all , new_entry]);
    axios.post(url , new_entry ).then(res => {
      console.log(res);
    })
  } 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submitForm} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <GoogleLogin
          //Change here!!!
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleSuccessfulLogin}
            onFailure={handleErrorLogin}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
