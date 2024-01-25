import axios from "axios";
// import { useMyContext } from "../Redux/ContextWrapper";

let ServeAddress = process.env.REACT_APP_SERVER;
let getClassAndTeachers_Cources = async () => {
  //   let { StudentsData, setStudentsData } = useMyContext();
  let Results = await axios.get(
    ServeAddress + "/Combination/classTeachersCources?"
  );
  let { Messages } = Results.data;
  // console.log("getClassAndTeachers", Messages);
  return Messages;
};

export default getClassAndTeachers_Cources;
