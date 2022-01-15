import * as React from "react";
import { Button, Toolbar } from "@mui/material";
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

interface HeaderEmployerProps {
  userId: string
}

export default function HeaderEmployer(props: HeaderEmployerProps) {
  const {userId} = props
  
  return (
    <ThemeProvider theme={theme}>
      {(!userId || userId === "0") ? (
        "Loading....."
      ) : (
        <React.Fragment>
          <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
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
          </Toolbar>
          <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: "space-between", overflowX: "auto" }}
          >
            <Link to={`../createpost/${userId}/0`}>Manage Jobs</Link>
          </Toolbar>
        </React.Fragment>
      )}
    </ThemeProvider>
  );
}
