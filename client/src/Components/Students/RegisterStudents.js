import React, { useEffect, useState } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useMyContext } from "../Redux/ContextWrapper";
import { GetClass } from "../Class/ViewClass";
const RegisterStudentForm = () => {
  let ServeAddress = process.env.REACT_APP_SERVER;
  let { classList, setClassList } = useMyContext();
  // console.log("getClass", GetClass());
  useEffect(() => {
    let fetchData = async () => {
      let Messages = await GetClass();
      setClassList(Messages);
    };
    fetchData();
  }, []);

  let dataOStudents = {
    password: "",
    role: "Student",
    selectedGrade: "Default",
    name: "",
    dateOfBirth: "",
    address: "",
    contactNumber: "",
    Grade: "",
    mothersFullNames: "",
    medicalInformations: "",
    relativePhone: "",
    relativeAddress: "",
    Relationship: "",
    nameOfRelatives: "",
    file: null,
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
      console.log("studentData", studentData);
      // return;
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
      let { Messages } = response.data;
      alert(Messages);
      if (Messages === "success") {
        setStudentData({ ...dataOStudents });
      }
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
        maxWidth: "600px",
        margin: " 20px auto",
        padding: "20px",
      }}
      onSubmit={handleSubmit}
    >
      <h3 style={{ textAlign: "center" }}>Registration form to students</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: "290px", margin: "0 auto" }}>
          <TextField
            required
            label="Full Name"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={studentData.dateOfBirth}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            label="Address"
            name="address"
            value={studentData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Contact Number"
            name="contactNumber"
            value={studentData.contactNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Mothers Full Name"
            name="mothersFullNames"
            value={studentData.mothersFullNames}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Select
            required
            label="Grade"
            name="selectedGrade"
            onChange={handleChange}
            fullWidth
            margin="normal"
            value={studentData.selectedGrade}
          >
            <MenuItem value="Default">Choose Grade</MenuItem>
            {classList.map((classItem) => (
              <MenuItem key={classItem.classId} value={classItem.classId}>
                {classItem.className}
              </MenuItem>
            ))}
          </Select>

          <TextField
            required
            label="Medical Informations"
            name="medicalInformations"
            value={studentData.medicalInformations}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div style={{ maxWidth: "290px", margin: "0 auto" }}>
          <h3>Who Else has permission to pick up your Child </h3>
          <TextField
            required
            label="Name Of Relatives"
            name="nameOfRelatives"
            value={studentData.nameOfRelatives}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Relationship"
            name="Relationship"
            value={studentData.Relationship}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Relative Address"
            name="relativeAddress"
            value={studentData.relativeAddress}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />{" "}
          <TextField
            required
            label=" Relative Phone"
            name="relativePhone"
            value={studentData.relativePhone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            value={studentData.password}
            onChange={handleChange}
            name="password"
            required
            margin="normal"
            fullWidth
            type="password"
            label="Password"
          />
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button component="span">Choose Students IMG</Button>
      </label>
      <div> {studentData.file ? studentData.file.name : ""}</div>
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
