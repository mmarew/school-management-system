import { Button, Chip, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProcessingButton from "../Utilities/ProcessingButton";
import { useMyContext } from "../Redux/ContextWrapper";
import { CurrentYMD } from "../Utilities/DateFormatter";
import SuccessErrorToast from "../Utilities/SuccessErrorToast";
const ServeAddress = process.env.REACT_APP_SERVER;
function GenerateAttendances() {
  const [actionMessages, setActionMessages] = useState({
    Error: null,
    Success: null,
  });
  const [userId, setuserId] = useState(localStorage.getItem("userId"));
  let {
    classList,
    Employees,
    Role,
    classAndTeachers,
    setclassAndTeachers,
    classAndCources,
  } = useMyContext();
  const [requiredData, setRequiredData] = useState({
    data: [],
    teachersClass: [],
  });
  const [Processing, setProcessing] = useState(false);
  const [errorMessages, seterrorMessages] = useState(null);

  let generateAttendances = async () => {
    console.log("formData", formData);
    // return;
    try {
      setProcessing(true);
      let Results = await axios.post(ServeAddress + "/attendance", {
        ...formData,
      });
      let { Messages } = Results.data;
      setProcessing(false);
      console.log("Messages", Messages);
      // alert(Messages);

      setActionMessages((prev) => {
        return { ...prev, Error: Messages, Success: null };
      });
    } catch (error) {
      setProcessing(false);
      console.log("error", error);
      seterrorMessages(error.message);
    }
  };

  let fiterClassAndCourcesToTeachers = () => {
    setuserId(localStorage.getItem("userId"));
    // getData();
    // Employees, classAndTeachers;
    console.log("classAndCources", classAndCources);
    let data = [];
    classAndCources.map((CT) => {
      console.log("userId", userId);
      console.log("CT", CT);
      let { teachersId } = CT;
      if (userId == teachersId) {
        data.push(CT);
      }
    });
    console.log("classList", classList);
    console.log("classCource", data);
    let teachersClass = [];
    data.map((classCource) => {
      let { classId } = classCource;
      classList.map((list) => {
        console.log("list", list);
        if (list.classId == classId) {
          teachersClass.push(list);
        }
      });
    });
    setRequiredData({ data, teachersClass });
  };
  useEffect(() => {
    fiterClassAndCourcesToTeachers();
  }, [classAndTeachers, userId]);

  const [formData, setFormData] = useState({
    courceId: "",
    classId: "",
    attendanceDate: CurrentYMD,
  });
  let handleInputChanges = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div
      style={{
        width: "300px",
        margin: "20px auto",
        backgroundColor: "white",
        padding: "20px 30px",
      }}
    >
      <label>Select Class </label>
      <Select
        required
        name="classId"
        value={formData.classId}
        fullWidth
        onChange={handleInputChanges}
      >
        {requiredData.teachersClass.map((TC, index) => {
          // let teachersId = TC.teachersId;
          {
            console.log("TeacherC", TC);
          }
          return (
            <MenuItem
              key={"className_" + index}
              sx={{ width: "100%" }}
              value={TC.classId}
            >
              {TC.className}
            </MenuItem>
          );
        })}
      </Select>
      <br /> <br />
      <label>Select Cource </label>
      <Select
        required
        name="courceId"
        value={formData.courceId}
        fullWidth
        onChange={(e) => {
          // teachersId;
          setFormData((prev) => {
            return { ...prev, teachersId: requiredData.data[0].teachersId };
          });
          handleInputChanges(e);
        }}
      >
        {requiredData.data.map((d, index) => {
          console.log("d.courceName", d);
          return (
            <MenuItem
              key={"menueIndex_" + index}
              sx={{ width: "100%" }}
              value={d.courceId}
            >
              {d.courceName}
            </MenuItem>
          );
        })}
      </Select>
      <br /> <br />
      <TextField
        required
        type="date"
        label="Date"
        name="attendanceDate"
        value={formData.attendanceDate}
        fullWidth
        onChange={handleInputChanges}
      />
      {console.log("classAndTeachers===", classAndTeachers)}
      {!Processing ? (
        <Button
          sx={{
            marginTop: "30px !important",
            backgroundColor: "#1976d2 !important",

            color: "white !important",
            padding: "6px 0 !important",
          }}
          fullWidth
          variant="contained"
          onClick={generateAttendances}
        >
          Generate Attendance
        </Button>
      ) : (
        <ProcessingButton />
      )}
      {errorMessages ? (
        <div style={{ margin: "30px auto" }}>
          <Chip label={errorMessages} variant="contained" />
        </div>
      ) : (
        ""
      )}
      {actionMessages.Error && (
        <SuccessErrorToast
          setActionMessages={setActionMessages}
          errorMessage={actionMessages.Error}
        />
      )}
      {actionMessages.Success && (
        <SuccessErrorToast
          setActionMessages={setActionMessages}
          successMessage={actionMessages.Success}
        />
      )}
    </div>
  );
}

export default GenerateAttendances;
