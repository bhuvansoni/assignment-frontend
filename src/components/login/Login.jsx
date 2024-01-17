import React, { useState } from "react";
import FormInput from "../commons/FormInput";
import "./Login.css";
import { login } from "../../utils/api";
import { toast, ToastContainer, Slide } from "react-toastify";
import { useAuth } from "../commons/AuthProvider";
import Loader from "../commons/Loader";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const {setData} = useAuth();

  const [loading, setLoading] = useState(false);

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
      name: "password",
      type: "text",
      placeholder: "Password",
      label: "Password",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await login(values.email, values.password);
    if (response === undefined) {
      toast.error("Invalid User Credentials", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } else {
      setData(response);
      navigate("/")
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader/>;
  }
  return (
    <div className="login-form">
     
      <form onSubmit={submit}>
        <h1>Login</h1>

        {inputs.map((input) => (
          <FormInput
            key={input.id}
            name={input.name}
            fieldLabel={input.label}
            placeholder={input.placeholder}
            type={input.type}
            value={values[input.name]}
            onChange={onChange}
            errorMessage={input.errorMessage}
          />
        ))}
        <button>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}
