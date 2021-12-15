import React from "react";
//components
import FormatHeader from "./FormatHeader";
//styles
import "../css/Format.css";

export default class Format extends React.Component {
  render() {
    return (
      <div className="format">
        <FormatHeader format3={true} />
        <button type="button" className="btnForm">
          Enviar
        </button>
      </div>
    );
  }
}
