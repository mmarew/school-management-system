import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import "./Home.css";
import { useMyContext } from "./Components/Redux/ContextWrapper";
import { useNavigate } from "react-router-dom";
function Home() {
  let { classList, Courses, Employees } = useMyContext();
  let Navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="center"
      //   alignItems="center"
      height="100vh"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">
          Welcome To ETHIO AMERICAN Childcare Center.
        </Typography>
        <Box mt={4} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6">Explore the following sections:</Typography>
          <Box
            mt={2}
            display="flex"
            flexWrap={"wrap"}
            flexDirection="row"
            justifyContent={"center"}
          >
            <Paper
              onClick={() => {
                Navigate("/students");
              }}
              className="homePaper"
              mx={2}
            >
              <Typography variant="body1">Students</Typography>
              <Typography variant="body1">{Employees.length}</Typography>
              <Button fullWidth>Detailes</Button>
            </Paper>
            {/* <Paper className="homePaper" mx={2}>
              <Typography variant="body1">Employees</Typography>
              <Typography variant="body1">{Employees.length}</Typography>
            </Paper> */}
            <Paper
              onClick={() => {
                Navigate("/employees");
              }}
              className="homePaper"
              mx={2}
            >
              <Typography variant="body1">Teachers </Typography>
              <Typography variant="body1">{Employees.length}</Typography>
              <Button fullWidth>Detailes</Button>
            </Paper>
            <Paper
              onClick={() => {
                Navigate("/courses");
              }}
              className="homePaper"
              mx={2}
            >
              <Typography variant="body1">Courses</Typography>
              <Typography variant="body1">{Courses.length}</Typography>
              <Button fullWidth>Detailes</Button>
            </Paper>
            <Paper
              onClick={() => {
                Navigate("/class");
              }}
              className="homePaper"
              mx={2}
            >
              <Typography variant="body1">Class</Typography>
              <Typography variant="body1">{classList.length}</Typography>
              <Button fullWidth>Detailes</Button>
            </Paper>
            <Paper
              onClick={() => {
                Navigate("/finance/StudentsFinance");
              }}
              className="homePaper"
            >
              <Typography variant="body1">Finances</Typography>
              <Typography variant="body1">30</Typography>
              <Button fullWidth>Detailes</Button>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
