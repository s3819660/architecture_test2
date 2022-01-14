import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Menu,
  MenuItem,
  Link,
  Grid,
  Box,
  TextField,
  CssBaseline,
  Avatar,
  Button,
  Typography,
  Container,
  Select,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   name: data.get("name")
    // });

    var inputName = data.get("name");
    var inputPhone = data.get("phone");
    var inputAddress = data.get("address");

    if (role === "Employee") {
      var inputAge = data.get("age");
      var inputQualification = data.get("qualification");
      var inputExperience = data.get("experience");
      var inputCategory = data.get("category");
      if (
        !(
          inputName &&
          inputPhone &&
          inputAge &&
          inputAddress &&
          inputQualification &&
          inputExperience &&
          inputCategory !== "Choose a specialization"
        )
      )
        return;

      var employee = {
        fullName: String(inputName).trim(),
        phone: String(inputPhone).trim(),
        age: Number(inputAge),
        address: String(inputAddress).trim(),
        qualification: String(inputQualification).trim(),
        category: String(inputCategory).trim(),
        experience: Number(inputExperience),
      };

      // console.log("employee=", employee);
      axios
        .post(`http://localhost:8080/employee/signUp`, employee)
        .then((res) => {
          // console.log(res);
          console.log(res.data);
          if (window.confirm(`Your pin number is ${res.data.pin}. Please remember it to log in!`)) {
            navigate("../", { replace: true });
            return;
          }
        })
        .catch((error) => {
          // Error
          console.log(error.response);
        });
    }

    if (role === "Employer") {
      if (!(inputName && inputPhone && inputAddress)) return;

      var employer = {
        name: String(inputName).trim(),
        phone: String(inputPhone).trim(),
        address: String(inputAddress).trim(),
      };

      // console.log("employer=", employer);
      axios
        .post(`http://localhost:8080/employer/signUp`, employer)
        .then((res) => {
          // console.log(res);
          console.log(res.data);
          if (window.confirm(`Your pin number is ${res.data.pin}. Please remember it to log in!`)) {
            navigate("../", { replace: true });
            return;
          }
        })
        .catch((error) => {
          // Error
          console.log(error.response);
        });
    }
  };

  const [role, setRole] = useState<String>();
  // const [category, setCategory] = useState<String>("Choose a specialization");
  // const [name, setName] = useState<String>();
  // const [phone, setPhone] = useState<String>();
  // const [age, setAge] = useState<Number>();
  // const [address, setAddress] = useState<String>();
  // const [qualification, setQualification] = useState<String>();
  // const [experience, setExperience] = useState<Number>();

  // useEffect(() => {
  //   console.log("name=", name);
  //   console.log("phone=", phone);
  //   console.log("age=", age);
  //   console.log("address=", address);
  //   console.log("qualification=", qualification);
  //   console.log("experience=", experience);
  // }, [name, phone, age, address, qualification, experience]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {!role ? (
          // <Box
          //   sx={{
          //     marginTop: 8,
          //     display: "flex",
          //     flexDirection: "column",
          //     alignItems: "center"
          //   }}
          // >
          //   <Menu
          //     id="basic-menu"
          //     open={true}
          //     MenuListProps={{
          //       "aria-labelledby": "basic-button",
          //     }}
          //   >
          //     <MenuItem onClick={() => setRole("Employee")}>Employee</MenuItem>
          //     <MenuItem onClick={() => setRole("Employer")}>Employer</MenuItem>
          //   </Menu>
          // </Box>
          <div style={{
                marginTop: '200px'}}>
          Are you an
          <Button sx={{marginRight: '10px'}} onClick={() => setRole("Employee")}>Employee</Button>

          or

          <Button sx={{marginLeft: '10px'}} onClick={() => setRole("Employer")}>Employer</Button>
          </div>
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    autoFocus
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    type="tel"
                    // value={phone}
                    // onChange={(e) => {
                    //   e.preventDefault()
                    //   var input = e.target.value
                    //   // console.log("value=", input)
                    //   var lastChar = input?.charAt(input.length - 1)
                    //   if (!(lastChar && lastChar >= '0' && lastChar <= '9')) {
                    //     return
                    //   } else
                    //     setPhone(input)
                    // }}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid> */}
                {role === "Employee" ? (
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="age"
                      label="Age"
                      type="number"
                      id="age"
                      InputProps={{ inputProps: { min: "16", step: "1" } }}
                      autoComplete="age"
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    type="address"
                    id="address"
                    autoComplete="address"
                  />
                </Grid>

                {role === "Employee" ? (
                  <>
                    <Grid item xs={12}>
                      <InputLabel id="demo-simple-select-label">
                        Select a specialization:
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="category"
                        name="category"
                        // value={category}
                        label="Specialization"
                        // defaultValue={"Choose a specialization"}
                        // onChange={(e) => setCategory(e.target.value as string)}
                        sx={{ width: "100%" }}
                      >
                        <MenuItem value="Software/IT">Software/IT</MenuItem>
                        <MenuItem value="Electrical">Electrical</MenuItem>
                        {/* <MenuItem value='Electronics'>Electronics</MenuItem> */}
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Banking">Banking</MenuItem>
                        {/* <MenuItem value={20}>Textile and Garment</MenuItem>
                    <MenuItem value={20}>Aviation</MenuItem>
                    <MenuItem value={20}>Accounting</MenuItem>
                    <MenuItem value={20}>Logistics</MenuItem>
                    <MenuItem value={20}>Shipping</MenuItem> */}
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="qualification"
                        label="Qualification"
                        type="qualification"
                        id="qualification"
                        autoComplete="qualification"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="experience"
                        label="Experience"
                        type="experience"
                        id="experience"
                        autoComplete="experience"
                      />
                    </Grid>
                  </>
                ) : null}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
