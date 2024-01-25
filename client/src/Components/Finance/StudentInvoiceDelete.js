import { Close } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Modal } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ProcessingButton from "../Utilities/ProcessingButton";

let ServeAddress = process.env.REACT_APP_SERVER;
function StudentInvoiceDelete({ data }) {
  const [submitError, setsubmitError] = useState(null);
  let { invoivceData, setinvoivceData, getInvoicesList } = data;
  let { openDelete, openEdit, Invoice } = invoivceData;
  let confirmClick = async () => {
    try {
      setProcessing(true);
      setsubmitError(null);
      let Responces = await axios.delete(ServeAddress + "/studentsFinance", {
        data: { ...Invoice },
      });
      setProcessing(false);
      console.log("Responces", Responces.data);
      let { Messages } = Responces.data;
      alert(Messages);
      getInvoicesList();
      handleClose();
      console.log("Messages", Messages);
    } catch (error) {
      setProcessing(false);
      setsubmitError(error.message);
      console.log("error", error.message);
    }
  };
  let handleClose = () => {
    setinvoivceData({ ...invoivceData, openDelete: false });
  };
  const [Processing, setProcessing] = useState(false);
  return (
    <Modal open={openDelete}>
      <Box
        sx={{
          width: "300px",
          padding: "30px",
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Box sx={{ textAlign: "end" }}>
          <IconButton onClick={() => handleClose()} color="error">
            <Close />
          </IconButton>
        </Box>
        <h4>Are you suer you want to delete this invice data</h4>
        {!Processing ? (
          <Box sx={{}}>
            <Button
              fullWidth
              onClick={() => {
                confirmClick();
              }}
              variant="contained"
              color="error"
            >
              Confirm
            </Button>
          </Box>
        ) : (
          <ProcessingButton />
        )}
        {submitError && (
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            {" "}
            <Chip color="error" label={submitError} />
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default StudentInvoiceDelete;
