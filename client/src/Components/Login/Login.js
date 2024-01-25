import {
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProcessingButton from "../Utilities/ProcessingButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../Redux/ContextWrapper";
let ServeAddress = process.env.REACT_APP_SERVER;
function Login() {
  let { Role, setRole } = useMyContext();
  let Navigate = useNavigate();
  useEffect(() => {
    console.log("Role", Role);

    Navigate("/");

    // Navigate("/");
  }, [Role]);

  const [loginError, setloginError] = useState("");
  let loginData = { phoneNumber: "", Password: "", Role: "Default" };
  const [formData, setformData] = useState({ ...loginData });
  let handleInputChanges = (e) => {
    const { name, value } = e.target;
    if (formData[name] !== value) {
      setloginError("");
      setformData({ ...formData, [name]: value });
    }
  };
  const [Processing, setProcessing] = useState(false);
  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formData.Role == "Default") {
        setloginError("Choose role");
        return;
      }
      setProcessing(true);
      let sentableData = { ...formData };

      sentableData.phoneNumber = encodeURIComponent(sentableData.phoneNumber);
      let responces = await axios.get(ServeAddress + "/login", {
        headers: {
          ...sentableData,
        },
      });
      let { Messages, Token, userId } = responces.data;
      console.log("login Messages", Messages);
      setProcessing(false);
      if (Messages == "success") {
        localStorage.setItem("Role", formData.Role);
        setRole(formData.Role);
        localStorage.setItem("userId", userId);
        localStorage.setItem("authId", Token);
        Navigate("/");
      } else {
        setloginError(Messages);
      }
    } catch (error) {
      setProcessing(false);
      console.log("error", error.message);
      setloginError(error.message);
    }
  };
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <Paper
      style={{
        padding: "30px",
        width: "100%",
        maxWidth: "300px",
        margin: "20px auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography> Login form to school</Typography>
        <br />
        <TextField
          onChange={handleInputChanges}
          type="tel"
          fullWidth
          value={formData.phoneNumber}
          label="Phone Number"
          name="phoneNumber"
        />
        <br />
        <br />
        <TextField
          onChange={handleInputChanges}
          value={formData.Password}
          name="Password"
          type="password"
          fullWidth
          label="Password"
        />
        <br />
        <br />
        <label>Role</label>
        <Select
          required
          onChange={handleInputChanges}
          value={formData.Role}
          fullWidth
          name="Role"
        >
          <MenuItem value="Default">Choose Role</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
          <MenuItem value="Parent">Parent</MenuItem>
        </Select>
        <br />
        <br />
        {!Processing ? (
          <Button fullWidth variant="contained" type="submit">
            Submit
          </Button>
        ) : (
          <ProcessingButton />
        )}
      </form>
      <br />
      <>{loginError && <div style={{ color: "red" }}>{loginError}</div>}</>
    </Paper>
  );
}

export default Login;
