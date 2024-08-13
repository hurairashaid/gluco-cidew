// import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// export default function MyApp() {
//   const [value, onChange] = useState(new Date());

//   // useEffect(() => {
//   //   const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
//   //   const formattedDate = value.toLocaleDateString('en-US', options);
//   //   console.log(formattedDate);
//   // }, [value]);
//   console.log(value);

//   return (
//     <>
//     <div className="d-flex justify-content-center align-items-center">
//       <Calendar className="w-100" onClickDay={onChange}  />
//     </div>
//     </>
//   );
// }

// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function DatePickerComponent() {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Select a Date</h2>
//       <Form className="d-flex justify-content-center">
//         <DatePicker
//           selected={selectedDate}
//           onChange={handleDateChange}
//           className="form-control"
//           dateFormat="MMMM d, yyyy"
//         />
//       </Form>
//       <div className="text-center mt-3">
//         <Button variant="primary" onClick={() => alert(`Selected Date: ${selectedDate.toDateString()}`)}>
//           Show Selected Date
//         </Button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { BaseURL } from "../apiBaseURL/BaseURL";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DatePickerComponent() {
  const navigate = useNavigate();
  //State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  //State For Modal Inputs
  const [systolic, setSystolic] = useState();
  const [diastolic, setDiastolic] = useState();
  // State for Loading
  const [loading, setLoading] = useState(false);
  //State for useEffect
  const [bpData, setBpData] = useState(false);
  //State for Refresh
  const [refresh, setRefresh] = useState(false);
  //State for Blood Pressure History
  const [bpHistoryData, setBpHistoryData] = useState([]);
  //Fuction to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  //Function to handle modal close
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //Styles
  const containerStyle = {
    marginTop: "200px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8f9fa",
    width: "80%",
    maxWidth: "600px",
    height: "auto",
    margin: "0 auto",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#343a40",
  };

  const buttonStyle = {
    marginTop: "20px",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  };

  const calendarStyle = {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    padding: "10px",
  };

  const modalBodyStyle = {
    maxHeight: "400px",
    overflowY: "auto",
    padding: "20px",
  };

  //Function to input blood pressure
  const inputBP = async (e) => {
    e.preventDefault();
    //Error Validation
    if (!systolic || !diastolic) {
      toast.error("Please fill in all the fields");
      return;
    }
    //Getting token from local storage
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("token", token);

    //API Call
    try {
      setLoading(true);
      const res = await axios.post(
        `${BaseURL}/inputbp`,
        {
          date: selectedDate,
          systolic: systolic,
          diastolic: diastolic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBpData(true);
      setRefresh(!refresh);
      console.log(res.data);
      toast.success("Successful");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    }
  };
  //Function to get blood pressure history
  const bpHistory = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      setLoading(true);
      const res = await axios.get(`${BaseURL}/bphistory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);
      setBpHistoryData(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    }
  };
  //UseEffect for getting blood pressure history
  useEffect(() => {
    bpHistory();
  }, [refresh]);
  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Select a Date</h2>
      <Form className="d-flex justify-content-center">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="form-control"
          dateFormat="MMMM d, yyyy"
          calendarContainer={({ children }) => (
            <div style={calendarStyle}>{children}</div>
          )}
        />
      </Form>
      <div className="text-center">
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleShow}>
          Show Selected Date
        </Button>
      </div>
      {/* //Modal */}
      <Modal className="mt-5" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Selected Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2">Selected Date: {selectedDate.toDateString()}</p>
          <form onSubmit={(e) => inputBP(e)}>
            <TextField
              fullWidth
              onChange={(e) => setSystolic(e.target.value)}
              label="Systolic"
              type="number"
              variant="outlined"
            />
            <TextField
              fullWidth
              onChange={(e) => setDiastolic(e.target.value)}
              sx={{ mt: 3 }}
              label="Diastolic"
              type="number"
              variant="outlined"
            />
            <Button
              disabled={loading}
              variant="contained"
              sx={{ mt: 3 }}
              type="submit"
            >
              {loading ? "Loading..." : "Show History"}
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        <div className="text-center" style={modalBodyStyle}>
          {bpData ?<h1>Patient History</h1>:null}

          {bpData === true
            ? bpHistoryData.map((e, i) => {
                return (
                  <div className="card" key={i}>
                    <div className="card-header">History</div>
                    <div className="card-body">
                      <h5 className="card-title"><b>Dated:</b> {new Date(e.date).toISOString().split("T")[0]}</h5>
                      <p className="card-text">
                        Systolic: {e.systolic} Diastolic: {e.diastolic}
                      </p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </Modal>
      {/* Toastify */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
