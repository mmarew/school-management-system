let { Pool } = require("./Database");
const express = require("express");
const router = express.Router();
let registerUsersInUsertTable = async (req, res) => {
  try {
    let { password, role, insertId } = req.body;
    console.log("req.body======", req.body);
    // return;
    let verifysql = `select * from usersTable where userId='${insertId}' and role='${role}'`;
    let [verifyResults] = await Pool.query(verifysql);
    if (verifyResults.length > 0)
      return res.json({
        Messages:
          "You cannot be registerd now. Because you are registered before",
      });

    console.log("req.body===", req.body);

    let Register = `insert into usersTable (userId,password,role) values('${insertId}','${password}','${role}' )`;
    let [Results] = await Pool.query(Register);
    console.log("Results", Results);
    if (Results.affectedRows > 0) {
      res.json({ Messages: "success" });
    } else {
      res.json({ Messages: "fail" });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "Connected" });
  }
};
router.post("/", async (req, res) => {
  registerUsersInUsertTable(req, res);
});
router.post("/admin", async (req, res) => {
  let { fullName, password, phoneNumber, role } = req.body;
  console.log("req.body", req.body);
  let Select = `select * from admin where  adminFullName='${fullName}' and adminPhone='${phoneNumber}' `;
  let [selectResuts] = await Pool.query(Select);
  if (selectResuts.length > 0) {
    return res.json({ Messages: "registered before" });
  }
  let insertRole = `insert into admin (adminFullName, adminPhone) values ('${fullName}','${phoneNumber}')`;
  // return;
  let [Responces] = await Pool.query(insertRole);
  let { insertId } = Responces;
  req.body.insertId = insertId;
  registerUsersInUsertTable(req, res);
});
router.put("/", (req, res) => {});
router.get("/", (req, res) => {});
router.delete("/", (req, res) => {});
module.exports.Register = router;
module.exports.registerUsersInUsertTable = registerUsersInUsertTable;
