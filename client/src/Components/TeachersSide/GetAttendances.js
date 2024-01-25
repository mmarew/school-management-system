import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import updat_Present_Absent from "./updat_Present_Absent";
import ProcessingButton from "../Utilities/ProcessingButton";
import SuccessErrorToast from "../Utilities/SuccessErrorToast";
import ViewAttendances from "./ViewAttendances";
import { useMyContext } from "../Redux/ContextWrapper";
import { CurrentYMD } from "../Utilities/DateFormatter";

const ServeAddress = process.env.REACT_APP_SERVER;

function GetAttendances() {
  const [attendanceDate, setAttendanceDate] = useState(null);
  const [requiredData, setRequiredData] = useState({
    data: [],
    teachersClass: [],
  });
  const [userId, setuserId] = useState(localStorage.getItem("userId"));

  const [attendancesData, setAttendancesData] = useState([]);
  const [actionMessages, setActionMessages] = useState({
    Error: null,
    Success: null,
  });
  let {
    classList,
    Employees,
    Role,
    classAndTeachers,
    setclassAndTeachers,
    classAndCources,
  } = useMyContext();
  const [formData, setFormData] = useState({
    courceId: "",
    classId: "",
    attendanceDate: CurrentYMD,
    teachersId: localStorage.getItem("userId"),
  });

  let handleInputChanges = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  let fiterClassAndCourcesToTeachers = () => {
    setuserId(localStorage.getItem("userId"));
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
  let getAttendancesData = async (e) => {
    try {
      if (e) e.preventDefault();
      console.log("formData", formData);
      setProcessing(true);
      let response = await axios.get(ServeAddress + "/attendance", {
        headers: formData,
      });
      setProcessing(false);
      let { Messages } = response.data;
      // return;
      if (Messages.length == 0) {
        setActionMessages({
          Error: "No data found",
          Success: null,
        });
      }
      setAttendancesData(Messages);
      console.log("Messages @getAttendancesData", Messages);
    } catch (error) {
      setActionMessages({
        Error: error.message,
        Success: null,
      });
      setProcessing(false);
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fiterClassAndCourcesToTeachers();
    getAttendancesData();
  }, []);
  const [Processing, setProcessing] = useState(false);

  return (
    <div>
      <form
        style={{
          backgroundColor: "white",
          padding: "30px",
          width: "300px",
          margin: "30px auto",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={getAttendancesData}
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
        {!Processing ? (
          <TextField
            name="attendanceDate"
            required
            onChange={(e) => {
              handleInputChanges(e);
              // setAttendanceDate(e.target.value);
            }}
            type="date"
            value={formData.attendanceDate}
          />
        ) : (
          <ProcessingButton />
        )}
        <Button variant="contained" sx={{ marginTop: "30px" }} type="submit">
          Get Attendances
        </Button>
      </form>
      {attendancesData.length > 0 && (
        <ViewAttendances
          getAttendancesData={getAttendancesData}
          attendancesData={attendancesData}
          setAttendancesData={setAttendancesData}
        />
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

export default GetAttendances;
