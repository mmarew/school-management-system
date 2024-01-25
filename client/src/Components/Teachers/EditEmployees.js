import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import ProcessingButton from "../Utilities/ProcessingButton";

function EditEmployees({ employeesInfo }) {
  console.log("employeesInfo", employeesInfo);
  let { employeesData, setEmployeesData, getEmployees } = employeesInfo;
  let { Employee, openDelete, openEdit } = employeesData;

  const ServeAddress = process.env.REACT_APP_SERVER;
  let handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    let Responces = await axios.put(ServeAddress + "/staffs/updateStaffs", {
      Employee,
    });
    setProcessing(false);
    let { Messages } = Responces.data;
    alert(Messages);
    console.log("Messages", Messages);
  };
  let handleInputChanges = (e) => {
    setEmployeesData((prev) => {
      return {
        ...prev,
        Employee: { ...prev.Employee, [e.target.name]: e.target.value },
      };
    });
    console.log(e.target.value);
  };
  const [Processing, setProcessing] = useState(false);
  return (
    <Modal open={openEdit}>
      <Box
        sx={{
          width: "86vw",
          maxWidth: "400px",
          backgroundColor: "white",
          padding: "10px 30px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        {console.log("Employee", Employee)}
        <div style={{ padding: "5px 10px", textAlign: "end" }}>
          <Button
            onClick={() => {
              setEmployeesData({ openEdit: false });
            }}
          >
            <CloseIcon color="error" />
          </Button>
        </div>
        <form
          onSubmit={handleUpdateSubmit}
          style={{ width: "100%", clear: "both" }}
        >
          <TextField
            label="Teachers Name"
            onChange={handleInputChanges}
            fullWidth
            value={Employee.teachersName}
            name="teachersName"
          />{" "}
          <br /> <br />
          <TextField
            label="Phone Number"
            onChange={handleInputChanges}
            fullWidth
            value={Employee.teachersPhoneNumber}
            name="teachersPhoneNumber"
          />{" "}
          <br /> <br />
          <TextField
            label="Teachers Email"
            onChange={handleInputChanges}
            fullWidth
            value={Employee.teachersemail}
            name="teachersemail"
          />{" "}
          <br /> <br />
          <TextField
            label="Description"
            onChange={handleInputChanges}
            fullWidth
            value={Employee.Descriptions}
            name="Descriptions"
          />
          <br /> <br />
          {!Processing ? (
            <Button type="submit" variant="contained" fullWidth>
              Update
            </Button>
          ) : (
            <ProcessingButton />
          )}
          <br />
          <br />
        </form>
      </Box>
    </Modal>
  );
}

export default EditEmployees;
