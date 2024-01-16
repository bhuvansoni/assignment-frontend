import "./FormInput.css";
import { useState } from "react";
const FormInput = ({
  name,
  fieldLabel,
  placeholder,
  type,
  value,
  onChange,
  errorMessage,
  minTime
}) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="formInput">
      <label htmlFor="">{fieldLabel}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()
        }
        min={type==='datetime-local'? minTime : null}
        
      />
      <span>{errorMessage}</span>
    </div>
  );
};
export default FormInput;
