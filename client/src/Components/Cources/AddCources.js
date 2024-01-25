import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  FormControl,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import ProcessingButton from "../Utilities/ProcessingButton";
import { useMyContext } from "../Redux/ContextWrapper";

const FormContainer = styled(Container)(({ theme }) => ({
  // Custom styles for the form container
  // Example:
  // marginTop: theme.spacing(2),
}));

const useStyles = (theme) => ({
  formControl: {
    minWidth: 120,
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
});

const CourseRegistrationForm = () => {
  let ServeAddress = process.env.REACT_APP_SERVER;
  let data = {
    courceName: "",
    courceInstructor: "Default",
    targetedClass: "Default",
  };
  const [course, setCourse] = useState({ ...data });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Processing, setProcessing] = useState(false);
  let { classList, setClassList, Employees, setEmployees } = useMyContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("course", course);
    // return;
    setIsSubmitting(true);
    setProcessing(true);
    let Responces = await axios.post(ServeAddress + "/cources/cources", {
      ...course,
    });
    let { Messages } = Responces.data;
    console.log("Messages", Messages);
    alert(Messages);
    if (Messages == "connected") console.log();
    if (Messages == "error") console.log();
    if (Messages == "fail") console.log();
    setProcessing(false);
    setCourse(data);
    setIsSubmitting(false);
  };

  let handleChangeInInput = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };
  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Course Registration Form
      </Typography>
      <form
        style={{ backgroundColor: "white", padding: "30px" }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ ...useStyles }}>
              <TextField
                name="courceName"
                label="Cource Name"
                value={course.courceName}
                onChange={handleChangeInInput}
                required
              />{" "}
              {/* <h5>Choose Class</h5> */}
              {/* <Select
                onChange={handleChangeInInput}
                name="targetedClass"
                value={course.targetedClass}
                required
              >
                <MenuItem value="Default">Choose Class </MenuItem>
                <MenuItem value="TBA">To Be Assigned </MenuItem>
                {classList?.map((classItem) => (
                  <MenuItem key={classItem.classId} value={classItem.classId}>
                    {classItem.className}
                  </MenuItem>
                ))}
              </Select>{" "}
              <h5>Choose Instructors</h5>  
              <br /> <br />
              <Select
                onChange={handleChangeInInput}
                name="courceInstructor"
                value={course.courceInstructor}
                required
              >
                <MenuItem value="Default">Choose Instructors </MenuItem>
                <MenuItem value="TBA">To Be Assigned </MenuItem>
                {Employees.map((Employee) => {
                  console.log("Employee", Employee);
                  return (
                    <MenuItem value={Employee.teachersId}>
                      {Employee.teachersName}{" "}
                    </MenuItem>
                  );
                })}
              </Select> */}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {!Processing ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                sx={{ ...useStyles, submitButton: true }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            ) : (
              <ProcessingButton />
            )}
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default CourseRegistrationForm;
