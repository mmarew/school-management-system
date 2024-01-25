import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import AddClass from "./AddClass";
import ViewClass from "./ViewClass";

const Class = () => {
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
        <Tab label="Add" />n
      </Tabs>

      {value === 0 ? (
        <ViewClass />
      ) : value === 1 ? (
        <AddClass />
      ) : value == 2 ? (
        "<UpdateClass />"
      ) : (
        value("No tab data ")
      )}
    </div>
  );
};

export default Class;
