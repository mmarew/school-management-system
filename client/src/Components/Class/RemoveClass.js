import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useMyContext } from "../Redux/ContextWrapper";

function RemoveClass({ data }) {
  let { classList, setClassList } = useMyContext();
  const { GetClass, selectedEmployee, setSelectedEmployee } = data;
  const { Employee } = selectedEmployee;
  const ServerAddress = process.env.REACT_APP_SERVER;

  let handleClose = () => {
      setSelectedEmployee({ openDelete: false });
    },
    handleSubmit = async () => {
      const response = await axios.delete(ServerAddress + "/class/class", {
        data: { className: Employee },
      });
      console.log("response", response);
      // return;
      let { Messages } = response.data;
      alert(Messages);
      if (Messages == "success") {
      }
      if (Messages == "fail") {
      }
      if (Messages == "error") {
      }
      let results = await GetClass();
      setClassList(results);
      console.log("Messages ", Messages);
      handleClose();
    };
  return (
    <Dialog open={selectedEmployee.openDelete} onClose={handleClose}>
      <DialogTitle>Are you sure to delete this data?</DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="error">
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveClass;
