import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Job } from './HomePage'

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
  job: Job,
  image: string,
  imageLabel: string
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { job, image, imageLabel } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
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
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={image}
            // image={post.image}
            alt={imageLabel}
            // alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}