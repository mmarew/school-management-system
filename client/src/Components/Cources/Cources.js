import React, { useEffect, useState } from "react";
import { Tabs, Tab, Typography } from "@mui/material";
import AddCources from "./AddCources";
import ViewCources from "./ViewCources";
import { useMyContext } from "../Redux/ContextWrapper";
import { GetClass } from "../Class/ViewClass";
import { getEmployees } from "../Teachers/ViewEmployees";

const TabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
};

const Cources = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  let { classList, setClassList, Employees, setEmployees } = useMyContext();
  // console.log("getClass", GetClass());
  useEffect(() => {
    let fetchData = async () => {
      let Messages = await GetClass();
      setClassList(Messages);
    };
    fetchData();
  }, []);
  useEffect(() => {
    let fetchData = async () => {
      let Messages = await getEmployees();
      setEmployees(Messages);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Cources</h4>
      <Tabs
        sx={{ textAlign: "center", width: "fit-content", margin: "auto" }}
        value={value}
        onChange={handleTabChange}
      >
        <Tab label="View" />
        <Tab label="Add" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ViewCources />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddCources />
      </TabPanel>
    </div>
  );
};

export default Cources;
