import { Box, Button, Chip, Modal } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ProcessingButton from "../Utilities/ProcessingButton";
import { Close } from "@mui/icons-material";

function StudentSideMakePayment({ data }) {
  const [processing, setProcessing] = useState(false);
  const { getStudentsFee, PayStudentsFee, setPayStudentsFee } = data;
  const { Open, fee } = PayStudentsFee;
  const formData = new FormData();
  const serverAddress = process.env.REACT_APP_SERVER;
  const [submitError, setSubmitError] = useState(null);

  const submitReceiptToSchool = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setProcessing(true);

    try {
      formData.append("fee", JSON.stringify(fee)); // Append the 'fee' object to formData

      let responces = await axios.post(
        `${serverAddress}/studentsFinance/StudentSideMakePayment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let { Messages } = responces.data;
      alert(Messages);
      handleClose();
      setProcessing(false);
      console.log("File uploaded successfully");
      getStudentsFee(); // Fetch updated fee data after successful payment
      setPayStudentsFee({ Open: false, fee: null }); // Close the payment modal
    } catch (error) {
      setProcessing(false);
      setSubmitError("Error submitting receipt");
      console.error("Error submitting receipt:", error);
    }
  };

  const handleClose = () => {
    setPayStudentsFee({ ...PayStudentsFee, Open: false });
  };

  const handleInputChange = (e) => {
    setSubmitError(null);
    const { name } = e.target;
    const value = e.target.files[0];
    formData.set(name, value);
  };

  return (
    <Modal open={Open}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "10px 30px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <div style={{ textAlign: "end" }}>
          <Button onClick={handleClose}>
            <Close color="error" />
          </Button>
        </div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={submitReceiptToSchool}
        >
          <label>Attach your receipts:</label>
          <br />
          <input
            required
            onChange={handleInputChange}
            type="file"
            name="receipt"
          />
          {!processing ? (
            <Button
              sx={{ marginTop: "20px" }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          ) : (
            <ProcessingButton />
          )}
          <br />
        </form>
        {submitError && (
          <div style={{ marginTop: "20px" }}>
            <Chip color="error" label={submitError} />
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default StudentSideMakePayment;
