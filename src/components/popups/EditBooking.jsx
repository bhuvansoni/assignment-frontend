import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FormInput from "../commons/FormInput";
import "./EditBooking.css";
export default function EditBooking({ onDelete, onClose, booking }) {
  const [values, setValues] = useState({
    email: booking.email,
    title: booking.title,
    startDate: booking.startDate,
    endDate: booking.endDate,
    name: booking.created_by
  });
  console.log(values);

  const inputs = [
    {
      id: 0,
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
    },
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
      errorMessage: "It should be a valid email address!",
    },
    {
      id: 2,
      name: "title",
      type: "text",
      placeholder: "Title",
      label: "Title",
    },
    {
      id: 3,
      name: "startDate",
      type: "datetime-local",
      placeholder: "Start Date",
      label: "Start Date",
      minTime: getCurrentDateTime(),
    },
    {
      id: 4,
      name: "endDate",
      type: "datetime-local",
      placeholder: "End Date",
      minTime: getCurrentDateTime(),
      label: "End Date",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function getCurrentDateTime() {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);
    return formattedDate;
  }
  return (
    <Popup open modal closeOnDocumentClick={false} className="popup-overlay">
      <div className="modal">
        <form className="edit-form" onSubmit={handleSubmit}>
          <h1>Edit Booking</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              name={input.name}
              fieldLabel={input.label}
              placeholder={input.placeholder}
              type={input.type}
              value={values[input.name]}
              onChange={onChange}
              minTime={input.minTime}
              errorMessage={input.errorMessage}
            />
          ))}
          <button>Submit</button>
        </form>
      </div>
    </Popup>
  );
}
