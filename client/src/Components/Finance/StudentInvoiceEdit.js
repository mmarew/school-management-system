import { Close, Delete, Label } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ProcessingButton from "../Utilities/ProcessingButton";
let ServeAddress = process.env.REACT_APP_SERVER;
function StudentInvoiceEdit({ data }) {
  let { invoivceData, setinvoivceData, getInvoicesList } = data;
  let { openDelete, openEdit, Invoice } = invoivceData;
  const [submitErrors, setsubmitErrors] = useState(null);
  let handleInputChanges = (e) => {
    setsubmitErrors(null);
    let { name, value } = e.target;
    setinvoivceData({
      ...invoivceData,
      Invoice: { ...Invoice, [name]: value },
    });
  };
  const [Processing, setProcessing] = useState(false);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setsubmitErrors(null);
      setProcessing(true);
      let responces = await axios.put(ServeAddress + "/studentsFinance", {
        ...invoivceData,
      });
      console.log("responces", responces.data);
      let { Messages } = responces.data;
      setProcessing(false);
      alert("Messages");
      getInvoicesList();
      if (Messages == "success") {
        handleClose();
      }
    } catch (error) {
      setProcessing(false);
      setsubmitErrors(error.message);
      console.log("error", error.message);
    }
  };
  let handleClose = () => {
    setinvoivceData({ ...invoivceData, openEdit: false });
  };
  return (
    <Modal open={openEdit}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Paper sx={{ width: "300px", padding: "20px 30px" }}>
          <Box sx={{ textAlign: "end" }}>
            <IconButton onClick={handleClose} sx={{ color: "red" }}>
              <Close />
            </IconButton>
          </Box>
          <Typography>Form To Edit students Invoice</Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <br></br>
            <TextField
              label={"Collected Money"}
              name="payment_amount"
              onChange={handleInputChanges}
              value={Invoice.payment_amount}
            />{" "}
            <br />
            <Typography>Invoice Status</Typography> <br />
            <Select
              label={"Invoice Status"}
              name="status"
              onChange={handleInputChanges}
              value={Invoice.status}
            >
              <MenuItem value={"notPaied"}>notPaied</MenuItem>
              <MenuItem value={"paied"}>paied</MenuItem>{" "}
              <MenuItem value={"Verified"}>Verified</MenuItem>
            </Select>
            <br />
            {!Processing ? (
              <Button variant="contained" type="submit">
                Submit
              </Button>
            ) : (
              <ProcessingButton />
            )}
          </form>
          <br />
          {console.log("submitErrors", submitErrors)}
          {submitErrors && (
            <Chip label={submitErrors} color="error">
              {" "}
            </Chip>
          )}
        </Paper>
      </Box>
    </Modal>
  );
}

export default StudentInvoiceEdit;
