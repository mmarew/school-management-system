import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import axios from "axios";
import React from "react";

function DeleteEmployees({ employeesInfo }) {
  // employeesInfo={{
  //         employeesData,
  //         setEmployeesData,
  //         fetchData,
  //       }}
  let { employeesData, setEmployeesData, fetchData } = employeesInfo;
  let { Employee } = employeesData;
  console.log("Employee", Employee);
  //   return;
  let handleClose = (e) => {
      setEmployeesData({ Open: false });
    },
    handleConfirm = async (e) => {
      const ServeAddress = process.env.REACT_APP_SERVER;
      let responces = await axios.delete(
        ServeAddress + "/staffs/employees?Employee=" + JSON.stringify(Employee)
      );
      let { Messages } = responces.data;
      console.log("responces", responces);
      alert(Messages);
      if (Messages == "error") {
        return;
      }
      if (Messages == "fail") {
      }
      if (Messages == "success") {
        fetchData();
      }
      handleClose();
    };
  return (
    <div>
      <Dialog open={employeesData.openDelete}>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this data?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ textAlign: "center" }}>
          <Button color="warning" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteEmployees;
