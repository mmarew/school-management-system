import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DeleteCources from "./DeleteCources";
import EditCources from "./EditCources";
import { useMyContext } from "../Redux/ContextWrapper";
let ServeAddress = process.env.REACT_APP_SERVER;
export let getCourses = async () => {
  let response = await axios.get(ServeAddress + "/cources/cources");
  let { Messages } = response.data;

  // console.log("Messages", Messages);
  return Messages;
};
function ViewCourses() {
  let {
    classList,
    Courses,
    setCourses,
    Employees,
    classAndTeachers,
    classAndCources,
  } = useMyContext();
  let fetchData = async () => {
    let Messages = await getCourses();
    console.log("Messages");
    setCourses(Messages);
  };
  useEffect(() => {
    fetchData();
  }, []);
  let data = {
    openEdit: false,
    openDelete: false,
    Courses: {},
  };
  const [courceData, setcourceData] = useState(data);
  let findCourceClass = (courceId) => {
    if (courceId == "Default" || courceId == "TBA") {
      return "To Be Assigned";
    }
    console.log("classAndCourcesclassAndCources", classAndCources);
    let classesId = [];
    for (let i = 0; i < classAndCources.length; i++) {
      if (classAndCources[i].courceId == courceId) {
        classesId.push(classAndCources[i].classId);
      }
    }
    let classNames = [];
    classesId.map((ID) => {
      classList.map((Lists) => {
        console.log("Lists===", Lists);
        let { classId, className } = Lists;
        if (classId == ID) {
          classNames.push(className);
        }
      });
      console.log("ID", ID);
    });

    return classNames.join();
  };
  let findCourceInstructor = (courcesId) => {
    console.log(
      "courcesId",
      courcesId,
      " classAndTeachers==",
      classAndTeachers
    );
    // return "lll";
    let Teachers = [];
    for (let i = 0; i < classAndTeachers.length; i++) {
      if (classAndTeachers[i].courceId == courcesId) {
        Teachers.push(classAndTeachers[i].teachersName);
      }
    }
    return Teachers.join();
  };
  return (
    <div>
      {courceData.openDelete && (
        <DeleteCources data={{ courceData, setcourceData, fetchData }} />
      )}{" "}
      {courceData.openEdit && (
        <EditCources data={{ courceData, setcourceData, fetchData }} />
      )}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Course Instructor</TableCell>
                <TableCell>Targeted Class</TableCell>{" "}
                <TableCell>Edit</TableCell> <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log("Courses", Courses)}
              {Courses?.map((Course, index) => (
                <TableRow key={"Course_" + index}>
                  <TableCell>{Course.courceName}</TableCell>
                  <TableCell>
                    {findCourceInstructor(Course.courcesId)}
                  </TableCell>
                  <TableCell>{findCourceClass(Course.courcesId)}</TableCell>{" "}
                  <TableCell>
                    <Button
                      onClick={() => {
                        setcourceData({
                          ...courceData,
                          openEdit: true,
                          Courses: Course,
                        });
                      }}
                    >
                      <Edit />
                    </Button>
                  </TableCell>{" "}
                  <TableCell>
                    <Button
                      onClick={() => {
                        setcourceData({
                          ...courceData,
                          openDelete: true,
                          Courses: Course,
                        });
                      }}
                      color="error"
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default ViewCourses;
