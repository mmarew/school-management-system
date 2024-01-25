import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useMyContext } from "../Redux/ContextWrapper";

function EditClass({ data }) {
  const { GetClass, selectedEmployee, setSelectedEmployee } = data;
  const { Employee } = selectedEmployee;
  let { setClassList } = useMyContext();
  const [className, setClassName] = useState(Employee.className);
  const ServerAddress = process.env.REACT_APP_SERVER;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(ServerAddress + "/class/updateclass", {
        Employee: { ...Employee, className },
      });
      let { Messages } = response.data;
      alert(Messages);
      const classLists = await GetClass();
      setClassList(classLists);
      handleClose();
      // Handle success response
      console.log("Update successful:", response.data);
    } catch (error) {
      // Handle error response
      console.error("Update error:", error);
    }
  };

  const handleClose = () => {
    setSelectedEmployee({ ...selectedEmployee, openEdit: false });
  };

  return (
    <Dialog open={selectedEmployee.openEdit} onClose={handleClose}>
      <DialogTitle>Edit Class</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditClass;
