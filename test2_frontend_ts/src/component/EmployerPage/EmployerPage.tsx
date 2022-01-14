import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import MainFeaturedPost from "./MainFeaturedPost";
// import FeaturedPost from "./FeaturedPost";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import JobList from "../JobList";

export type Job = {
  id: number;
  title: string;
  location: string;
  salaryRange: string;
  salaryMin: number;
  salaryMax: number;
  category: string;
  description: string;
  careerLevel: number;
  role: string;
  date: Date;
  employer: {
    id: number;
    name: string;
    phone: string;
    pin: string;
    address: string;
  };
  application: any;
};

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

  useEffect(() => {
    axios
    .get(`http://localhost:8080/jobs/education/des/${page - 1}/${PAGE_SIZE}`)
    .then((res) => {
      setJobs(res.data.content);
      setTotalPages(res.data.totalPages);
      // console.log("page=", page, "jobs=", jobs)
    })
    .catch((error) => console.log(error));
  }, [page]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          {/* <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {jobs?.map((post) => (
              <FeaturedPost
                // post={post}
                key={post.title}
                image="https://source.unsplash.com/random"
                imageLabel="Image Text"
                job={post}
              />
            ))}
          </Grid> */}
          <JobList jobList={jobs} />
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
      </Container>
    </ThemeProvider>
  );
}
