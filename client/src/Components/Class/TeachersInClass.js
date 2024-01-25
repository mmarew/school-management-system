import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import React from "react";
import { useMyContext } from "../Redux/ContextWrapper";

function TeachersInClass({ data }) {
  const { viewTeachers, setviewTeachers } = data;
  const { Teachers } = viewTeachers;
  let { classAndCources, classAndTeachers } = useMyContext();
  Teachers?.map((Teacher, index) => {
    classAndCources?.map((Cource) => {
      if (Teacher.courceId == Cource.courceId) {
        Teacher.courceName = Cource.courceName;
      }
    });
  });
  const handleClose = () => {
    setviewTeachers({ Open: false });
  };

  return (
    <Modal open={viewTeachers.Open}>
      <Box
        sx={{
          width: "500px",
          backgroundColor: "white",
          padding: "30px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Teacher's Name</TableCell>
              <TableCell>Cource Name </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Teachers?.map((Teacher, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{Teacher.teachersName}</TableCell>
                <TableCell>{Teacher.courceName}</TableCell>
                <TableCell>
                  <Button>
                    <DeleteIcon color="error" variant="contained" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Button variant="contained" onClick={handleClose} color="warning">
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default TeachersInClass;
