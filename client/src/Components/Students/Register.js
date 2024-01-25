import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useMyContext } from "../Redux/ContextWrapper";

const RegisterStudentForm = () => {
  const ServeAddress = process.env.REACT_APP_SERVER;
  let {} = useMyContext();
  const dataOStudents = {
    name: "",
    dateOfBirth: "",
    address: "",
    contactNumber: "",
    Grade: "",
    mothersFullNames: "",
    medicalInformation: "",
    file: null, // Add file property to the initial state
  };
  const [studentData, setStudentData] = useState({ ...dataOStudents });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setStudentData((prevData) => ({
      ...prevData,
      file, // Update the file property in the state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const formData = new FormData();
      formData.append("file", studentData.file); // Append the file to the FormData

      // Append other student data to the FormData
      Object.entries(studentData).forEach(([key, value]) => {
        if (key !== "file") {
          formData.append(key, value);
        }
      });

      const response = await axios.post(
        `${ServeAddress}/students/registerStudents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
      setProcessing(false);
      console.log(response.data); // Handle success response
      // Reset the form
      let { message } = response.data;
      if (message === "Student registered successfully") {
        alert("success");
      }
      setStudentData({ ...dataOStudents });
    } catch (error) {
      alert("error");
      console.error(error); // Handle error response
    }
  };
  const [Processing, setProcessing] = useState(false);
  return (
    <form
      style={{
        backgroundColor: "white",
        maxWidth: "300px",
        margin: " 20px auto",
        padding: "20px",
      }}
      onSubmit={handleSubmit}
    >
      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span">
          Choose File
        </Button>
      </label>
      <TextField
        label="Selected File"
        value={studentData.file ? studentData.file.name : ""}
        disabled
        fullWidth
        margin="normal"
      />

      {/* Rest of the form fields */}
      {/* ... */}

      {!Processing ? (
        <Button fullWidth type="submit" variant="contained" color="primary">
          Register
        </Button>
      ) : (
        <Button fullWidth disabled>
          Processing ....{" "}
        </Button>
      )}
    </form>
  );
};

export default RegisterStudentForm;
