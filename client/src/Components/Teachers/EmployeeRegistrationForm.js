import React, { useState } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import axios from "axios";
import ProcessingButton from "../Utilities/ProcessingButton";

const EmployeeRegistrationForm = () => {
  const [Processing, setProcessing] = useState(false);
  const ServeAddress = process.env.REACT_APP_SERVER;
  let employeesInfo = {
    name: "",
    email: "",
    phoneNumber: "",
    Descriptions: "",
    role: "Teacher",
    password: "",
  };
  const [employeeData, setEmployeeData] = useState(employeesInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("employeeData", employeeData);
    // return;
    setProcessing(true);
    try {
      const response = await axios.post(
        ServeAddress + "/staffs/employees",
        employeeData
      );
      setProcessing(false);
      console.log(response.data); // Handle success response
      // Reset the form
      let { Messages } = response.data;
      if (Messages == "registered before") {
        alert("This phone or email is registered before");
        return;
      }
      if (Messages == "success") {
        alert(Messages);
      }
      if (Messages == "unable to updates") {
        alert(Messages);
      }
      if (Messages == "error") {
        alert(Messages);
      }
      setEmployeeData(employeesInfo);
    } catch (error) {
      console.error(error); // Handle error response
    }
  };

  return (
    <form
      style={{
        backgroundColor: "white",
        maxWidth: "300px",
        margin: "20px auto",
        padding: "20px",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        required
        label="Name"
        name="name"
        value={employeeData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        required
        label="Email"
        name="email"
        type="email"
        value={employeeData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        required
        label="Phone Number"
        name="phoneNumber"
        value={employeeData.phoneNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <br />
      <br />
      <label>Choose Roles</label>
      <br />
      <br />
      <Select
        onChange={handleChange}
        name="role"
        fullWidth
        value={employeeData.role}
      >
        <MenuItem value="Teacher">Teacher</MenuItem>
      </Select>
      <br />
      <br />
      <TextField
        required
        label="Descriptions"
        name="Descriptions"
        value={employeeData.Descriptions}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        required
        label="Password"
        name="password"
        value={employeeData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {Processing ? (
        <ProcessingButton />
      ) : (
        <Button fullWidth type="submit" variant="contained" color="primary">
          Register
        </Button>
      )}
    </form>
  );
};

export default EmployeeRegistrationForm;
