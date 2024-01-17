import React, { useState } from "react";
import FormInput from "../commons/FormInput";
import "./Login.css";
export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
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
      name: "password",
      type: "text",
      placeholder: "Password",
      label: "Password",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);
  return (
    <div className="login-form">
      <form action="">
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
    </div>
  );
}
