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
  Toolbar,
} from "@mui/material";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import ApplicationsTable from "./ApplicationsTable";
import { Job } from "../JobList";
import Header from "../HomePage/Header";
import ApplicationsTable from "../CreateEditPostPage/ApplicationsTable";

const theme = createTheme();

const sections = [
  { title: "Software/IT", url: "#" },
  { title: "Electrical", url: "#" },
  // { title: 'Electronics', url: '#' },
  { title: "Education", url: "#" },
  { title: "Banking", url: "#" },
  // { title: 'Textile and Garment', url: '#' },
  // { title: 'Aviation', url: '#' },
  // { title: 'Accounting', url: '#' },
  // { title: 'Logistics', url: '#' },
  // { title: 'Travel', url: '#' },
];

export type Employer = {
  id: number;
  name: string;
  phone: string;
  pin: string;
  address: string;
};

export type Employee = {
  id: number;
  address: string;
  age: number;
  category: string;
  experience: number;
  fullName: string;
  phone: string;
  pin: string;
  qualification: string;
};

export type Application = {
  id: number;
  date: Date;
  job: Job;
  employee: Employee;
};

export default function EmployeePage() {
  const navigate = useNavigate();
  // var params = useParams();
  // var { userId } = params;
  // var { postId } = params;

  const [userId, setUserId] = useState<string | null>(null);
  const [employee, setEmployee] = useState<Employee>();
  const [address, setAddress] = useState<string>("");
  const [age, setAge] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [experience, setExperience] = useState(0);
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [qualification, setQualification] = useState<string>("");

  const [pageSize, setPageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  const [role, setRole] = useState("");

  const [applications, setApplications] = useState<Application[]>();

  
  const [searchKeyword, setSearchKeyword] = useState('')
  useEffect(() => {
    setUserId(window.sessionStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    if (!userId) return;

    if (!employee) {
      axios
        .get(`http://localhost:8080/employee/${userId}`)
        .then((res) => {
          setEmployee({
            id: res.data.id,
            address: res.data.address,
            age: res.data.age,
            category: res.data.category,
            experience: res.data.experience,
            fullName: res.data.fullName,
            phone: res.data.phone,
            pin: res.data.pin,
            qualification: res.data.qualification,
          });

          setFullName(res.data.fullName);
          setAddress(res.data.address);
          setAge(res.data.age);
          setExperience(res.data.experience);
          setPhone(res.data.phone);
          setQualification(res.data.qualification);
          setCategory(res.data.category);
        })
        .catch((error) => console.log(error));

        // Get Applications
        axios
        .get(
          `http://localhost:8080/applications/employee=${userId}/des/${page}/${pageSize}`
        )
        .then((res) => {
          const val = res.data;
          setApplications(val.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((error) => console.log(error));
    }

    console.log("employee=", employee);

    // get job info
    // axios
    //   .get(`http://localhost:8080/job/${jobId}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setTitle(res.data.title);
    //     setLocation(res.data.location);
    //     setCategory(res.data.category);
    //     setDescription(res.data.description);
    //     setCareerLevel(Number(res.data.careerLevel));
    //     setSalaryMin(Number(res.data.salaryMin));
    //     setSalaryMax(Number(res.data.salaryMax));
    //     setRole(res.data.role);
    //   })
    //   .catch((error) => console.log(error));

    // get application of this job
    // axios
    //   .get(
    //     `http://localhost:8080/applications/job=${jobId}/des/${page}/${pageSize}`
    //   )
    //   .then((res) => {
    //     const val = res.data;
    //     setApplications(val.content);
    //     setTotalPages(res.data.totalPages);
    //   })
    //   .catch((error) => console.log(error));
  }, [employee, page, pageSize, userId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log("employer=", employer)

    if (!employee) return

    const updateEmployee = {
      id: Number(userId),
      address: data.get("address")?.toString().trim(),
      age: Number(data.get("age")),
      category: String(data.get("category"))?.toString().trim(),
      experience: Number(data.get("experience")),
      fullName: String(data.get("fullName"))?.toString().trim(),
      phone: String(data.get("phone"))?.toString().trim(),
      pin: employee?.pin,
      qualification: String(data.get("qualification"))?.toString().trim()
    };

    console.log('updateEmployee=', updateEmployee);
    axios
      .put(`http://localhost:8080/employee`, updateEmployee)
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        navigate("../", { replace: true });
        return;
      })
      .catch((error) => {
        // Error
        console.log(error.response);
      });
  };

  const handleSignOut = () => {
    sessionStorage.clear();
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment></React.Fragment>
      {userId ? (
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Header
            title="Employee"
            sections={sections}
            userId={userId}
            handleSignOut={handleSignOut}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
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
              Edit Profile
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
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    autoComplete="given-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    id="address"
                    autoComplete="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="demo-simple-select-label">
                    Update specialization:
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="category"
                    name="category"
                    value={category}
                    label="Specialization"
                    // defaultValue={"Choose a specialization"}
                    onChange={(e) => setCategory(e.target.value as string)}
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
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="age"
                    label="Age"
                    type="number"
                    InputProps={{ inputProps: { min: "16", step: "1" } }}
                    id="age"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    type="phone"
                    InputProps={{ inputProps: { min: "16", step: "1" } }}
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    name="experience"
                    required
                    fullWidth
                    type="number"
                    id="experience"
                    InputProps={{ inputProps: { min: "0", step: "1" } }}
                    label="Years Of Experience"
                    autoFocus
                    value={experience}
                    onChange={(e) => setExperience(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="demo-simple-select-label">
                    Update qualification:
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="qualification"
                    name="qualification"
                    value={qualification}
                    label="Qualification"
                    // defaultValue={"Choose a specialization"}
                    onChange={(e) => setQualification(e.target.value as string)}
                  >
                    <MenuItem value="Middle school">Middle school</MenuItem>
                    <MenuItem value="High school diploma">
                      High school diploma
                    </MenuItem>
                    <MenuItem value="Bachelor's Degree">
                      Bachelor's Degree
                    </MenuItem>
                    <MenuItem value="Master's Degree">Master's Degree</MenuItem>
                    <MenuItem value="Doctorate">Doctorate</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Profile
              </Button>
            </Box>
          </Box>
          {applications ? (
            <ApplicationsTable
              applications={applications}
              setPage={setPage}
              page={page}
              totalPages={totalPages}
              setPageSize={setPageSize}
            />
          ) : null}
        </Container>
      ) : null}
    </ThemeProvider>
  );
}
