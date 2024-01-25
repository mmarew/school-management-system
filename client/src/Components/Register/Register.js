import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import { Chip, Paper } from "@mui/material";
import axios from "axios";
import ProcessingButton from "../Utilities/ProcessingButton";

const roles = ["Admin", "Teacher", "Parent", "Student"];

function RegistrationForm() {
  const [submitError, setsubmitError] = useState(null);
  let dataStructure = {
    fullName: "",
    phoneNumber: "",
    password: "",
    role: "",
  };
  const [formData, setformData] = useState({ ...dataStructure });

  let ServeAddress = process.env.REACT_APP_SERVER;
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setProcessing(true);
      setsubmitError(null);
      let Results = await axios.post(ServeAddress + "/register/admin", {
        ...formData,
      });
      setProcessing(false);
      let { Messages } = Results.data;
      console.log("Results.data", Results.data);
      alert(Messages);
      if (Messages == "success") {
        console.log("Messages", Messages);
        setformData({ ...dataStructure });
      }
    } catch (error) {
      setProcessing(false);
      setsubmitError(error.message);
    }
  };
  const [Processing, setProcessing] = useState(false);
  let handleInputChanges = (e) => {
    // console.log("e", e);
    let { name, value } = e.target;
    // console.log("name, value", name, value);
    setformData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <Paper
      style={{
        width: "100%",
        maxWidth: "300px",
        padding: "30px",
        margin: "20px auto",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5">Registration Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChanges}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChanges}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleInputChanges}
          >
            {roles.map((roleOption) => (
              <MenuItem key={roleOption} value={roleOption}>
                {roleOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChanges}
          fullWidth
          margin="normal"
          required
        />
        <br /> <br />
        {!Processing ? (
          <Button fullWidth type="submit" variant="contained" color="primary">
            Register
          </Button>
        ) : (
          <ProcessingButton />
        )}
      </form>
      {submitError ? (
        <Chip sx={{ marginTop: "20px" }} color="error" label={submitError} />
      ) : (
        ""
      )}
    </Paper>
  );
}

export default RegistrationForm;
