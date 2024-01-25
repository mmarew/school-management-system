const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
let PORT = process.env.PORT;
let { createTables } = require("./Database");
app.use(express.json());
app.use(cors());
// Import the students router
const studentsRouter = require("./students");
const studentsFinance = require("./Finances/studentsFinance");
const staffsRouter = require("./staffsRouter");
createTables();
const classRouter = require("./class");
const Cources = require("./cources");
const Combination = require("./Combination");
const login = require("./Login");
const { Register } = require("./Register");
const Attendances = require("./Attendance");
app.use("/attendance", Attendances);
app.use("/register", Register);
app.use("/login", login);
app.use("/Combination", Combination);
app.use("/cources", Cources);
app.use("/class", classRouter);
app.use("/staffs", staffsRouter);
app.use("/students", studentsRouter);
app.use("/studentsFinance", studentsFinance);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.end("<h1>Connected well</h1>");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
