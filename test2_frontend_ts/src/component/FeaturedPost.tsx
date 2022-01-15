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
  const { job, image, imageLabel, employerId } = props;

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
          {employerId === 0 ? (
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          ) : (
            <Link to={`/createpost/${employerId}/${job.id}`}>
            <Button>Edit</Button>
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
