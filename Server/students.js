let { Pool } = require("./Database");
const express = require("express");
const router = express.Router();

let { storage, upload } = require("./FileManagers");
const { registerUsersInUsertTable } = require("./Register");

router.post("/registerStudents", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    let image = file ? file.filename : null;
    const studentData = req.body;
    let {
      nameOfRelatives,
      relativeAddress,
      relativePhone,
      Relationship,
      name,
      dateOfBirth,
      address,
      contactNumber,
      selectedGrade,
      mothersFullNames,
      medicalInformations,
    } = req.body;
    const insertDataQuery = `
        INSERT INTO students (name, dateOfBirth, address, contactNumber, Grade, mothersFullNames,studentsImage,medicalInformations,nameOfRelatives,
      relativeAddress,
      relativePhone,
      Relationship)
        VALUES ('${name}', '${dateOfBirth}', '${address}', '${contactNumber}', '${selectedGrade}', '${mothersFullNames}','${image}','${medicalInformations}','${nameOfRelatives}','${relativeAddress}','${relativePhone}','${Relationship}')
      `;
    let verifySql = `select * from students where contactNumber='${contactNumber}' and name='${name}'`;
    let [verifyResult] = await Pool.query(verifySql);
    if (verifyResult.length > 0) {
      return res.json({
        Messages:
          "This student is registered before and you can't register again.",
      });
    }

    let [inserResult] = await Pool.query(insertDataQuery);
    // let [results] = await Pool.query(registerStaffs, values);
    let { affectedRows, insertId } = inserResult;
    console.log("inserResult", inserResult);
    if (affectedRows > 0) {
      req.body.insertId = insertId;
      registerUsersInUsertTable(req, res);
    } else {
      res.json({ Messages: "unable to register" });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ message: "error" });
  }
});
router.get("/viewStudentsData", async (req, res) => {
  try {
    let Getstugents = `select * from students`;
    let [results] = await Pool.query(Getstugents);
    res.json({ message: results });
  } catch (error) {
    console.log(error);
    res.json({ message: "error", error: "error st_v_01" });
  }
});
router.post("/deleteStudentsData", async (req, res) => {
  try {
    console.log("req.body", req.body);
    let { Data } = req.body;
    let { id } = Data;
    let deleteStudentsData = `delete from students where id=${id}`;

    let results = await Pool.query(deleteStudentsData);
    res.json({ Messages: "success" });
    //  id: 9,
    //   name: 'Marew Masresha Abate',
    //   dateOfBirth: '2023-12-09T21:00:00.000Z',
    //   address: 'Addis abeba',
    //   contactNumber: '+251922112480',
    //   Grade: 'Marew Masr',
    //   mothersFullNames: 'Marew Masresha Abate'
  } catch (error) {
    console.log("error_on_delete_students", error);
    res.json({
      Messages: "error",
      error: "error_on_delete_students",
    });
  }
  // res.json({ Messages: "connected" });
});
router.post("/updateStudentsData", upload.single("file"), async (req, res) => {
  try {
    console.log("req", req.body);
    let { editedData } = req.body;
    let file = req.file;
    editedData = JSON.parse(editedData);
    let {
      id,
      name,
      dateOfBirth,
      address,
      contactNumber,
      Grade,
      mothersFullNames,
      nameOfRelatives,
      relativeAddress,
      relativePhone,
      Relationship,
      studentsImage,
    } = editedData;
    let update = `update students set name=?, dateOfBirth=?,address=?,contactNumber=?   ,Grade=?,
    mothersFullNames=?,
    nameOfRelatives=?,
      relativeAddress=?,
      relativePhone=?,
      Relationship=? ,
      
      studentsImage=? where id='${id}'`;
    let fileName = file ? file.filename : studentsImage;
    console.log("fileName", fileName);
    // return;
    let values = [
      name,
      dateOfBirth,
      address,
      contactNumber,
      Grade,
      mothersFullNames,
      nameOfRelatives,
      relativeAddress,
      relativePhone,
      Relationship,
      fileName,
    ];
    let x = await Pool.query(update, values);
    res.json({ Messages: "success" });
  } catch (error) {
    console.log("error_to_update_students", error);
    res.json({ Messages: "error", error: "error_to_update_students" });
  }
});

module.exports = router;
