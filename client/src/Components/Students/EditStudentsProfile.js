import { Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DateFormatter } from "../Utilities/DateFormatter";
import axios from "axios";
import { useMyContext } from "../Redux/ContextWrapper";
function EditStudentsProfile({
  getSudentsData,
  setEditStudentsData,
  EditStudentsData,
}) {
  let { classList, setStudentsData } = useMyContext();
  console.log("EditStudentsData.Data", EditStudentsData.Data);
  const [editedData, setEditedData] = useState({ ...EditStudentsData.Data });
  let ServeAddress = process.env.REACT_APP_SERVER;
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  let handleSave = async (e) => {
    e.preventDefault();
    console.log("editedData", editedData);

    const formData = new FormData();
    formData.append("file", file); // Append the file to the form data
    formData.append("editedData", JSON.stringify(editedData)); // Append other data as needed

    try {
      setProcessing(true);
      const response = await axios.post(
        ServeAddress + "/students/updateStudentsData",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );

      setProcessing(false);
      let results = await getSudentsData();
      setStudentsData(results);
      setEditStudentsData((prev) => {
        return { prev, Edit: false };
      });
      // console.log("responces", response.data);
      let { Messages, error } = response.data;
      if (Messages == "success") {
        alert(Messages);
      } else if (Messages == "error") {
        alert(error);
      }
    } catch (error) {
      alert(error);
    }
  };
  let handleChange = (e) => {
    let { name, value } = e.target;
    setEditedData((previousState) => ({ ...previousState, [name]: value }));
  };
  const [Processing, setProcessing] = useState(false);

  return (
    <div>
      <Modal open={EditStudentsData.Edit}>
        <div
          style={{
            backgroundColor: "white",
            width: "80%",
            padding: "10px",
            maxWidth: "400px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          className="modal-container"
        >
          <div
            style={{
              padding: "10px",

              display: "flex",
              justifyContent: "space-between",
              maxHeight: "90vh",
              overflowY: "scroll",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Edit Data</h2>
              <Button
                onClick={() => {
                  setEditStudentsData((prev) => ({
                    ...prev,
                    delete: false,
                    Edit: false,
                  }));
                }}
              >
                <CloseIcon color="error" />
              </Button>
            </div>
            <form onSubmit={handleSave}>
              <TextField
                label="Name"
                name="name"
                value={editedData.name}
                onChange={handleChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={DateFormatter(editedData.dateOfBirth)}
                onChange={handleChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Address"
                name="address"
                value={editedData.address}
                onChange={handleChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Contact Number"
                name="contactNumber"
                value={editedData.contactNumber}
                onChange={handleChange}
                fullWidth
              />
              <br />
              <br />
              <span>Select Grade</span>
              <br /> <br />
              <Select
                required
                label="Grade"
                name="Grade"
                onChange={handleChange}
                fullWidth
                margin="normal"
                value={editedData.Grade}
              >
                <MenuItem value="Default">Choose Grade</MenuItem>
                {classList.map((classItem) => (
                  <MenuItem key={classItem.classId} value={classItem.classId}>
                    {classItem.className}
                  </MenuItem>
                ))}
              </Select>
              {/* 
              <TextField
                label="Grade"
                name="Grade"
                value={editedData.Grade}
                onChange={handleChange}
                fullWidth
              /> */}
              <br />
              <br />
              <TextField
                label="Mother's Full Names"
                name="mothersFullNames"
                value={editedData.mothersFullNames}
                onChange={handleChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Name Of Relatives"
                name="nameOfRelatives"
                value={editedData.nameOfRelatives}
                onChange={handleChange}
                fullWidth
              />
              <br />
              <br />
              {/* {row.relativeAddress} */}
              <TextField
                label="Relative Address"
                name="relativeAddress"
                value={editedData.relativeAddress}
                onChange={handleChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Relative Phone"
                name="relativePhone"
                value={editedData.relativePhone}
                onChange={handleChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Relationship"
                name="Relationship"
                value={editedData.Relationship}
                onChange={handleChange}
                fullWidth
              />
              <br />
              <br />
              <input
                onChange={handleFileChange}
                type="file"
                name="studentsImg"
              />{" "}
              <br />
              <br />
              {!Processing ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
              ) : (
                <Button disabled>Processing</Button>
              )}
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditStudentsProfile;
