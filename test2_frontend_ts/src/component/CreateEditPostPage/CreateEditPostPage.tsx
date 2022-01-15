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
import ApplicationsTable from "./ApplicationsTable";
import { Job } from "../JobList";

const theme = createTheme();

export type Employer = {
  id: number;
  name: string;
  phone: string;
  pin: string;
  address: string;
};

export type Employee = {
  id: SVGAnimatedNumber;
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

export default function SignUp() {
  const navigate = useNavigate();
  var params = useParams();
  var { userId } = params;
  var { postId } = params;
  const [jobId, setJobId] = useState<number>();
  const [employerId, setEmployerId] = useState<number>();
  const [employer, setEmployer] = useState<Employer>();

  const [pageSize, setPageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [careerLevel, setCareerLevel] = useState(0);
  const [salaryMin, setSalaryMin] = useState<number>(0);
  const [salaryMax, setSalaryMax] = useState<number>(0);
  const [role, setRole] = useState("");

  const [applications, setApplications] = useState<Application[]>();

  useEffect(() => {
    setEmployerId(Number(userId));
    setJobId(Number(postId));

    axios
      .get(`http://localhost:8080/employer/${userId}`)
      .then((res) => {
        setEmployer({
          id: res.data.id,
          name: res.data.name,
          phone: res.data.phone,
          pin: res.data.pin,
          address: res.data.address,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log("jobId=", jobId);

    if (!jobId || jobId === 0) return;

    // get job info
    axios
      .get(`http://localhost:8080/job/${jobId}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setLocation(res.data.location);
        setCategory(res.data.category);
        setDate(res.data.date)
        setDescription(res.data.description);
        setCareerLevel(Number(res.data.careerLevel));
        setSalaryMin(Number(res.data.salaryMin));
        setSalaryMax(Number(res.data.salaryMax));
        setRole(res.data.role);
      })
      .catch((error) => console.log(error));

    // get application of this job
    axios
      .get(
        `http://localhost:8080/applications/job=${jobId}/des/${page}/${pageSize}`
      )
      .then((res) => {
        const val = res.data;
        setApplications(val.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => console.log(error));
  }, [jobId, page, pageSize]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log("employer=", employer)

    if (employer) {
      if (jobId === 0) {
        const job = {
          title: String(data.get("title")).trim(),
          location: String(data.get("location")).trim(),
          category: String(data.get("category")).trim(),
          description: String(data.get("description")).trim(),
          careerLevel: Number(data.get("careerLevel")),
          salaryMin: Number(data.get("minSalary")),
          salaryMax: Number(data.get("maxSalary")),
          role: String(data.get("role")).trim(),
          employer: {
            id: employer.id,
            name: employer.name,
            phone: employer.phone,
            pin: employer.pin,
            address: employer.address,
          },
        };

        console.log(job);
        axios
          .post(`http://localhost:8080/job`, job)
          .then((res) => {
            // console.log(res);
            console.log(res.data);
            navigate("../employer", { replace: true });
            return;
          })
          .catch((error) => {
            // Error
            console.log(error.response);
          });
      } else {
        const job = {
          id: jobId,
          title: String(data.get("title")).trim(),
          location: String(data.get("location")).trim(),
          date: date,
          category: category,
          description: String(data.get("description")).trim(),
          careerLevel: Number(data.get("careerLevel")),
          salaryMin: Number(data.get("minSalary")),
          salaryMax: Number(data.get("maxSalary")),
          role: String(data.get("role")).trim(),
          employer: {
            id: employer.id,
            name: employer.name,
            phone: employer.phone,
            pin: employer.pin,
            address: employer.address,
          },
        };

        console.log(job);
        axios
          .put(`http://localhost:8080/job`, job)
          .then((res) => {
            // console.log(res);
            console.log(res.data);
            navigate("../employer", { replace: true });
            return;
          })
          .catch((error) => {
            // Error
            console.log(error.response);
          });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
                <React.Fragment>
      {/* <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Link to={`/employer`}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            Employer
          </Typography>
        </Link>
      </Toolbar> */}
    </React.Fragment>
      {employerId ? (
        <Container component="main" maxWidth="lg">
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  {jobId === 0 ? (
                    <>
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
                    </>
                  ) : (
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="category"
                        label="Category"
                        id="category"
                        value={category}
                        disabled
                      />
                    </Grid>
                  )}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    value={careerLevel}
                    onChange={(e) => setCareerLevel(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="demo-simple-select-label">Role:</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="role"
                    name="role"
                    label="Role"
                    // defaultValue={"Choose a specialization"}
                    value={role}
                    onChange={(e) => setRole(e.target.value as string)}
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
                    value={String(salaryMin)}
                    onChange={(e) => setSalaryMin(Number(e.target.value))}
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
                    value={String(salaryMax)}
                    onChange={(e) => setSalaryMax(Number(e.target.value))}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {jobId === 0 ? "Create" : "Edit"} Ad
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
