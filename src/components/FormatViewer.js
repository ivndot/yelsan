import React from "react";

const FormatViewer = (props) => {
  const { format, values } = props;

  return <div>hola</div>;
};

const ViewerHeader = (props) => {
  const { format, values } = props;
  let jsx = "";

  if (format === "Formato 1") {
    jsx = (
      <div className="">
        <p className="__title">Nombre de la sucursal:</p>
        <p className="__value">{values.nombreSucursal}</p>
      </div>
    );
  }

  return <div className="viewerHeader">{jsx}</div>;
};

export default FormatViewer;
