import React, { useState } from "react";
import "./HomePage.css";
import FormInput from "../commons/FormInput";

export default function HomePage() {
  const [values, setValues] = useState({
    email: "",
    title: "",
    startDate: getCurrentDateTime(),
    endDate: getCurrentDateTime(),
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
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
    },
    {
      id: 4,
      name: "endDate",
      type: "datetime-local",
      placeholder: "End Date",
      label: "End Date",
    },
 
  ];

  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function getCurrentDateTime() {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);
    return formattedDate;
  }

  return (
    <div className="create-meeting-form">
      <form>
        <h1>Create Meeting</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            name={input.name}
            fieldLabel={input.label}
            placeholder={input.placeholder}
            type={input.type}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
}
