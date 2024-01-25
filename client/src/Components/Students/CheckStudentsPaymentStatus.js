import axios from "axios";
import React, { useEffect, useState } from "react";

function CheckStudentsPaymentStatus() {
  const ServeAddress = process.env.REACT_APP_SERVER;
  const [PaymentInfo, setPaymentInfo] = useState([]);
  let GetPaymentInfo = async () => {
    let Responces = await axios.get(
      ServeAddress + "/StudentsPayment/checkStudentsPaymentstatus/"
    );
    console.log("Responces", Responces.data);
    let { Messages, error } = Responces.data;
    setPaymentInfo(Messages);
  };
  useEffect(() => {
    GetPaymentInfo();
  }, []);

  return (
    <div>
      {PaymentInfo.length == 0 ? (
        <center>all students didnot make payments</center>
      ) : (
        PaymentInfo.map((info) => {
          console.log("info", info);
        })
      )}

      {/* {JSON.stringify(PaymentInfo)} */}
    </div>
  );
}

export default CheckStudentsPaymentStatus;
