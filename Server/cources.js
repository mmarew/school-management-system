let { Pool } = require("./Database");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
router.post("/cources", async (req, res) => {
  try {
    console.log("req", req.body);
    let { courceName } = req.body;
    let select = `select * from cources where courceName='${courceName}'`;
    let [results1] = await Pool.query(select);
    if (results1.length > 0) {
      return res.json({ Messages: "Registered before" });
    }
    let insert = `insert into cources(courceName) values('${courceName}')`;
    let [results] = await Pool.query(insert);

    let { affectedRows } = results;
    if (affectedRows > 0) res.json({ Messages: "success" });
    else res.json({ Messages: "fail" });
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.put("/cources", async (req, res) => {
  try {
    console.log("@put req.body", req.body);

    let { courcesId, courceName, targetedClass, courceInstructor } = req.body;
    let update = `update cources set courceName='${courceName}',     targetedClass='${targetedClass}', courceInstructor='${courceInstructor}'
      where courcesId='${courcesId}'`;
    console.log("update", update);
    // return;
    // courceInstructor, targetedClass;
    let [results] = await Pool.query(update);
    let { affectedRows } = results;
    if (affectedRows > 0) {
      res.json({ Messages: "success" });
    } else {
      res.json({ Messages: "fail" });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
  // res.json({ Messages: "connected" });
});
router.delete("/cources", async (req, res) => {
  try {
    let { courcesId } = req.body;
    console.log("req.body", req.body);
    let deleteCources = `delete from cources where courcesId='${courcesId}'`;
    let [results] = await Pool.query(deleteCources);
    if (results.affectedRows > 0) {
      res.json({ Messages: "success" });
    } else {
      res.json({ Messages: "fail" });
    }
  } catch (error) {
    res.json({ Messages: "error" });
    console.log("error", error);
  }
  //  res.json({ Messages: "connected" });
});
router.get("/cources", async (req, res) => {
  try {
    let select = `select * from cources`;
    let [Responces] = await Pool.query(select);
    res.json({ Messages: Responces });
  } catch (error) {
    res.json({ Messages: "error" });
  }
});
module.exports = router;
