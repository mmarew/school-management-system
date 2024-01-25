import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "../Login/Logout";
import { useMyContext } from "../Redux/ContextWrapper";

const SchoolNavigation = () => {
  let { setRole } = useMyContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            School
          </Typography>
          {isLargeScreen && (
            <List sx={{ display: "flex" }}>
              <ListItem
                sx={{
                  display: "flex",
                  backgroundColor:
                    location.pathname === "/" ? "green" : "inherit",
                }}
                button
                component={Link}
                to="/"
                color={location.pathname === "/" ? "green" : "inherit"}
              >
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  backgroundColor:
                    location.pathname === "/students" ? "green" : "inherit",
                }}
                button
                component={Link}
                to="/students"
                color={location.pathname === "/students" ? "green" : "inherit"}
              >
                <ListItemText primary="Students" />
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  backgroundColor:
                    location.pathname === "/courses" ? "green" : "inherit",
                }}
                button
                component={Link}
                to="/courses"
                color={location.pathname === "/courses" ? "green" : "inherit"}
              >
                <ListItemText primary="Courses" />
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  backgroundColor:
                    location.pathname === "/class" ? "green" : "inherit",
                }}
                button
                component={Link}
                to="/class"
                color={location.pathname === "/class" ? "green" : "inherit"}
              >
                <ListItemText primary="class" />
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  backgroundColor:
                    location.pathname === "/employees" ? "green" : "inherit",
                }}
                button
                component={Link}
                to="/employees"
                color={location.pathname === "/employees" ? "green" : "inherit"}
              >
                <ListItemText primary="Teachers" />
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  backgroundColor:
                    location.pathname === "/finance/StudentsFinance"
                      ? "green"
                      : "inherit",
                }}
                button
                component={Link}
                to="/finance/StudentsFinance"
                color={
                  location.pathname.includes("/finance") ? "green" : "inherit"
                }
              >
                <ListItemText primary="Finance" />
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  backgroundColor:
                    location.pathname === "/login" ? "green" : "inherit",
                }}
                onClick={() => {
                  setRole(null);
                  Logout();
                }}
                button
                component={Link}
                to="/login"
                color={location.pathname === "/login" ? "green" : "inherit"}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={handleDrawerToggle}
            style={{
              backgroundColor: location.pathname === "/" ? "green" : "inherit",
            }}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/students"
            onClick={handleDrawerToggle}
            style={{
              backgroundColor:
                location.pathname === "/students" ? "green" : "inherit",
            }}
          >
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/courses"
            onClick={handleDrawerToggle}
            style={{
              backgroundColor:
                location.pathname === "/courses" ? "green" : "inherit",
            }}
          >
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/class"
            onClick={handleDrawerToggle}
            style={{
              backgroundColor:
                location.pathname === "/class" ? "green" : "inherit",
            }}
          >
            <ListItemText primary="class" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/employees"
            onClick={handleDrawerToggle}
            style={{
              backgroundColor:
                location.pathname === "/employees" ? "green" : "inherit",
            }}
          >
            <ListItemText primary="Teachers" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/login"
            onClick={() => {
              setRole(null);
              Logout();
            }}
            style={{
              backgroundColor:
                location.pathname === "/login" ? "green" : "inherit",
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SchoolNavigation;
