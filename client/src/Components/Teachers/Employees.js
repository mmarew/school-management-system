import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import EmployeeRegistrationForm from "./EmployeeRegistrationForm";
import ViewEmployees from "./ViewEmployees";

const Employees = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="View" />
        <Tab label="Register" />
      </Tabs>

      {value === 0 && (
        <div>
          <ViewEmployees />
        </div>
      )}
      {value === 1 && (
        <div>
          <EmployeeRegistrationForm />
        </div>
      )}
    </div>
  );
};

export default Employees;
