import axios from "axios";

async function updat_Present_Absent(rowData) {
  console.log("rew", rowData);
  let { data, action, setProcessing, setActionMessages, getAttendancesData } =
    rowData;
  //   console.log(data, target, Processing, setProcessing);
  // data = data.data;
  try {
    const ServeAddress = process.env.REACT_APP_SERVER;

    console.log("data, action", data, action);
    let responces = await axios.put(ServeAddress + "/attendance", data);
    // console.log("responces", responces.data);
    setProcessing(false);
    let { Messages } = responces.data;
    // alert(Messages);
    if (Messages == "Success") {
      setActionMessages({
        Error: null,
        Success: Messages,
      });
      getAttendancesData();
    } else {
      setActionMessages({
        Error: Messages,
        Success: null,
      });
    }
    //   console.log("updat_Present_Absent");
  } catch (error) {
    setActionMessages({
      Error: error.message,
      Success: null,
    });

    setProcessing(false);
    console.log("error is ", error);
  }
}

export default updat_Present_Absent;
