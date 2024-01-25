import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import ProcessingButton from "../Utilities/ProcessingButton";
function DeleteCources({ data }) {
  const [Process, setProcess] = useState(false);
  let ServeAddress = process.env.REACT_APP_SERVER;
  let { courceData, setcourceData, fetchData } = data;
  let handleClose = (e) => {
    console.log("openDelete");
    setcourceData((prev) => {
      return { ...prev, openDelete: false };
    });
  };
  let { Courses } = courceData;
  let handleDelete = async (e) => {
    setProcess(true);
    let results = await axios.delete(ServeAddress + "/cources/cources", {
      data: Courses,
    });
    setProcess(false);
    fetchData();
    handleClose();
    let { Messages } = results.data;
    console.log("Messages", Messages);
    alert(Messages);
  };
  return (
    <div>
      <Modal open={courceData.openDelete}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div style={{ textAlign: "end" }}>
            <Button onClick={() => handleClose()}>
              <CloseIcon color="error" />
            </Button>
          </div>
          <div style={{ padding: "10px" }}>
            Do you want to delete this data?{" "}
          </div>
          <div>
            {Process ? (
              <ProcessingButton />
            ) : (
              <>
                <Button onClick={handleDelete} variant="outlined">
                  Confirm
                </Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                  variant="outlined"
                  color="error"
                >
                  Close
                </Button>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteCources;
