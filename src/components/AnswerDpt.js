import React, { memo } from "react";
//nanoid
import { nanoid } from "nanoid";
//styles
import "../css/AnswerDpt.css";

const AnswerDpt = (props) => {
  const { name, label, value, handleChange, optionValues } = props;

  return (
    <div className="answer">
      <label htmlFor={name} className="answer__label">
        {label}
      </label>
      <select name={name} id={name} value={value} onChange={handleChange} className="answer__select">
        {optionValues.map((optionValue) => (
          <option key={nanoid(5)} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(AnswerDpt);
