import React from "react";
//styles
import "../css/InputForm.css";

const InputForm = (props) => {
  const { name, label, placeHolder, value, handleChange } = props;
  return (
    <div className="input">
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeHolder}
        value={value}
        onChange={handleChange}
        className="input__field"
        required
      />
    </div>
  );
};

export default InputForm;
