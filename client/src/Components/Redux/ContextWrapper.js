import React, { createContext, useContext, useState } from "react";
// Create a new context
const MyContext = createContext();
function ContextWrapper({ children }) {
  const [Role, setRole] = useState(null);
  const [classAndCources, setclassAndCources] = useState([]);
  const [classList, setClassList] = useState([]);
  const [Employees, setEmployees] = useState([]);

  const [StudentsData, setStudentsData] = useState([]);
  const [Courses, setCourses] = useState([]);
  const [classAndTeachers, setclassAndTeachers] = useState([]);
  const contextValue = {
    Role,
    setRole,
    classAndCources,
    setclassAndCources,
    classAndTeachers,
    setclassAndTeachers,
    StudentsData,
    setStudentsData,
    classList,
    setClassList,
    Courses,
    setCourses,
    Employees,
    setEmployees,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}
// zustand;
// Export the custom context
export const useMyContext = () => useContext(MyContext);
export default ContextWrapper;
