import React, { useState } from "react";
import StudentSideViewFee from "./StudentSideViewFee";
import Logout from "../Login/Logout";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../Redux/ContextWrapper";
import { Tab, Tabs } from "@mui/material";

function MuiTab() {
  let Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  let { setRole } = useMyContext();
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  let handleLogout = () => {
    console.log("handleLogout", "handleLogout");
    Logout();
    Navigate();
    setRole(null);
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label={"Fee"} value={0} />
        <Tab label={"Attendance"} value={1} />
        <Tab label={"grade"} value={2} />
        <Tab onClick={handleLogout} label={"logout"} value={3} />
      </Tabs>
      <div>
        {activeTab == 0 ? (
          <StudentSideViewFee />
        ) : activeTab == 1 ? (
          "909090"
        ) : (
          "uiuiuiui"
        )}
      </div>
    </div>
  );
}

export default MuiTab;
