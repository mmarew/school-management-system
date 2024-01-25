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
import React from "react";
import { useMyContext } from "../Redux/ContextWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
function CourcesInClass({ data }) {
  let { classAndCources, classAndTeachers } = useMyContext();
  const { viewCources, setviewCources } = data;
  const { Open, Cources } = viewCources;
  const handleClose = () => {
    setviewCources({ ...viewCources, Open: false });
  };
  Cources?.map((Cource, index) => {
    classAndTeachers?.map((teacher) => {
      if (Cource.courceId == teacher.courceId) {
        console.log(" teacher", teacher);
        console.log("Cource", Cource);
        Cource.teachersName = teacher.teachersName;
      }
    });
  });
  return (
    <Modal open={Open}>
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Teacher Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Cources?.map((Cource, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{Cource.courceName}</TableCell>
                <TableCell>{Cource.teachersName}</TableCell>
                <TableCell>
                  <Button>
                    <DeleteIcon color="error" variant="contained" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ textAlign: "center" }}>
          <Button
            onClick={handleClose}
            sx={{ margin: "20px auto", width: "80px" }}
            color="warning"
            variant="contained"
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CourcesInClass;
