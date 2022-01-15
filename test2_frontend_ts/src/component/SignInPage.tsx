import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Link,
  Menu,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("Employee");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   phone: data.get('phone'),
    //   pin: data.get('pin'),
    // });

    var phone = data.get("phone");
    var pin = data.get("pin");

    if (phone && pin) {
      console.log(
        `http://localhost:8080/${role.toLowerCase()}/logIn/${phone}&${pin}`
      );
      axios
        .get(
          `http://localhost:8080/${role.toLowerCase()}/logIn/${phone}&${pin}`
        )
        .then((res) => {
          console.log(res.data);

          if (res.data) {
            window.sessionStorage.setItem("userId", res.data.id);
            // const userSession = window.sessionStorage.getItem("userId");

            if (role === "Employee") {
              navigate("../", { replace: true });
              return;
            }
            if (role === "Employer") {
              navigate("../employer", { replace: true });
              return
            }
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleToggleButtonChange = (e: any) => {
    setRole(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            ></Box>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <ToggleButtonGroup
                color="primary"
                value={role}
                exclusive
                onChange={(e) => handleToggleButtonChange(e)}
              >
                <ToggleButton value="Employee">Employee</ToggleButton>
                <ToggleButton value="Employer">Employer</ToggleButton>
                <ToggleButton value="Admin">Admin</ToggleButton>
              </ToggleButtonGroup>
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="pin"
                label="Pin Number"
                // type="password"
                id="pin"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
