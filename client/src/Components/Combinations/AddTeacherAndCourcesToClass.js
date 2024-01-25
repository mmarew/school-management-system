import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useMyContext } from "../Redux/ContextWrapper";
import axios from "axios";
import ProcessingButton from "../Utilities/ProcessingButton";
import GetClassAndCources from "./GetClassAndCources";
import getClassAndTeachers_Cources from "./GetClassAndTeachers";
function AddTeacherToClass({ data }) {
  let ServeAddress = process.env.REACT_APP_SERVER;
  let { assignTeachersToClass, setassignTeachersToClass } = data;

  let targetedClass = assignTeachersToClass.Class;
  let handleClose = () => {
    setassignTeachersToClass({ Open: false });
  };
  let formStructures = { selectedTeachers: "", selectedCources: "" };
  let { Employees, Courses, setclassAndTeachers, setclassAndCources } =
    useMyContext();
  const [formsData, setFormsData] = useState({ ...formStructures });
  let handleInputsChange = (e) => {
    setFormsData({ ...formsData, [e.target.name]: e.target.value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    console.log("formsData", formsData);
    // return;
    let responces = await axios.post(
      ServeAddress + "/Combination/addTeachersToClass",
      {
        ...targetedClass,
        ...formsData,
      }
    );
    let { Messages } = responces.data;
    alert(Messages);
    console.log("Messages", Messages);
    setProcessing(false);
    if (Messages == "registered before") return;
    let Class_Teachers = await getClassAndTeachers_Cources();
    let classAndCources = await GetClassAndCources();
    setclassAndCources(classAndCources);
    setclassAndTeachers(Class_Teachers);
    handleClose();
  };
  const [Processing, setProcessing] = useState(false);
  return (
    <Modal open={assignTeachersToClass.Open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          backgroundColor: "white",
          padding: "20px",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <div style={{ textAlign: "end" }}>
          <Button onClick={handleClose} sx={{ color: "red" }}>
            <CloseIcon />
          </Button>
        </div>
        <h5>Assign Teachers To Class {targetedClass.className}</h5>
        <form onSubmit={handleSubmit}>
          <h5>Select Teachers List</h5>
          <Select
            required
            value={formsData.selectedTeachers}
            name="selectedTeachers"
            onChange={handleInputsChange}
            fullWidth
            label={"select Teachers  "}
          >
            {Employees.map((Employee) => (
              <MenuItem key={Employee.teachersId} value={Employee.teachersId}>
                {Employee.teachersName}
              </MenuItem>
            ))}
          </Select>
          <br />
          <h5> Select Cources</h5>
          <Select
            name="selectedCources"
            value={formsData.selectedCources}
            onChange={handleInputsChange}
            required
            fullWidth
          >
            {Courses.map((cource) => {
              return (
                <MenuItem value={cource.courcesId}>
                  {cource.courceName}
                </MenuItem>
              );
            })}
          </Select>
          <br /> <br />
          {!Processing ? (
            <Button fullWidth variant="contained" type="submit">
              Submit
            </Button>
          ) : (
            <ProcessingButton />
          )}
        </form>
      </Box>
    </Modal>
  );
}

export default AddTeacherToClass;
