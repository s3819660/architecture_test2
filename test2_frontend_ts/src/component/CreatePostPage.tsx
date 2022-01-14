import * as React from "react";
import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@mui/material";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const theme = createTheme();

export type Employer = {
  id: number,
  name: string,
  phone: string,
  pin: string,
  address: string
}

export default function SignUp() {
  const navigate = useNavigate();
  var params = useParams();
  var { id } = params;
  const [employerId, setEmployerId] = useState<number>();
  const [employer, setEmployer] = useState<Employer>();

  useEffect(() => {
    setEmployerId(Number(id));

    axios.get(`http://localhost:8080/employer/${id}`)
    .then(res => {
      setEmployer({
        id: res.data.id,
        name: res.data.name,
        phone: res.data.phone,
        pin: res.data.pin,
        address: res.data.address
      })
    })
    .catch(error => console.log(error));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log("employer=", employer)
    
    if (employer) {
      const job = {
        title: String(data.get("title")).trim(),
        location: String(data.get("location")).trim(),
        category: String(data.get("category")).trim(),
        description: String(data.get("description")).trim(),
        careerLevel: Number(data.get("careerLevel")),
        minSalary: Number(data.get("minSalary")),
        maxSalary: Number(data.get("maxSalary")),
        role: String(data.get("role")).trim(),
        employer: {
          id: employer.id,
          name: employer.name,
          phone: employer.phone,
          pin: employer.pin,
          address: employer.address
        }
      }

      console.log(job);
      axios
      .post(`http://localhost:8080/job`, job)
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        navigate("../", { replace: true });
      })
      .catch((error) => {
        // Error
        console.log(error.response);
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {employerId ? (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AssignmentIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Post Job Ad
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
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="location"
                    label="Location"
                    id="location"
                    autoComplete="location"
                  />
                </Grid>
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
                    fullWidth
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
                    name="description"
                    label="Description"
                    id="description"
                    multiline
                    rows={10}
                    // value={value}
                    // onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="careerLevel"
                    required
                    fullWidth
                    type="number"
                    id="careerLevel"
                    InputProps={{ inputProps: { min: "0", step: "1" } }}
                    label="Year Of Experience"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="demo-simple-select-label">Role:</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="role"
                    name="role"
                    // value={category}
                    label="Role"
                    // defaultValue={"Choose a specialization"}
                    // onChange={(e) => setCategory(e.target.value as string)}
                    fullWidth
                  >
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Full-time">Full-time</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="price"
                    name="minSalary"
                    required
                    fullWidth
                    id="minSalary"
                    label="Min Salary"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="maxSalary"
                    label="Max Salary"
                    name="maxSalary"
                    autoComplete="price"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Ad
              </Button>
            </Box>
          </Box>
        </Container>
      ) : null}
    </ThemeProvider>
  );
}
