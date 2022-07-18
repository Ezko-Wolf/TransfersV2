import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { ICreateUser } from "./interface/ICreateUser";
import { createUser as createUserApi } from "../../api/apiUser";
import { Link, useNavigate } from "react-router-dom";
import { URL_LOGO } from "../genericConstants";

const Register = () => {
  const [user, setUser] = useState<ICreateUser>({
    name: "",
    email: "",
    password: "",
  });
  const [haveError, setHaveError] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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

  const changeName = (e: any) => setUser({ ...user, name: e.target.value });
  const changeEmail = (e: any) => setUser({ ...user, email: e.target.value });
  const changePassword = (e: any) =>
    setUser({ ...user, password: e.target.value });

  const validUser = () => {
    const regex = /^([\w-]+(?:\.[\w-]+)*)@(?:[\w-]+).(\w[\w-]{1,2})$/i;
    const validEmail = regex.exec(user?.email);
    const result = validEmail && user?.name && user.password;
    if (!validEmail) setUser({ ...user, email: "" });
    if (!result) setHaveError(true);
    return result;
  };

  const createUser = async () => {
    handleToggleBackDrop(true);
    if (validUser()) {
      try {
        const resp = await createUserApi(user);
        const parsed = await resp.json();
        if (parsed.errors) {
          throw JSON.stringify(parsed.errors[0].split('"')[0]);
        }
        navigate("/");
      } catch (error: any) {
        handleToggleBackDrop(false);
        setErrorMessage(error.replace(/"/g, ""));
        setUser({ ...user, email: "" });
        setHaveError(true);
        setOpenSnackBar(true);
      }
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
            error={haveError && !user?.name}
            required
            fullWidth
            margin="normal"
            label="Name"
            value={user?.name}
            onChange={changeName}
          />
          <TextField
            error={haveError && !user?.email}
            required
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={user?.email}
            onChange={changeEmail}
          />
          <TextField
            error={haveError && !user?.password}
            required
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={user?.password}
            onChange={changePassword}
          />
          <Stack
            direction="row"
            justifyContent="space-around"
            marginTop={"8px"}
            spacing={2}
          >
            <Link to="/" style={{ textDecoration: "none", width: "100%" }}>
              <Button fullWidth variant="outlined">
                Cancel
              </Button>
            </Link>

            <Button fullWidth variant="contained" onClick={createUser}>
              Register
            </Button>
          </Stack>
        </Box>
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

export default Register;
