import React from "react";
//styles
import "../css/Section.css";

const Section = (props) => (
  <div className="section">
    <p className="section__description">{props.description}</p>
  </div>
);

export default Section;
