import './FormInput.css';

const FormInput = ({name, fieldLabel, placeholder, type, value , onChange}) => {
    
  return (
    <div className="formInput">
      <label htmlFor="">{fieldLabel}</label>
      <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
  );
};
export default FormInput;
