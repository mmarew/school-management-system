import {
  Box,
  Button,
  List,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import ProcessingButton from "../Utilities/ProcessingButton";
import { useMyContext } from "../Redux/ContextWrapper";
function EditCources({ data }) {
  let { classList, setClassList, Employees, setEmployees } = useMyContext();
  let ServeAddress = process.env.REACT_APP_SERVER;
  let { courceData, setcourceData, fetchData } = data;
  let { Courses } = courceData;
  let handleInputChanges = (e) => {
    setcourceData((previousData) => {
      return {
        ...previousData,
        Courses: { ...previousData.Courses, [e.target.name]: e.target.value },
      };
    });
  };
  let closeModal = (e) => {
    setcourceData((prev) => {
      return { ...prev, openEdit: false };
    });
  };
  let submitForms = async (e) => {
    e.preventDefault();
    setProcessing(true);
    let responces = await axios.put(ServeAddress + "/cources/cources", {
      ...Courses,
    });
    setProcessing(false);
    let { Messages } = responces.data;
    alert(Messages);
    console.log("Messages", Messages);
    closeModal();
    fetchData();
  };

  const [Processing, setProcessing] = useState(false);
  return (
    <div>
      {console.log("Courses", Courses)}
      <Modal open={courceData.openEdit}>
        <Box
          sx={{
            padding: "10px",
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div style={{ textAlign: "end" }}>
            <Button onClick={closeModal}>
              <CloseIcon color="error" />
            </Button>
          </div>
          <form
            onSubmit={submitForms}
            style={{ width: "300px", padding: "10px" }}
          >
            <TextField
              fullWidth
              onChange={handleInputChanges}
              name="courceName"
              required
              label="Business Name"
              value={Courses.courceName}
            />
            <br /> <br />
            {!Processing ? (
              <Button variant="contained" fullWidth type="submit">
                submit
              </Button>
            ) : (
              <ProcessingButton />
            )}
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default EditCources;
