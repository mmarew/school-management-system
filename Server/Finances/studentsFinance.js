let { Pool } = require("../Database");
const express = require("express");
const { upload } = require("../FileManagers");
const router = express.Router();
router.get("/studentsSideFee", async (req, res) => {
  let { studentid } = req.headers;
  console.log("@studentsSideFee studentid:", studentid);
  // return;
  let select = `select * from studentsInvoice where status= 'paied' or status='notPaied' and student_id='${studentid}' `;
  let [Results] = await Pool.query(select);
  console.log("Results", Results);

  res.json({ Messages: Results });
});

router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    let { invoiceDate } = req.query;
    let select = `SELECT * FROM studentsInvoice join students on studentsInvoice.student_id=students.id where Payment_date='${invoiceDate}' `;
    let [responces] = await Pool.query(select);
    res.json({ Messages: responces });
  } catch (error) {
    res.json({ Messages: "error", error: "studentsInvoice" });
    console.log("studentsInvoice", error);
  }
});
router.post("/", async (req, res) => {
  try {
    console.log("req", req.body);
    let { invoiceDate } = req.body;
    let getStudents = `select * from students`;
    let [Results] = await Pool.query(getStudents);
    // console.log("Results", Results);
    if (Results.length < 0)
      return res.json({ Message: "No students data found" });
    let rows = 0;

    await Promise.all(
      Results.map(async (Result) => {
        let { id } = Result;
        let selectIfVerified = `select * from studentsInvoice where student_id='${id}' and Payment_date='${invoiceDate}' `;
        let [responces] = await Pool.query(selectIfVerified);
        if (responces.length > 0) {
          return;
        }
        let Insert = `insert into studentsInvoice (student_id,payment_amount,Payment_date,status) values('${id}','${100}','${invoiceDate}', 'notPaied')`;
        let [insertResults] = await Pool.query(Insert);
        let { affectedRows } = insertResults;
        rows += affectedRows;
        console.log("insertResults", insertResults);
      })
    );
    if (rows > 0) {
      res.json({ Messages: "success" });
    } else {
      res.json({ Messages: "invoive is issued before" });
    }
    // res.json({ Messages: "Connected", Results });
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.put("/", async (req, res) => {
  // console.log("req.body", req.body);
  try {
    let { Invoice } = req.body;
    console.log("Invoice", Invoice);
    let { payment_amount, status, inviceId } = Invoice;
    console.log("payment_amount, status", payment_amount, status, inviceId);
    let updateQuery = `update studentsInvoice set payment_amount = '${payment_amount}', status='${status}' where inviceId='${inviceId}'`;
    let [results] = await Pool.query(updateQuery);
    let { affectedRows } = results;
    if (affectedRows > 0) {
      res.json({ Messages: "success" });
    }
    if (affectedRows == 0) {
      res.json({ Messages: "fail" });
    }
    // console.log("results", results);
  } catch (error) {
    console.log("error", error);
    res.json({ Messages: "error" });
  }
});
router.delete("/", async (req, res) => {
  // console.log("req.body", req.body);
  let { inviceId } = req.body;
  console.log("inviceId:", inviceId);
  try {
    let deleteInvoices = `delete from studentsInvoice where inviceId='${inviceId}'`;
    let [results] = await Pool.query(deleteInvoices);
    if (results.affectedRows > 0) {
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
// studentsFinance / StudentSideMakePayment;
router.post(
  "/StudentSideMakePayment",
  upload.single("receipt"),
  async (req, res) => {
    try {
      const file = req.file;
      let image = file ? file.filename : null;
      console.log("image", image);
      let { fee } = req.body;
      fee = JSON.parse(fee);
      let { inviceId } = fee;
      console.log("fee", fee);
      let Updates = `update studentsInvoice set invoiceFile='${image}',status='paied' where inviceId='${inviceId}'`;
      if (!image) {
        Updates = `update studentsInvoice set  status='paied' where inviceId='${inviceId}'`;
      }
      let [UpdateResults] = await Pool.query(Updates);
      console.log("@make payments UpdateResults", UpdateResults);
      if (UpdateResults.affectedRows > 0) res.json({ Messages: "success" });
      else res.json({ Messages: "fail" });
    } catch (error) {
      console.log("error", error);
      res.json({ Messages: "error" });
    }
  }
);
module.exports = router;
