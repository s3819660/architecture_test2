import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import JobList from "../JobList";
import {Job} from  "../JobList";

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

const mainFeaturedPost = {
  title: "",
  description: "",
  image: "https://source.unsplash.com/random",
  imageText: "",
  // linkText: 'Continue reading…',
};

const theme = createTheme();

export default function Blog() {
  const [jobs, setJobs] = useState<Job[]>();
  const PAGE_SIZE = 1;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [userId, setUserId] =  useState<string | null>('0');

  useEffect(() => {
    setUserId(window.sessionStorage.getItem("userId"));
    console.log("userId=", userId)
  }, [])

  useEffect(() => {
    axios
    .get(`http://localhost:8080/jobs/employer=${userId}/des/${page - 1}/${PAGE_SIZE}`)
    .then((res) => {
      // console.log("res.data=", res.data)
      setJobs(res.data.content);
      setTotalPages(res.data.totalPages);
      // console.log("page=", page, "totalPages=", totalPages)
    })
    .catch((error) => console.log(error));
  }, [page, userId, totalPages]);

  return (
    <ThemeProvider theme={theme}>
          <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
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
        <Link to={`/createpost/${userId}/0`}>
          <Button variant="contained" size="small">
            Post Job
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="outlined" size="small">
            Sign out
          </Button>
        </Link>
      </Toolbar>
      {/* <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar> */}
    </React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
      {(!userId || userId === '0') ? "Loading....." :
        <main>
          <JobList jobList={jobs} employerId={Number(userId)} />
          <Pagination
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0px auto 20px auto",
            }}
            count={totalPages}
            page={page}
            showFirstButton
            showLastButton
            onChange={(e: any, value: number) => setPage(value)}
          />
        </main> 
        }
      </Container>
    </ThemeProvider>
  );
}
