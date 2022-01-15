import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
  userId: string | null;
  handleSignOut: () => void
}

export default function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const { sections, title, userId, handleSignOut } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        Welcome!
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link to="/">{title}</Link>
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {/* <Link to="/createpost/1">
          <Button variant="contained" size="small">
            Post Job
          </Button>
        </Link> */}
        {!userId ? (
          <Link to="/signup">
            <Button variant="outlined" size="small">
              Sign up
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/">
              <Button variant="outlined" size="small" onClick={() => handleSignOut()}>
                Sign Out
              </Button>
            </Link>
            <Link to="/employee">
              <Button variant="contained" size="small">
                Profile
              </Button>
            </Link>
          </>
        )}
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
  );
}
