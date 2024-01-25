import React, { useState } from "react";
import GetAttendances from "./GetAttendances";
import Logout from "../Login/Logout";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../Redux/ContextWrapper";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import GenerateAttendances from "./GenerateAttendances";

function Attendance() {
  let { setRole } = useMyContext();
  let Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <h4 style={{ textAlign: "center", marginTop: "40px" }}>Attendance</h4>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Create" />
        <Tab label="View" />
        <Tab label="Logout" />
      </Tabs>
      <div>
        {activeTab === 0 && <GenerateAttendances />}
        {activeTab === 1 && <GetAttendances />}
        {activeTab === 2 && (
          <Button
            variant="contained"
            onClick={() => {
              Logout();
              setRole(null);
              Navigate("/");
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}
export default Attendance;
