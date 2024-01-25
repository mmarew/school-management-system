let { Pool } = require("./Database");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { registerUsersInUsertTable } = require("./Register");

router.get("/", (req, res) => {
  res.json({ data: "Connected" });
});
let getTeachers = async (email, phoneNumber) => {
  try {
    let selectTeachers = `select * from teachers where teachersemail='${email}' or teachersPhoneNumber='${phoneNumber}'`;
    if (email == "All" || phoneNumber == "All") {
      selectTeachers = `select * from teachers`;
    }
    let [resultsOfSelect] = await Pool.query(selectTeachers);
    return resultsOfSelect;
  } catch (error) {
    console.log("error", error);
    return "error";
  }
};
router.post("/employees", async (req, res) => {
  console.log("req.body=====", req.body);
  // return;
  try {
    let = { name, email, phoneNumber, Descriptions } = req.body;
    let resultsOfSelect = await getTeachers(email, phoneNumber);
    if (resultsOfSelect == "error") {
      return res.json({ Messages: "error" });
    }
    if (resultsOfSelect.length > 0) {
      return res.json({ Messages: "registered before" });
    }
    let values = [name, phoneNumber, email, Descriptions];

    let registerStaffs = `insert into teachers(teachersName, teachersPhoneNumber,teachersemail, Descriptions) values(?, ?, ?, ?)`;
    let [results] = await Pool.query(registerStaffs, values);
    let { affectedRows, insertId } = results;
    console.log("results", results);
    if (affectedRows > 0) {
      req.body.insertId = insertId;
      registerUsersInUsertTable(req, res);
    } else {
      res.json({ Messages: "unable to register" });
    }

    console.log("results", results);
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.get("/employees", async (req, res) => {
  let responces = await getTeachers("All", "All");
  console.log("responces", responces);

  res.json({ Messages: responces });
});
router.delete("/employees", async (req, res) => {
  try {
    let { Employee } = req.query;
    Employee = JSON.parse(Employee);
    let { teachersId } = Employee;
    let deleteTeachers = `delete from teachers where teachersId='${teachersId}' `;
    let [responces] = await Pool.query(deleteTeachers);
    let { affectedRows } = responces;
    if (affectedRows > 0) {
      res.json({ Messages: "success" });
    } else {
      res.json({ Messages: "fail" });
    }

    console.log("responces", responces);

    //   {  teachersId: 2,
    //   teachersName: 'Marew Masresha Abate',
    //   teachersPhoneNumber: ' 251922112480',
    //   teachersemail: 'mmarew@gmail.com',
    //   Descriptions: 'nmnmn'
    // }
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.put("/updateStaffs", async (req, res) => {
  try {
    console.log("req", req.body);
    let { Employee } = req.body;
    let {
      Descriptions,
      teachersId,
      teachersName,
      teachersPhoneNumber,
      teachersemail,
    } = Employee;
    console.log(
      Descriptions,
      teachersId,
      teachersName,
      teachersPhoneNumber,
      teachersemail
    );

    let Update = `update teachers set Descriptions=?, 
    teachersName=?,
    teachersPhoneNumber=?,
    teachersemail=? where teachersId=?`;
    let values = [
      Descriptions,
      teachersName,
      teachersPhoneNumber,
      teachersemail,
      teachersId,
    ];
    let [results] = await Pool.query(Update, values);
    console.log("results", results);
    let { affectedRows } = results;
    if (affectedRows > 0) {
      res.json({ Messages: "sucess" });
    } else {
      res.json({ Messages: "fail" });
    }
    // res.json({ data: "updateStaffs" });
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
module.exports = router;
