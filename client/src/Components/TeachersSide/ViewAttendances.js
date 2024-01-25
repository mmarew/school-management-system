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

const ServeAddress = process.env.REACT_APP_SERVER;

function ViewAttendances({
  attendancesData,
  setAttendancesData,
  getAttendancesData,
}) {
  //   const [attendancesData, setAttendancesData] = useState([]);
  const [actionMessages, setActionMessages] = useState({
    Error: null,
    Success: null,
  });

  const [Processing, setProcessing] = useState(false);
  let handleInputChanges = async (e, data, index) => {
    let { name, value } = e.target;
    console.log("first");
    setAttendancesData((prev) => {
      const updatedData = [...prev];
      updatedData[index].attendancesStatus = value;
      return updatedData;
    });
    // return;
    try {
      await updat_Present_Absent({
        getAttendancesData,
        data,
        action: value,
        setProcessing,
        setActionMessages,
      });
    } catch (error) {}
  };
  return (
    <div>
      {" "}
      <TableContainer sx={{ bgcolor: "white" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendancesData?.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  {!Processing ? (
                    <Select
                      value={data.attendancesStatus}
                      onChange={(e) => handleInputChanges(e, data, index)}
                      sx={{ width: "150px" }}
                      fullWidth
                    >
                      <MenuItem value="Default">Choose</MenuItem>
                      <MenuItem value="Present">Present</MenuItem>
                      <MenuItem value="Absent"> Absent</MenuItem>
                    </Select>
                  ) : (
                    <ProcessingButton />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

export default ViewAttendances;
