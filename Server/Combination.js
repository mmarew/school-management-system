let { Pool } = require("./Database");
const express = require("express");
const router = express.Router();
router.post("/addTeachersToClass", async (req, res) => {
  let { classId, selectedTeachers, selectedCources } = req.body;
  console.log("req.body", req.body);
  console.log("classId===", classId, ", selectedTeachers===", selectedTeachers);
  // return;
  try {
    let verifyExistance = async () => {
      let select = `select * from classAndTeachersAndCources where teachersId='${selectedTeachers}' and classId='${classId}' and courceId='${selectedCources}'`;
      let [responces] = await Pool.query(select);
      return responces.length;
    };
    let registered = await verifyExistance();
    console.log("registered", registered);
    if (registered > 0) {
      return res.json({ Messages: "registered before" });
    }
    let Insert = `INSERT INTO classAndTeachersAndCources (teachersId, classId, courceId) VALUES ('${selectedTeachers}', '${classId}', '${selectedCources}')`;
    let [results] = await Pool.query(Insert);
    if (results.affectedRows > 0) {
      return res.json({ Messages: "success" });
    }
    {
      res.json({ Messages: "fail" });
    }

    console.log("results", results);
    console.log("req.body", req.body);
  } catch (error) {
    console.log("error", error);
    res.json({
      Messages: "error",
    });
  }
});
router.get("/classTeachersCources", async (req, res) => {
  let Select = `SELECT * FROM classAndTeachersAndCources JOIN teachers ON teachers.teachersId = classAndTeachersAndCources.teachersId`;
  let [responces] = await Pool.query(Select);
  console.log("classTeachersCources responces", responces);
  res.json({ Messages: responces });
});
router.delete("/", (req, res) => {
  console.log("req.body", req.body);
  res.json({ Messages: "connected" });
});
router.get("/getClassandCources", async (req, res) => {
  try {
    let select =
      "select * from classAndTeachersAndCources join cources on classAndTeachersAndCources.courceId=cources.courcesId";
    let [results] = await Pool.query(select);
    res.json({ Messages: results });
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.put("/", (req, res) => {
  console.log("req.body", req.body);
  res.json({ Messages: "connected" });
});

module.exports = router;
