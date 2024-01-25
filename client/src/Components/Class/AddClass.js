import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function AddClass() {
  let className = { className: "" };
  const [formdData, setformdData] = useState(className);
  const ServeAddress = process.env.REACT_APP_SERVER;
  let handleChangeInForm = (e) => {
    setformdData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  let handleFormSubmit = async (e) => {
    e.preventDefault();
    let Responces = await axios.put(
      ServeAddress + "/class/class?data=" + JSON.stringify(formdData)
    );
    let { Messages } = Responces.data;
    alert(Messages);
    if (Messages == "error") {
      return;
    }
    if (Messages == "fail") {
    }
    if (Messages == "success") {
    }
    setformdData(className);
    console.log("Responces", Responces.data);
  };
  return (
    <div>
      <form
        style={{
          padding: "30px",
          margin: "auto",
          width: "300px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleFormSubmit}
      >
        <span>Form To register class</span>
        <br />
        <TextField
          onChange={handleChangeInForm}
          value={formdData.className}
          name="className"
          label="Class Name"
        />{" "}
        <br />
        <Button variant="contained" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
}

export default AddClass;
