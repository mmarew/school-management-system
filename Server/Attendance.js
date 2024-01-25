let { Pool } = require("./Database");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
let getAttandances = async (req, Sources) => {
  let { courceId, classId, attendanceDate, teachersId } = req.body;
  let { courceid, classid, attendancedate, teachersid } = req.headers;
  console.log(
    "courceid",
    courceId,
    " classid==",
    classId,
    " attendancedate==",
    attendanceDate
  );
  // return;
  console.log(
    "courceid",
    courceid,
    " classid==",
    classid,
    " attendancedate==",
    attendancedate
  );
  // return;
  let verifyIfCreated = `select * from attendanceTable where classidAttendances='${classId}' and  courcesIdAttendances='${courceId}' and attendanceDate='${attendanceDate}'`;
  if (Sources == "headers") {
    verifyIfCreated = `select * from attendanceTable join students on id=studentIdAttendances where classidAttendances='${classid}' and  courcesIdAttendances='${courceid}' and attendanceDate='${attendancedate}'`;
  }
  let [selectResult] = await Pool.query(verifyIfCreated);
  console.log("selectResult", selectResult);
  // return;
  return selectResult;
};
router.post("/", async (req, res) => {
  try {
    let { courceId, classId, attendanceDate, teachersId } = req.body;
    let selectResult = await getAttandances(req);
    if (selectResult == "error") {
      return res.json({ Messages: "Error" });
    }
    if (selectResult.length > 0) {
      return res.json({ Messages: "already created" });
    }
    console.log("req.body", req.body);
    let getStudents = `select id from students where Grade='${classId}'`;
    let [selectResults] = await Pool.query(getStudents);
    if (selectResults.length == 0) {
      return res.json({ Messages: "no students in this class" });
    }

    console.log("selectResults", selectResults);
    let id = selectResults[0].id;
    let insert = `insert into attendanceTable set  classidAttendances='${classId}',courcesIdAttendances='${courceId}',teachersIdAttendances='${teachersId}',studentIdAttendances='${id}',
    attendanceDate='${attendanceDate}'`;
    let [insertToStudents] = await Pool.query(insert);
    if (insertToStudents.affectedRows > 0) {
      return res.json({ Messages: "success" });
    } else {
      return res.json({ Messages: "fail" });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.get("/", async (req, res) => {
  let Responces = await getAttandances(req, "headers");
  res.json({ Messages: Responces });
});
router.put("/", async (req, res) => {
  try {
    let { attendanceId, attendancesStatus } = req.body;
    let update = `update attendanceTable set attendancesStatus='${attendancesStatus}' where attendanceId='${attendanceId}'`;
    let [results] = await Pool.query(update);
    if (results.affectedRows > 0) {
      return res.json({ Messages: "Success" });
    } else {
      return res.json({ Messages: "fail" });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({ Messages: "Error" });
  }
});
module.exports = router;
