import {
  CardMedia,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Edit, Delete } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DateFormatter } from "../Utilities/DateFormatter";
import EditStudentsProfile from "./EditStudentsProfile";
import DeleteStudentsdata from "./DeleteSudentsdata";
import ImageViewer from "../Utilities/ImageViewer";
import { useMyContext } from "../Redux/ContextWrapper";
let ServeAddress = process.env.REACT_APP_SERVER;
export let getSudentsData = async () => {
  let studentsData = await axios.get(
    ServeAddress + "/students/viewStudentsData"
  );
  let { message, error } = studentsData.data;
  if (message == "error") alert(error);
  return message;
};
function ViewStudentsData() {
  let { classList, setClassList, StudentsData, setStudentsData } =
    useMyContext();
  const [ImgViews, setImgViews] = useState({ IMG: "", Open: "" });

  let fetchData = async () => {
    let Messages = await getSudentsData();
    setStudentsData(Messages);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [EditStudentsData, setEditStudentsData] = useState({
    Data: [],
    Edit: false,
    Delete: false,
  });
  return (
    <div>
      {console.log("classList", classList)}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>IMG</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date&nbsp;Of&nbsp;Birth</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Mother's Full Names</TableCell>
              <TableCell>Name Of Relatives</TableCell>
              <TableCell>Relative Address</TableCell>
              <TableCell>Relative Phone</TableCell>{" "}
              <TableCell>Relationship</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {StudentsData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <CardMedia
                    onClick={() => {
                      setImgViews({
                        Open: true,
                        IMG: ServeAddress + "/uploads/" + row.studentsImage,
                      });
                    }}
                    sx={{ width: "30px", height: "30px", borderRadius: "50%" }}
                    component="img"
                    height={30}
                    image={ServeAddress + "/uploads/" + row.studentsImage}
                    alt={"students img"}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>

                <TableCell>{DateFormatter(row.dateOfBirth)}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.contactNumber}</TableCell>
                <TableCell>
                  {classList.map((List) => {
                    if (List.classId == row.Grade) return List.className;
                  })}
                </TableCell>
                <TableCell>{row.mothersFullNames}</TableCell>
                <TableCell>{row.nameOfRelatives}</TableCell>
                <TableCell>{row.relativeAddress}</TableCell>
                <TableCell>{row.relativePhone}</TableCell>
                <TableCell>{row.Relationship}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      setEditStudentsData({
                        Data: row,
                        Edit: true,
                        Delete: false,
                      })
                    }
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() =>
                      setEditStudentsData({
                        Data: row,
                        Edit: false,
                        Delete: true,
                      })
                    }
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {EditStudentsData.Edit && (
        <EditStudentsProfile
          getSudentsData={getSudentsData}
          EditStudentsData={EditStudentsData}
          setEditStudentsData={setEditStudentsData}
        />
      )}
      {EditStudentsData.Delete && (
        <DeleteStudentsdata
          getSudentsData={getSudentsData}
          EditStudentsData={EditStudentsData}
          setEditStudentsData={setEditStudentsData}
        />
      )}
      {ImgViews.Open && <ImageViewer data={{ ImgViews, setImgViews }} />}
    </div>
  );
}
export default ViewStudentsData;
