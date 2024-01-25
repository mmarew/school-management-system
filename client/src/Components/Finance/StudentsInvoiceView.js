import {
  Box,
  Button,
  Chip,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import React, { useState } from "react";
import ProcessingButton from "../Utilities/ProcessingButton";
import { DateFormatter, YMDFormatter } from "../Utilities/DateFormatter";
import axios from "axios";
import StudentInvoiceDelete from "./StudentInvoiceDelete";
import StudentInvoiceEdit from "./StudentInvoiceEdit";

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
function StudentsInvoiceView() {
  const [invoiceInfo, setinvoiceInfo] = useState([]);
  let getInvoicesList = async (e) => {
    try {
      if (e) e.preventDefault();
      setProcessing(true);
      let Responces = await axios.get(
        ServeAddress +
          "/studentsFinance?invoiceDate=" +
          YMDFormatter(formData.Year, formData.Month, 1)
      );

      setProcessing(false);
      console.log("Responces", Responces.data);
      let { Messages } = Responces.data;
      setinvoiceInfo(Messages);
      // alert(Messages);
      if (Messages == "success") {
      }
    } catch (error) {
      setProcessing(false);
      console.log("error", error);
    }
  };
  let Year = new Date().getFullYear();
  const [formData, setformData] = useState({ Year: "", Month: "" });
  let handleInputChanges = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const [Processing, setProcessing] = useState(false);
  const [invoivceData, setinvoivceData] = useState({
    openDelete: false,
    openEdit: false,
    Invoice: {},
  });
  return (
    <div>
      {invoivceData.openEdit && (
        <StudentInvoiceEdit
          data={{ invoivceData, setinvoivceData, getInvoicesList }}
        />
      )}{" "}
      {invoivceData.openDelete && (
        <StudentInvoiceDelete
          data={{ invoivceData, setinvoivceData, getInvoicesList }}
        />
      )}
      <Paper
        style={{ width: "300px", padding: "15px 30px", margin: "20px auto" }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={getInvoicesList}
        >
          <br />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <br />
            <label>Choose Month</label>
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
            <br />
            <label>Choose Year</label>
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
          <br />
          {!Processing ? (
            <Button variant="contained" type="submit">
              View Invoices
            </Button>
          ) : (
            <ProcessingButton />
          )}
        </form>
      </Paper>
      {invoiceInfo.length > 0 && (
        <TableContainer sx={{ backgroundColor: "white" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Payment Amount</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceInfo.map((info) => (
                <TableRow key={info.id}>
                  <TableCell>{info.name}</TableCell>
                  <TableCell>{info.payment_amount}</TableCell>
                  <TableCell>{DateFormatter(info.Payment_date)}</TableCell>
                  <TableCell>{info.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setinvoivceData({
                          openDelete: false,
                          openEdit: true,
                          Invoice: info,
                        });
                      }}
                    >
                      {<Edit />}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setinvoivceData({
                          openDelete: true,
                          openEdit: false,
                          Invoice: info,
                        });
                      }}
                    >
                      {<Delete color="error" />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {invoiceInfo.length == 0 && !Processing && (
        <Box sx={{ textAlign: "center" }}>
          <Chip
            color="error"
            sx={{ margin: "auto" }}
            label="Invoice Data Not Found"
          />
        </Box>
      )}
    </div>
  );
}

export default StudentsInvoiceView;
