import * as React from "react";
import {
  CardMedia,
  Button,
  CardContent,
  CardActionArea,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Job } from "./JobList";
import axios from "axios";
import { Application } from "./CreateEditPostPage/CreateEditPostPage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface FeaturedPostProps {
  // post: {
  //   date: string;
  //   description: string;
  //   image: string;
  //   imageLabel: string;
  //   title: string;
  //   salaryMin: number;
  //   salaryMax: number
  // }
  job: Job;
  image: string;
  imageLabel: string;
  employerId: number;
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const navigate = useNavigate();
  const { job, image, imageLabel, employerId } = props;
  const [userId, setUserId] = useState<string | null>("");

  useEffect(() => {
    setUserId(window.sessionStorage.getItem("userId"));
  }, []);

  const handleDeleteJob = () => {
    axios
      .delete(`http://localhost:8080/job/${job.id}`)
      .then((res) => {
        console.log(res);
        alert("Successfully deleted job!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleApply = () => {
    if (!userId) return;

    var application = {
      job: {
        id: job.id,
      },
      employee: {
        id: userId,
      },
    };

    axios
      .post(`http://localhost:8080/application`, application)
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        // navigate("../", { replace: true });
        alert('Your application has been submitted. Thank you!')
      })
      .catch((error) => {
        // Error
        console.log(error.response);
      });
  };

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {/* {post.title} */}
            {job.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {/* {post.date} */}
            {job.date}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {/* {post.description} */}
            {job.description}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {/* {post.salaryMin} - {post.salaryMax} $ */}
            {job.salaryMin} - {job.salaryMax} $
          </Typography>
          {userId && userId && (employerId === 0 || !employerId) ? (
            <Button variant="contained" onClick={() => handleApply()}>
              Click to apply
            </Button>
          ) : employerId !== 0 ? (
            <>
              <Link to={`/createpost/${employerId}/${job.id}`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={handleDeleteJob}>Delete</Button>
            </>
          ) : (
            <Link to="/signup">
              <Typography variant="subtitle1" color="primary">
                Join to learn more....
              </Typography>
            </Link>
          )}
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: "none", sm: "block" } }}
          image={image}
          // image={post.image}
          alt={imageLabel}
          // alt={post.imageLabel}
        />
      </Card>
    </Grid>
  );
}
