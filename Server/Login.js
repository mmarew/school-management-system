let { Pool } = require("./Database");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
require("dotenv").config();
var jwt = require("jsonwebtoken");
let tokenKey = process.env.tokenKey;

router.post("/", (req, res) => {
  let { phoneNumber, Password } = req.body;
  let isAvailable = false;
  try {
    loginData.map((Data) => {
      let { Phone, Pass } = Data;
      if (Phone == phoneNumber && Password == Pass) {
        isAvailable = true;
      }
    });
    if (isAvailable) {
      res.json({ Messages: "success" });
    } else {
      res.json({ Messages: "fail" });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.get("/", async (req, res) => {
  try {
    // let { formData } = req.headers;
    let { phonenumber, password, role } = req.headers;
    console.log("req.headers", req.headers);
    let selectUser = ``;
    console.log(
      "phoneNumber",
      phonenumber,
      " Password",
      password,
      " Role",
      role
    );
    // return;
    phonenumber = phonenumber.replace("%2B", "+");
    console.log("phoneNumber=======", phonenumber);
    let verifyPasswordRoleAndUserId = async (userId, Password, Role) => {
      let verifyInUsers = `select * from usersTable where userId = '${userId}' and password = '${Password}' and role = '${Role}'`;
      // console.log("verifyInUsers", verifyInUsers);
      let [results2Verify] = await Pool.query(verifyInUsers);
      if (results2Verify.length == 0) {
        return res.json({
          Messages: "You are not a user in this password and role ",
        });
      }

      var token = jwt.sign({ userId: userId }, tokenKey);
      console.log("token", token);
      // return;
      res.json({ Messages: "success", Token: token, userId });
    };
    if (role == "Teacher") {
      selectUser = `select * from teachers where teachersPhoneNumber='${phonenumber}'`;
      let [responces] = await Pool.query(selectUser);
      if (responces.length == 0) {
        return res.json({
          Messages: "This teacher is not registered in this phone number",
        });
      }
      let { teachersId } = responces[0];
      verifyPasswordRoleAndUserId(teachersId, password, role);
    } else if (role == "Admin") {
      let select = `select * from admin where adminPhone='${phonenumber}'`;
      let [Responces] = await Pool.query(select);
      console.log("Responces", Responces);
      if (Responces.length == 0) {
        return res.json({
          Messages: "This admin is not registered in this phone",
        });
      }
      let { adminId } = Responces[0];
      verifyPasswordRoleAndUserId(adminId, password, role);
    } else if (role == "Student") {
      let select = `select * from  students where contactNumber='${phonenumber}'  `;
      let [Results] = await Pool.query(select);
      if (Results.length > 0) {
        console.log("Results", Results);
        let { id } = Results[0];
        verifyPasswordRoleAndUserId(id, password, role);
      } else {
        res.json({ Messages: "no student in this phone number" });
      }
    } else if (role == "Parent") {
      let select = `select * from parent where `;
      let Results = await Pool.query(select);
    }
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.delete("/", (req, res) => {
  res.json({ Messages: "Connected" });
});
router.put("/", (req, res) => {
  res.json({ Messages: "Connected" });
});
module.exports = router;
