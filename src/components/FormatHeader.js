import React, { useEffect, useState } from "react";
//components
import InputForm from "./InputForm";
//styles
import "../css/FormatHeader.css";

/**
 * Funtion to generate date and time
 * @returns {Array<string>} Array of date[0] and time[1]
 */
const generateDateAndTime = () => {
  const d = new Date();
  //date
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const date = `${dd}/${mm}/${yyyy}`;

  //time
  const hh = String(d.getHours()).padStart(2, "0");
  const minmin = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const time = `${hh}:${minmin}:${ss}`;

  return [date, time];
};

const FormatHeader = (props) => {
  const { values, handleChange, formik } = props;

  //React Hooks - state
  const [dateTime, setDateTime] = useState({ date: "", time: "" });

  //React Hooks - ComponentDidMount
  useEffect(() => {
    //generate date and time only in the first render
    const [date, time] = generateDateAndTime();
    //update state
    setDateTime({ date, time });

    //set date and time to formik state
    formik.values.fecha = date;
    formik.values.horaInicio = time;
  }, []);

  return (
    <div className="formatHeader">
      <h1 className="formatHeader__title">Auditoria de seguridad alimentaria</h1>
      <p className="formatHeader__description">
        Proporciona toda la informaci&oacute;n solicitada, al terminar presiona el boton de enviar para
        guardar la informaci&oacute;n.
      </p>
      <div className="dateTimeContainer">
        {/*get date*/}
        <div className="dateTime">
          <label htmlFor="fecha" className="dateTime__label">
            Fecha:
          </label>
          <input
            type="text"
            name="fecha"
            id="fecha"
            defaultValue={dateTime.date}
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
            defaultValue={dateTime.time}
            readOnly
            className="dateTime__input"
          />
        </div>
      </div>
      {!props.format3 ? (
        //format 1 and 2
        <>
          <InputForm
            label="Nombre sucursal"
            name="nombreSucursal"
            placeHolder="Nombre de la sucursal..."
            value={values.nombreSucursal}
            handleChange={handleChange}
          />
          <InputForm
            label="No. sucursal"
            name="noSucursal"
            placeHolder="Número de sucursal..."
            value={values.noSucursal}
            handleChange={handleChange}
          />
          <InputForm
            label="Nombre de gerencia"
            name="nombreGerencia"
            placeHolder="Juan Chavez..."
            value={values.nombreGerencia}
            handleChange={handleChange}
          />
          <InputForm
            label="Nombre del AIS"
            name="nombreAIS"
            placeHolder="Cesar Muñoz..."
            value={values.nombreAIS}
            handleChange={handleChange}
          />
        </>
      ) : (
        //format 3
        <>
          <InputForm
            label="Determinante sucursal"
            name="detSucursal"
            placeHolder="Determinante sucursal..."
            value={values.detSucursal}
            handleChange={handleChange}
          />
          <InputForm
            label="Nombre sucursal"
            name="nombreSucursal"
            placeHolder="Nombre de la sucursal..."
            value={values.nombreSucursal}
            handleChange={handleChange}
          />
          <InputForm
            label="Nombre de quien atiende la visita"
            name="nombreVisita"
            placeHolder="Esteban Camacho..."
            value={values}
            handleChange={handleChange}
          />
          <InputForm
            label="Cargo de quien atiende la visita"
            name="cargoVisita"
            placeHolder="Gerente..."
            value={values}
            handleChange={handleChange}
          />
          <InputForm
            label="Nombre del AIS"
            name="nombreAIS"
            placeHolder="Roberto Carlos..."
            value={values}
            handleChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default FormatHeader;
