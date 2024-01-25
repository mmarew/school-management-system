import axios from "axios";

let ServeAddress = process.env.REACT_APP_SERVER;
let GetClassAndCources = async () => {
  let results = await axios.get(
    ServeAddress + "/Combination/getClassandCources"
  );
  //   console.log("GetClassAndCources", results.data.Messages);
  let { Messages } = results.data;
  return Messages;
};

export default GetClassAndCources;
