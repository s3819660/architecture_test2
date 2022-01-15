import * as React from "react";
import {
  TableRow,
  Button,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  IconButton,
  Tooltip
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Application } from "./CreateEditPostPage";
import { useState, useEffect } from "react";

interface ApplicationsTableProps {
  applications: Application[] | undefined;
  setPage: (page: number) => void;
  setPageSize: (page: number) => void;
  page: number;
  totalPages: number;
}

interface Column {
  id:
    | "id"
    | "date"
    | "fullName"
    | "phone"
    | "age"
    | "address"
    | "qualification"
    | "experience";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "Application ID", minWidth: 170 },
  { id: "date", label: "Apply date", minWidth: 100 },
  {
    id: "fullName",
    label: "Full Name",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "age",
    label: "Age",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "qualification",
    label: "Qualification",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "experience",
    label: "Experience",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

export default function StickyHeadTable(props: ApplicationsTableProps) {
  const { applications, setPage, setPageSize, page, totalPages } = props;

  const [rowsPerPage, setRowsPerPage] = useState(1);

  const [openTooltip, setOpenTooltip] = useState(false);
  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };
  const handleTooltipOpen = () => {
    setOpenTooltip(true);
  };

  useEffect(() => {
    console.log("table applications=", applications);
  }, [applications]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPageSize(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* <TableCell key="" style={{ minWidth: 170 }} /> */}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.map((app, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell align={"center"} style={{ minWidth: "80px" }}>
                    <Button variant="contained" style={{ width: "80px" }} >
                      Accept
                    </Button>
                    <Button variant="outlined" style={{ width: "80px" }}>
                      Deny
                    </Button>
                  </TableCell>
                  <TableCell
                    key={index}
                    align={"center"}
                    style={{ minWidth: "100" }}
                  >
                    {app.id}
                  </TableCell>
                  <TableCell key={index} style={{ minWidth: "170" }}>
                    {app.date}
                  </TableCell>
                  <TableCell
                    key={index}
                    align={"center"}
                    style={{ minWidth: "170" }}
                  >
                    {app.employee.fullName}
                  </TableCell>
                  <TableCell
                    key={index}
                    align={"center"}
                    style={{ minWidth: "170" }}
                  >
                    {app.employee.phone}
                  </TableCell>
                  <TableCell
                    key={index}
                    align={"center"}
                    style={{ minWidth: "170" }}
                  >
                    {app.employee.age}
                  </TableCell>
                  <TableCell
                    key={index}
                    align={"center"}
                    style={{ minWidth: "170" }}
                  >
                    {app.employee.address.substring(0, 20)}
                      <Tooltip
                        disableFocusListener 
                        title={app.employee.address}
                      >
                        <IconButton aria-label="delete" onClick={handleTooltipOpen}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                  </TableCell>
                  <TableCell
                    key={index}
                    align={"center"}
                    style={{ minWidth: "170" }}
                  >
                    {app.employee.qualification}
                  </TableCell>
                  <TableCell
                    key={index}
                    align={"center"}
                    style={{ minWidth: "170" }}
                  >
                    {app.employee.experience}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 2, 3]}
        component="div"
        count={totalPages}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
