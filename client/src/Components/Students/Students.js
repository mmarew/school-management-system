import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import RegisterStudentForm from "./RegisterStudents";
import ViewStudentsData from "./ViewStudentsData";
import CheckStudentsPaymentStatus from "./CheckStudentsPaymentStatus";

const Students = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        sx={{ width: "300px", margin: "auto" }}
        value={value}
        onChange={handleChange}
      >
        <Tab label="View" />
        <Tab label="Add" />
        {/* <Tab label="Payment  " /> */}
      </Tabs>

      {value === 0 ? (
        <ViewStudentsData />
      ) : value === 1 ? (
        <RegisterStudentForm />
      ) : value == 2 ? (
        <CheckStudentsPaymentStatus />
      ) : (
        value("No tab data ")
      )}
    </div>
  );
};

export default Students;
