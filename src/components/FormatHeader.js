import React from "react";
//components
import InputForm from "./InputForm";
//styles
import "../css/FormatHeader.css";

const FormatHeader = (props) => {
  const date = new Date();
  //date
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  //time
  const hh = String(date.getHours()).padStart(2, "0");
  const minmin = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return (
    <>
      <div className="formatHeader">
        <h1 className="formatHeader__title">Auditoria de seguridad alimentaria</h1>
        <p className="formatHeader__description">
          Proporciona toda la informaci&oacute;n solicitada, al terminar presiona el boton de enviar para
          guardar la informaci&oacute;n.
        </p>
        {/*get date*/}
        <div className="dateTime">
          <label htmlFor="fecha" className="dateTime__label">
            Fecha:
          </label>
          <input
            type="text"
            name="fecha"
            id="fecha"
            defaultValue={`${dd}/${mm}/${yyyy}`}
            readOnly
            className="dateTime__input"
          />
        </div>
        {/*get initial time*/}
        <div className="dateTime">
          <label htmlFor="horaInicio" className="dateTime__label">
            Hora de inicio:
          </label>
          <input
            type="text"
            name="horaInicio"
            id="horaInicio"
            defaultValue={`${hh}:${minmin}:${ss}`}
            readOnly
            className="dateTime__input"
          />
        </div>
      </div>
      {!props.format3 ? (
        //format 1 and 2
        <>
          <InputForm label="Nombre sucursal" name="sucursal" placeHolder="Nombre de la sucursal..." />
          <InputForm label="No. sucursal" name="noSucursal" placeHolder="Número de sucursal..." />
          <InputForm label="Nombre de gerencia" name="nombreGerencia" placeHolder="Juan Chavez..." />
          <InputForm label="Nombre del AIS" name="nombreAIS" placeHolder="Cesar Muñoz..." />
        </>
      ) : (
        //format 3
        <>
          <InputForm
            label="Determinante sucursal"
            name="detSucursal"
            placeHolder="Determinante sucursal..."
          />
          <InputForm label="Nombre sucursal" name="nombreSucursal" placeHolder="Nombre de la sucursal..." />
          <InputForm
            label="Nombre de quien atiende la visita"
            name="nombreVisita"
            placeHolder="Esteban Camacho..."
          />
          <InputForm label="Cargo de quien atiende la visita" name="cargoVisita" placeHolder="Gerente..." />
          <InputForm label="Nombre del AIS" name="nombreAIS" placeHolder="Roberto Carlos..." />
        </>
      )}
    </>
  );
};

export default FormatHeader;
