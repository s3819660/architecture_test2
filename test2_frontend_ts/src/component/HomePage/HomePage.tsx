import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import JobList from "../JobList";
import { Job } from "../JobList";

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

// const featuredPosts = [
//   {
//     title: 'Featured post',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageLabel: 'Image Text',
//     salaryMin: 10,
//     salaryMax: 20
//   },
//   {
//     title: 'Post title',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageLabel: 'Image Text',
//     salaryMin: 10,
//     salaryMax: 20
//   },
// ];

const theme = createTheme();

export default function Blog() {
  const [jobs, setJobs] = useState<Job[]>();
  const PAGE_SIZE = 1;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("Education");
  const [userId, setUserId] = useState<string | null>('');

  useEffect(() => {
    setUserId(window.sessionStorage.getItem('userId'));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/jobs/category=${category}/des/${
          page - 1
        }/${PAGE_SIZE}`
      )
      .then((res) => {
        setJobs(res.data.content);
        setTotalPages(res.data.totalPages);
        console.log("page=", page, "jobs=", jobs);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const handleSignOut = () => {
    sessionStorage.clear()
    setUserId(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Job ATM" sections={sections} userId={userId} handleSignOut={handleSignOut}/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <JobList jobList={jobs} employerId={0} />
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
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
