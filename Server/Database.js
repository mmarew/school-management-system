const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
  connectTimeout: 30000,
});

// Test the connection
pool.getConnection();

const createTables = async () => {
  try {
    const createTableStudents = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      dateOfBirth DATE,
      address VARCHAR(255),
      contactNumber VARCHAR(20),
      Grade VARCHAR(10),
      mothersFullNames VARCHAR(255), medicalInformations varchar(2000),
      nameOfRelatives varchar(2000),
      relativeAddress varchar(2000),
      relativePhone varchar(2000),
      Relationship varchar(2000),
      studentsImage varchar (200)
    )
  `;

    let x = await pool.query(createTableStudents);

    let createTableTeachers = `create table if not exists teachers  (teachersId int AUTO_INCREMENT PRIMARY KEY, teachersName varchar(300), teachersPhoneNumber varchar(3000),teachersemail varchar(50),Descriptions varchar(9000) )`;
    let x1 = pool.query(createTableTeachers);
    if (x1) console.log("created tabl teachers");
    let createClass = `create table if not exists Class(classId int AUTO_INCREMENT PRIMARY KEY, className varchar(200))`;
    let [classResult] = await pool.query(createClass);
    console.log("classResult", classResult);
    if (classResult.affectedRows > 0) {
      console.log("Class created successfully");
    }
    let cources = `create table if not exists cources(courcesId int AUTO_INCREMENT PRIMARY KEY, courceName varchar(200),courceInstructor varchar(2000),targetedClass varchar(2000) , status varchar(1000))`;

    let responces = await pool.query(cources);
    if (responces) console.log("created table cources ");
  } catch (error) {
    console.log("error", error);
  }
  let createTablecomb1 = `create table if not exists classAndTeachersAndCources(id int AUTO_INCREMENT PRIMARY KEY, teachersId int, classId int ,courceId int)`;
  let [results] = await pool.query(createTablecomb1);
  // console.log("results", results.affectedRows);
  let createTableClassAndCources = `create table if not exists classAndCources(id int AUTO_INCREMENT PRIMARY KEY, courcesId int, classId int)`;
  let [results1] = await pool.query(createTableClassAndCources);
  let financeTable = `CREATE TABLE IF NOT EXISTS studentsInvoice (inviceId INT AUTO_INCREMENT PRIMARY KEY,  student_id int NOT NULL,  payment_amount DECIMAL(10, 2) NOT NULL, Payment_date DATE NOT NULL, status enum('paied','notPaied','Verified'),invoiceFile varchar(2000))`;
  let [crateFinanceTable] = await pool.query(financeTable);
  console.log("crateFinanceTable", crateFinanceTable);
  let usersTable = `create table if not exists usersTable(primaryId int AUTO_INCREMENT PRIMARY KEY,userId int, phoneNumber varchar(20), password varchar(20),role enum("Admin", "Teacher", "Parent", "Student"))`;
  let usersResult = await pool.query(usersTable);
  if (usersResult.length > 0) {
    console.log("usersResult");
  }
  let adminTable = `create table if not exists admin (adminId int AUTO_INCREMENT PRIMARY KEY, adminFullName varchar (200), adminPhone varchar(200) )`;
  let resultsOfAdmin = await pool.query(adminTable);
  console.log("resultsOfAdmin", resultsOfAdmin);
  let attendanceTable = `create table if not exists attendanceTable(attendanceId int AUTO_INCREMENT PRIMARY KEY, classidAttendances int, courcesIdAttendances int, teachersIdAttendances int,studentIdAttendances int,attendancesStatus enum('Default','Absent','Present') not null default 'Default',attendanceDate DATE NOT NULL )`;
  let [attendancesResult] = await pool.query(attendanceTable);
  if (attendancesResult.affectedRows > 0) {
    console.log("attendance created well");
  }
};
module.exports.createTables = createTables;
module.exports.Pool = pool;
