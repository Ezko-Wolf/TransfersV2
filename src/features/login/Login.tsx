import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { login } from "../../api/apiUser";
import { ILoginUser } from "./interface/ILoginUser";
import { URL_LOGO } from "../genericConstants";

const Login = () => {
  const [credentials, setCredentials] = useState<ILoginUser>({
    email: "",
    password: "",
  });
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeEmail = (e: any) =>
    setCredentials({ ...credentials, email: e.target.value });
  const changePassword = (e: any) =>
    setCredentials({ ...credentials, password: e.target.value });

  const handleToggleBackDrop = (state: boolean) => {
    setOpenBackDrop(state);
  };

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const validCredentials = () => credentials.email && credentials.password;

  const handleLogin = async () => {
    handleToggleBackDrop(true);
    if (validCredentials()) {
      try {
        const resp = await login(credentials);
        const parsed = await resp.json();
        if (parsed.errors) {
          throw JSON.stringify(parsed.errors[0].split('"')[0]);
        }
        const dataToSave = {
          name: parsed.data.name,
          email: parsed.data.email,
          token: parsed.data.token,
          tokenExpiration: parsed.data.tokenExpiration,
        };
        sessionStorage.setItem("user", JSON.stringify(dataToSave));
      } catch (error: any) {
        handleToggleBackDrop(false);
        setOpenSnackBar(true);
        setErrorMessage("Wrong credentials");
      }
    } else {
      handleToggleBackDrop(false);
      setOpenSnackBar(true);
      setErrorMessage("Please complete all fields");
    }
    handleToggleBackDrop(false);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Grid item xs={10} md={8} lg={6}>
        <figure
          style={{
            width: "200px",
            margin: 0,
            marginBottom: "10px",
            paddingLeft: "16px",
            marginTop: "-65px",
          }}
        >
          <img src={URL_LOGO} alt="logo" />
        </figure>
        <Box
          sx={{
            border: "0.5px solid white",
            borderRadius: "10px",
            padding: "16px",
            background: "white",
            boxShadow: "10px 10px 15px -1px rgb(0 0 0 / 60%)",
          }}
        >
          <TextField
            required
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={credentials?.email}
            onChange={changeEmail}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={credentials?.password}
            onChange={changePassword}
          />
          <Stack
            direction="row"
            justifyContent="space-around"
            marginTop={"8px"}
          >
            <Button fullWidth variant="contained" onClick={handleLogin}>
              Log in
            </Button>
          </Stack>
        </Box>
        <Typography variant="caption" color="darkslategrey">
          <p style={{ textAlign: "center" }}>
            Not registered?{" "}
            <Link href="/register" underline="hover" color="lightgray">
              Create an account
            </Link>
          </p>
        </Typography>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackDrop}
        >
          <CircularProgress color="info" />
        </Backdrop>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default Login;
