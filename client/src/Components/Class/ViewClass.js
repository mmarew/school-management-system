import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import RemoveClass from "./RemoveClass";
import EditClass from "./EditClass";
import { useMyContext } from "../Redux/ContextWrapper";
import AddTeacherToClass from "../Combinations/AddTeacherAndCourcesToClass";
import TeachersInClass from "./TeachersInClass";
import CourcesInClass from "./CourcesInClass";
const ServeAddress = process.env.REACT_APP_SERVER;
export const GetClass = async () => {
  try {
    const response = await axios.get(ServeAddress + "/class/class/");
    const { Messages } = response.data;
    return Messages;
  } catch (error) {
    console.error("Error retrieving class data", error);
  }
};
function ViewClass() {
  let {
    classAndTeachers,
    setclassAndTeachers,
    StudentsData,
    setStudentsData,
    classList,
    setClassList,
    Courses,
    classAndCources,
    setCourses,
    Employees,
    setEmployees,
  } = useMyContext();
  let getNumberOfStudents = (classId) => {
    console.log("StudentsData", StudentsData, " classId", classId);
    let targetedStudents = StudentsData.filter((student) => {
      return classId == student.Grade;
    });
    console.log("targetedStudents", targetedStudents);
    return targetedStudents.length;
  };

  const [viewTeachers, setviewTeachers] = useState({
    Open: false,
    Teachers: [],
  });
  const [viewCources, setviewCources] = useState({ Open: false, Cources: [] });

  let getNumberOfCources = (classId) => {
    // return "llll";
    // console.log("@Courses", Courses);
    let targetedCources = classAndCources.filter((data) => {
      console.log("getNumberOfCources Cource", data, " classId == ", classId);
      return data.classId == classId;
    });
    return (
      <Button
        onClick={() => {
          setviewCources({ Open: true, Cources: targetedCources });
        }}
      >
        {targetedCources.length}
      </Button>
    );
  };
  let getNumberOfTeachers = (classId) => {
    // console.log("classAndTeachers===", classAndTeachers, " classId", classId);
    let requiredData = [];
    classAndTeachers.map((CT) => {
      console.log("CT", CT);
      if (CT.classId == classId) {
        requiredData.push(CT);
      }
    });
    return (
      <Button
        onClick={() => {
          setviewTeachers({ Open: true, Teachers: requiredData });
          console.log("requiredData", requiredData);
          return requiredData;
        }}
      >
        {requiredData.length}
      </Button>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      const messages = await GetClass();
      setClassList(messages);
    };

    fetchData();
  }, []);
  let employeeData = {
    openEdit: false,
    openDelete: false,
    Employee: {},
  };
  const [selectedEmployee, setSelectedEmployee] = useState({ ...employeeData });
  const [assignTeachersToClass, setassignTeachersToClass] = useState({
    Open: false,
    Class: {},
  });

  return (
    <>
      {<CourcesInClass data={{ viewCources, setviewCources }} />}
      {<TeachersInClass data={{ viewTeachers, setviewTeachers }} />}

      {selectedEmployee.openDelete ? (
        <RemoveClass
          data={{ GetClass, selectedEmployee, setSelectedEmployee }}
        />
      ) : selectedEmployee.openEdit ? (
        <EditClass data={{ GetClass, selectedEmployee, setSelectedEmployee }} />
      ) : (
        ""
      )}
      {assignTeachersToClass.Open && (
        <AddTeacherToClass
          data={{ assignTeachersToClass, setassignTeachersToClass }}
        />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell> Students</TableCell>
              <TableCell> Teachers</TableCell>
              <TableCell>Cources</TableCell>
              <TableCell>Assign</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classList?.map((classItem, index) => (
              <TableRow key={classItem.classId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{classItem.className}</TableCell>
                <TableCell>{getNumberOfStudents(classItem.classId)}</TableCell>
                <TableCell>{getNumberOfTeachers(classItem.classId)}</TableCell>
                <TableCell>{getNumberOfCources(classItem.classId)}</TableCell>
                <TableCell>
                  {" "}
                  <Button
                    onClick={() =>
                      setassignTeachersToClass(() => {
                        return { Open: true, Class: classItem };
                      })
                    }
                    sx={{ fontSize: "30px" }}
                    size="small"
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setSelectedEmployee({
                        ...employeeData,
                        openEdit: true,
                        Employee: classItem,
                      });
                    }}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setSelectedEmployee({
                        ...employeeData,
                        openDelete: true,
                        Employee: classItem,
                      });
                    }}
                    color="error"
                  >
                    <DeleteIcon />
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

export default ViewClass;
