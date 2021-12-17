import React from "react";
import { useFormik } from "formik";
//components
import FormatHeader from "./FormatHeader";
import Question from "./Question";
import Section from "./Section";
//styles
import "../css/Format.css";

const initialPointsDepartments = {
  carnes: "0",
  alimentosPreparados: "0",
  panaderiaTortilleria: "0",
  salchichoneria: "0",
  frutasVerduras: "0",
  pescados: "0",
  recibo: "0",
  cisterna: "0",
  ctoBasura: "0",
};

/**
 * Function to handle the submit of the form
 * @param {*} values The object containing the submitted values
 */
const handleSumbit = (values) => {
  console.log(values);
};

/**
 * Function to generate an array of quetion objects
 * @param {number} number Number of questions objects to generate
 * @returns An array of question objects
 */
const generateQuestionObjects = (number) => {
  const questions = [];
  for (let i = 0; i < number; i++) {
    questions.push(initialPointsDepartments);
  }
  return questions;
};

const FormatOne = () => {
  //formik
  const formik = useFormik({
    initialValues: {
      fecha: "",
      horaInicio: "",
      nombreSucursal: "",
      noSucursal: "",
      nombreGerencia: "",
      nombreAIS: "",
      preguntas: generateQuestionObjects(37),
    },
    onSubmit: handleSumbit,
  });

  return (
    <div className="format">
      <form onSubmit={formik.handleSubmit}>
        {/* format header */}
        <FormatHeader
          format3={false}
          values={formik.values}
          handleChange={formik.handleChange}
          formik={formik}
        />
        {/* 1 section */}
        <Section description="I. Buenas pr&aacute;cticas de higiene y sanidad" />
        {/* questions */}
        <Question
          format1
          index={0}
          question="1.- ¿El personal sabe que métodos de limpieza y sanitización aplicar para cada una de las necesidades de los departamentos? Pedir que algún empleado mencione 3 ejemplos diferentes."
          description="Selecciona un puntaje para cada departamento"
          points={6}
          filterDepartments="Recibo,Cisterna,Cto. de basura"
          values={formik.values.preguntas}
          handleChange={formik.handleChange}
          formik={formik}
        />
        <Question
          format1
          index={1}
          question="2.- ¿Se utilizan sólo los productos químicos de limpieza y sanitización autorizados?"
          description="Selecciona un puntaje para cada departamento"
          points={3}
          filterDepartments="Recibo,Cisterna,Cto. de basura"
          values={formik.values.preguntas}
          handleChange={formik.handleChange}
          formik={formik}
        />
        <Question
          format1
          index={2}
          question="3.- ¿Las  superficies  que  están  en  contacto  con  las  manos  se  encuentran  limpias  y  desinfectadas  (perillas, botones, manijas, etc)."
          description="Selecciona un puntaje para cada departamento"
          points={6}
          filterDepartments="Recibo,Cisterna,Cto. de basura"
          values={formik.values.preguntas}
          handleChange={formik.handleChange}
          formik={formik}
        />
        <Question
          format1
          index={3}
          question="4.- ¿Las superficies o equipos que están en contacto directo con los alimentos se encuentran sin acumulación de suciedad?"
          description="Selecciona un puntaje para cada departamento"
          points={10}
          filterDepartments="Recibo,Cto. de basura"
          values={formik.values.preguntas}
          handleChange={formik.handleChange}
          formik={formik}
        />
        <Question
          format1
          index={4}
          question="5.- ¿Las  superficies  o  equipos  que  NO  están  en  contacto  directo  con  los  alimentos  se  encuentran  sin acumulación de suciedad?"
          description="Selecciona un puntaje para cada departamento"
          points={6}
          filterDepartments="Cto. de basura"
          values={formik.values.preguntas}
          handleChange={formik.handleChange}
          formik={formik}
        />

        <button type="submit" className="btnForm">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormatOne;
