let { Pool } = require("./Database");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
router.put("/class", async (req, res) => {
  console.log("req", req.query);
  try {
    let { data } = req.query;
    data = JSON.parse(data);
    console.log("data", data);
    let { className } = data;
    let insertClassName = "insert into Class (className)values(?)";
    let [insert] = await Pool.query(insertClassName, [className]);
    if (insert.affectedRows > 0) {
      res.json({ Messages: "success" });
    } else {
      res.json({ Messages: "fail" });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.get("/class", async (req, res) => {
  try {
    let getData = "select * from Class";
    let [responces] = await Pool.query(getData);
    return res.json({ Messages: responces });
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.put("/updateclass", async (req, res) => {
  try {
    console.log("req", req.body);
    let { className, classId } = req.body.Employee;
    let update = `update Class set className='${className}' where classId='${classId}'`;
    console.log("update", update);
    // return;
    let [result] = await Pool.query(update);
    if (result.affectedRows > 0) {
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
router.delete("/class", async (req, res) => {
  try {
    console.log("req.body ", req.body);
    let { className } = req.body;
    let { classId } = className;
    console.log("classId", classId);
    let deleteDataOfClass = `delete from Class where classId='${classId}'`;
    let [responces] = await Pool.query(deleteDataOfClass);
    if (responces.affectedRows > 0) return res.json({ Messages: "success" });
    else {
      res.json({ Messages: "fail" });
    }
  } catch (error) {
    res.json({ Messages: "error" });
    console.log("error", error);
  }
});

module.exports = router;
