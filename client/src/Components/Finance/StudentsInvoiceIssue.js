import { Button, MenuItem, Paper, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import ProcessingButton from "../Utilities/ProcessingButton";
import axios from "axios";
import { YMDFormatter } from "../Utilities/DateFormatter";
let ServeAddress = process.env.REACT_APP_SERVER;
let Months = [
  "Jan",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEPT",
  "NOV",
  "OCT",
  "DEC",
];
function StudentsInvoiceIssue() {
  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setProcessing(true);
      let Responces = await axios.post(ServeAddress + "/studentsFinance", {
        invoiceDate: YMDFormatter(formData.Year, formData.Month, 1),
      });
      setProcessing(false);
      console.log("Responces", Responces.data);
      let { Messages } = Responces.data;
      alert(Messages);
      if (Messages == "success") {
      }
    } catch (error) {
      setProcessing(false);
      console.log("error", error);
    }
  };
  let Year = new Date().getFullYear();
  const [formData, setformData] = useState({
    Year: "",
    Month: "",
    feeAmount: 0,
  });
  let handleInputChanges = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const [Processing, setProcessing] = useState(false);
  return (
    <div>
      <Paper
        style={{ width: "300px", padding: "15px 30px", margin: "20px auto" }}
      >
        <form
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          onSubmit={handleSubmit}
        >
          <h4>Generate Invoices To Students</h4>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              value={formData.feeAmount}
              onChange={handleInputChanges}
              fullWidth
              required
              label="fee amount"
              name="feeAmount"
            />

            <label>Month</label>
            <Select
              name="Month"
              required
              fullWidth
              value={formData.Month}
              onChange={handleInputChanges}
            >
              {Months?.map((month, index) => {
                return <MenuItem value={index}>{month}</MenuItem>;
              })}
            </Select>

            <label>Year</label>
            <Select
              name="Year"
              required
              fullWidth
              value={formData.Year}
              onChange={handleInputChanges}
            >
              <MenuItem value={Year}>{Year}</MenuItem>;
            </Select>
          </div>

          {!Processing ? (
            <Button variant="contained" type="submit">
              Generate invoices
            </Button>
          ) : (
            <ProcessingButton />
          )}
        </form>
      </Paper>
    </div>
  );
}

export default StudentsInvoiceIssue;
