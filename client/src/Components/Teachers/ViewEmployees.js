import axios from "axios";
import React, { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteEmployees from "./DeleteEmployees";
import EditEmployees from "./EditEmployees";
import { useMyContext } from "../Redux/ContextWrapper";
const ServeAddress = process.env.REACT_APP_SERVER;
export let getEmployees = async () => {
  let getEmployeesResult = await axios.get(ServeAddress + "/staffs/employees");
  let { Messages } = getEmployeesResult.data;
  console.log("Messages", Messages);
  return Messages;
};

function ViewEmployees({ employeesInfo }) {
  let { Employees, setEmployees } = useMyContext();
  let fetchData = async () => {
    let Messages = await getEmployees();
    setEmployees(Messages);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [employeesData, setEmployeesData] = useState({
    openDelete: false,
    openEdit: false,
    Employee: {},
  });

  return (
    <>
      {employeesData.openDelete && (
        <DeleteEmployees
          employeesInfo={{
            employeesData,
            setEmployeesData,
            fetchData,
          }}
        />
      )}{" "}
      {employeesData.openEdit && (
        <EditEmployees
          employeesInfo={{
            employeesData,
            setEmployeesData,
            getEmployees,
          }}
        />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Employees.map((Employee, index) => (
              <TableRow key={index}>
                <TableCell>{Employee.teachersId}</TableCell>
                <TableCell>{Employee.teachersName}</TableCell>
                <TableCell>{Employee.teachersemail}</TableCell>
                <TableCell>{Employee.teachersPhoneNumber}</TableCell>
                <TableCell>{Employee.Descriptions}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setEmployeesData({
                        openDelete: false,
                        openEdit: true,
                        Employee: Employee,
                      });
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setEmployeesData({
                        openDelete: true,
                        openEdit: false,
                        Employee: Employee,
                      });
                    }}
                  >
                    <Delete color="error" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ViewEmployees;
