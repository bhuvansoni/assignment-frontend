import React, { useEffect, useState } from "react";
import "./HomePage.css";
import FormInput from "../commons/FormInput";
import LayoutComponent from "../commons/LayoutComponent";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../commons/AuthProvider";
import { createBooking, getCategories } from "../../utils/api";

export default function HomePage() {
  const { accessToken, email, name, setData } = useAuth();
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    email: "",
    title: "",
    startDate: getCurrentDateTime(),
    endDate: getCurrentDateTime(),
    name: "",
    categoryId: "",
  });

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

  const handleCategoryChange = (e) => {
    setValues({ ...values, categoryId: e.target.value });
  };
  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response);
    });
    setValues({
      ...values,
      email: email || "",
      name: name || "",
    });
  }, [email, name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(values.email)) {
      toast.error("Invalid email format", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }

    const startDate = new Date(values.startDate);
    const endDate = new Date(values.endDate);

    if (startDate >= endDate) {
      toast.error("End date must be later than the start date", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }
    const response = await createBooking(
      values.title,
      values.name,
      values.email,
      values.categoryId,
      values.startDate,
      values.endDate
    );
    if (response !== undefined) {
      setData({
        user_id: response,
        name: values.name,
        email: values.email,
      });
      setValues({
        ...values,
        title: "",
        startDate: getCurrentDateTime(),
        endDate: getCurrentDateTime(),
      });
      toast.success("Meeting Created!", {
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
    }
  };

  function getCurrentDateTime() {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);
    return formattedDate;
  }

  console.log(values);
  return (
    <LayoutComponent>
      <div className="create-meeting-form">
        <form onSubmit={handleSubmit}>
          <h1>Create Meeting</h1>
          <select onChange={handleCategoryChange}>
            <option value="" selected>
              Select Category
            </option>
            {categories.map((value) => {
              return (
                <option key={value.category_id} value={value.category_id}>
                  {value.category_name}
                </option>
              );
            })}
          </select>
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
        <ToastContainer />
      </div>
    </LayoutComponent>
  );
}
