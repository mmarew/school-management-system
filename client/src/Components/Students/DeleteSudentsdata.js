import { Button, Modal } from "@mui/material";
import axios from "axios";
import React from "react";
import { useMyContext } from "../Redux/ContextWrapper";
function DeleteSudentsdata({
  EditStudentsData,
  setEditStudentsData,
  getSudentsData,
}) {
  let ServeAddress = process.env.REACT_APP_SERVER;
  let { classList, setClassList, StudentsData, setStudentsData } =
    useMyContext();
  let handleDeleteAction = async (e) => {
    setEditStudentsData((previousdata) => ({ ...previousdata, Delete: false }));

    let { Data } = EditStudentsData;
    console.log(Data);
    let Responces = await axios.post(
      ServeAddress + "/students/deleteStudentsData",
      { Data }
    );
    console.log("Responces", Responces.data);
    let { Messages, error } = Responces.data;
    let results = await getSudentsData();
    setStudentsData(results);

    if (Messages == "success") {
      alert("Success");
    } else if (Messages == "error") {
      alert(error);
    }
  };
  let handleCancilation = () => {
    setEditStudentsData((previousdata) => ({ ...previousdata, Delete: false }));
  };

  return (
    <Modal open={EditStudentsData.Delete}>
      <div
        style={{
          backgroundColor: "white",
          maxWidth: "400px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          padding: "20px",
        }}
      >
        <h3>Are you sure to delete this data?</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button color="error" onClick={handleDeleteAction}>
            Delete
          </Button>
          <Button onClick={handleCancilation}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteSudentsdata;
