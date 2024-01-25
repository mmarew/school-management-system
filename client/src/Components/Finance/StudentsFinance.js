import React from "react";
import { Tab, Tabs, Box } from "@mui/material";
import StudentsInvoiceView from "./StudentsInvoiceView";
import StudentsInvoiceIssue from "./StudentsInvoiceIssue";

function TabPanel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function MyTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        sx={{ alignItems: "center", width: "fit-content", margin: "auto" }}
        value={value}
        onChange={handleChange}
      >
        <Tab label="View Invoices" />
        <Tab label="Issue Invoices" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <StudentsInvoiceView />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StudentsInvoiceIssue />
      </TabPanel>
    </div>
  );
}

export default MyTabs;
