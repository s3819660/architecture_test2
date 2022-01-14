import * as React from "react";
import Grid from "@mui/material/Grid";
import FeaturedPost from "./FeaturedPost";

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

interface JobListProps {
  jobList: Job[] | undefined
}

export default function JobList(props: JobListProps) {
  const { jobList } = props;

  return (
        <>
          <Grid container spacing={4}>
            {jobList?.map((post) => (
              <FeaturedPost
                key={post.title}
                image="https://source.unsplash.com/random"
                imageLabel="Image Text"
                job={post}
              />
            ))}
          </Grid>
        </>
  );
}
