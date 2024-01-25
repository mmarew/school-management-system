import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
} from "@mui/material";
import { DateFormatter } from "../Utilities/DateFormatter";
import StudentSideMakePayment from "./StudentSideMakePayment";

let ServeAddress = process.env.REACT_APP_SERVER;

function StudentSideViewFee() {
  const [feeData, setFeeData] = useState([]);
  let userId = localStorage.getItem("userId");
  let getStudentsFee = async () => {
    try {
      let results = await axios.get(
        `${ServeAddress}/studentsFinance/studentsSideFee`,
        { headers: { studentId: userId } }
      );
      console.log("getStudentsFee", results.data);
      let { Messages } = results.data;
      setFeeData(Messages);
      console.log("feeData Messages", Messages);
    } catch (error) {
      console.error("Error fetching fee data:", error);
    }
  };

  useEffect(() => {
    getStudentsFee();
  }, []);
  const [PayStudentsFee, setPayStudentsFee] = useState({
    Open: false,
    fee: {},
  });
  return (
    <div>
      {PayStudentsFee.Open && (
        <StudentSideMakePayment
          data={{ getStudentsFee, PayStudentsFee, setPayStudentsFee }}
        />
      )}
      <TableContainer sx={{ backgroundColor: "white" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment Amount</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>recite</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feeData.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell>{fee.payment_amount}</TableCell>
                <TableCell>{DateFormatter(fee.Payment_date)}</TableCell>
                <TableCell>{fee.status}</TableCell>
                <TableCell>{fee.invoiceFile}</TableCell>
                <TableCell>
                  {fee.status == "notPaied" ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        setPayStudentsFee({ Open: true, fee });
                      }}
                    >
                      Pay
                    </Button>
                  ) : (
                    <Chip label={fee.status} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StudentSideViewFee;
