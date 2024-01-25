import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SchoolNavigation from "./Components/Nav/Nav";
import Students from "./Components/Students/Students";
import Employees from "./Components/Teachers/Employees";
import Class from "./Components/Class/Class";
import Cources from "./Components/Cources/Cources";
import Home from "./Home";
import { getSudentsData } from "./Components/Students/ViewStudentsData";
import { getEmployees } from "./Components/Teachers/ViewEmployees";
import { getCourses } from "./Components/Cources/ViewCources";
import { useMyContext } from "./Components/Redux/ContextWrapper";
import { GetClass } from "./Components/Class/ViewClass";
import getClassAndTeachers_Cources from "./Components/Combinations/GetClassAndTeachers";
import GetClassAndCources from "./Components/Combinations/GetClassAndCources";
import Login from "./Components/Login/Login.js";
import StudentsFinance from "./Components/Finance/StudentsFinance.js";
import TeachersSalary from "./Components/Finance/TeachersSalary.js";
import "./App.css";
import StudentsSide from "./Components/StudentsSide/StudentsSide.js";
import TeachersSide from "./Components/TeachersSide/TeachersSide.js";
import ParentsSide from "./Components/ParentsSide/ParentsSide.js";
import RegistrationForm from "./Components/Register/Register.js";
function App() {
  let {
    Role,
    setRole,
    setclassAndCources,
    setStudentsData,
    setClassList,
    setCourses,
    setEmployees,
    setclassAndTeachers,
  } = useMyContext();
  let fetchData = async () => {
    let Class_Teachers = await getClassAndTeachers_Cources();
    console.log("inapp Class_Teachers", Class_Teachers);
    let classAndCources = await GetClassAndCources();
    let studentD = await getSudentsData();
    let emplD = await getEmployees();
    let courceD = await getCourses();
    let classLists = await GetClass();
    setclassAndCources(classAndCources);
    setclassAndTeachers(Class_Teachers);
    setEmployees(emplD);
    setCourses(courceD);
    // console.log("classLists===", classLists);
    setClassList(classLists);
    setStudentsData(studentD);
  };
  let Navigate = useNavigate();
  let authId = localStorage.getItem("authId");
  useEffect(() => {
    console.log("authId", authId);
    setRole(localStorage.getItem("Role"));
    if (authId) fetchData();
    if (!authId) {
      // Navigate("/login");
    }
  }, [Role]);
  // users role
  console.log("Role", Role);
  return (
    <div className="App">
      <div style={{ display: "none" }}></div>
      {localStorage.getItem("authId") && Role == "Admin" && (
        <SchoolNavigation />
      )}
      <Routes>
        {Role == "Student" ? (
          <>
            {/* <Route path="/StudentsSide" element={<StudentsSide />} /> */}
            <Route path="/" element={<StudentsSide />} />
          </>
        ) : Role == "Admin" ? (
          <>
            <Route path="/" element={<Home />} />{" "}
            <Route path="/students" element={<Students />} />
            <Route path="/finance">
              <Route
                path="/finance/StudentsFinance"
                element={<StudentsFinance />}
              />
              <Route
                path="/finance/teachersSalary"
                element={<TeachersSalary />}
              />
            </Route>
            <Route path="/employees" element={<Employees />} />
            <Route path="/class" element={<Class />} />
            <Route path="/courses" element={<Cources />} />
          </>
        ) : Role == "Teacher" ? (
          <Route path="/" element={<TeachersSide />} />
        ) : Role == "Parent" ? (
          <Route path="/" element={<ParentsSide />} />
        ) : (
          <>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
