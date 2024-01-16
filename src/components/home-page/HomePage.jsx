import React, { useState } from "react";
import "./HomePage.css";
import FormInput from "../commons/FormInput";
import LayoutComponent from "../commons/LayoutComponent";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const [values, setValues] = useState({
    email: "",
    title: "",
    startDate: getCurrentDateTime(),
    endDate: getCurrentDateTime(),
  });

  const inputs = [
    {
      id: 0,
      name: "Name",
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
    
    console.log('test')
    toast.success('Meeting Created!', {
      position: "bottom-center",
      autoClose: 15,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      });
  };

  function getCurrentDateTime() {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);
    return formattedDate;
  }

  return (
    <LayoutComponent>
      <div className="create-meeting-form">
        <form onSubmit={handleSubmit}>
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
              minTime={input.minTime}
              errorMessage={input.errorMessage}
            />
          ))}
          <button>Submit</button>
        </form>
        <ToastContainer/> 
      </div>
    </LayoutComponent>
  );
}
