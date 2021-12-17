import React, { useEffect } from "react";
//components
import AnswerDpt from "./AnswerDpt";
//nanoid
import { nanoid } from "nanoid";
//styles
import "../css/Question.css";

//object names format 1
const objFormat1 = {
  carnes: "Carnes",
  alimentosPreparados: "Alimentos Preparados",
  panaderiaTortilleria: "Panadería y tortillería",
  salchichoneria: "Salchichonería",
  frutasVerduras: "Frutas y verduras",
  pescados: "Pescados",
  recibo: "Recibo",
  cisterna: "Cisterna",
  ctoBasura: "Cto. de basura",
};

//object names format 2
const objFormat2 = {
  carnes: "Carnes",
  pym: "PyM",
  slyc: "S, L y C",
  frutasVerduras: "Frutas y verduras",
  panaderiaChocolateria: "Panadería y chocolatería",
  fteSodasAlimSelectoTacosSushi: "Fte. de Sodas / Alim. Selecto / Tacos y Sushi",
  tortilleria: "Tortillería",
  heladosPalomitas: "Helados / Palomitas",
  cafe: "Café",
  pizzaPasta: "Pizza y pasta",
  jugosFrutas: "Jugos y frutas",
  recibo: "Recibo",
  ctoBasura: "Cto. Basura y cartón",
};

//object format 3
const objFormat3 = {
  verde: "Verde",
  amarillo: "Amarillo",
  rojo: "Rojo",
  autofalla: "Autofalla",
};

/**
 * Function to get the values of an object into an array
 * @param {Object} namesFormat An object
 * @returns An array with the values of the object
 */
const getObjectValues = (namesFormat) => {
  const dpts = [];
  for (let i in namesFormat) {
    dpts.push(namesFormat[i]);
  }
  return dpts;
};

/**
 * Function to validate if a department is into the array
 * @param {string} dpt Name of the department
 * @param {string} filterDepartments Name of the departments you dont want to use
 * @returns True if the dpt is in the filterDepartments
 */
const isDptInTheArray = (dpt, filterDepartments) => {
  //generate array
  const filterDpts = filterDepartments.split(",");
  let resp = false;

  filterDpts.forEach((filterDpt) => {
    if (filterDpt === dpt) resp = true;
  });

  return resp;
};

/**
 * Function to get the name of a field form
 * @param {string} dpt Name of the department to get the name
 * @param {object} namesFormat An object of the format 1, 2 or 3
 * @param {number} index The index of the object question
 * @returns The correspondly name
 */
const generateName = (dpt, namesFormat, index) => {
  let name = "";
  for (let i in namesFormat) {
    if (namesFormat[i] === dpt) name = i;
  }

  return `preguntas[${index}].${name}`;
};

/**
 * Function to get the name of the department to get the value for formik
 * @param {string} dpt The name of the department
 * @param {object} namesFormat An object of the format 1, 2 or 3
 * @returns The correspondly name
 */
const generateNameForValue = (dpt, namesFormat) => {
  let name = "";
  for (let i in namesFormat) {
    if (namesFormat[i] === dpt) name = i;
  }

  return name;
};

/**
 * Function to generate an array of values depending on the question
 * @param {number} points
 * @returns {Array<number>} Array of points
 */
const generateArrayOfValues = (points) => {
  const values = [];
  for (let i = points; i >= 0; i--) {
    values.push(i);
  }
  return values;
};

const Question = (props) => {
  const {
    format1,
    format2,
    format3,
    points,
    filterDepartments,
    question,
    description,
    index,
    values,
    handleChange,
    formik,
  } = props;

  //get the array of all the possible points
  const generatedValues = generateArrayOfValues(points);

  //array of departments
  let departments = [];

  if (format1) {
    //departments for format 1
    departments = getObjectValues(objFormat1);
  } else if (format2) {
    //department for format 2
    departments = getObjectValues(objFormat2);
  } else if (format3) {
    //departments for format 3
    departments = getObjectValues(objFormat3);
  }

  //filter departments
  const newDpts = departments.filter((dpt) => {
    return !isDptInTheArray(dpt, filterDepartments);
  });

  //React Hooks - ComponentDidMount
  useEffect(() => {
    newDpts.forEach((dpt) => {
      const newDpt = format1
        ? generateNameForValue(dpt, objFormat1)
        : format2
        ? generateNameForValue(dpt, objFormat2)
        : format3
        ? generateNameForValue(dpt, objFormat3)
        : null;
      //update formik state to the first generated value
      const firstValue = generatedValues[0].toString();
      formik.setFieldValue(`preguntas[${index}][${newDpt}]`, firstValue);
    });
  }, []);

  return (
    <div className="question">
      <p className="question__paragraph">{question}</p>
      <p className="question__description">{description}</p>
      <div className="question__options">
        {newDpts.map((dpt) => (
          <AnswerDpt
            key={nanoid(10)}
            label={dpt}
            name={
              format1
                ? generateName(dpt, objFormat1, index)
                : format2
                ? generateName(dpt, objFormat2, index)
                : format3
                ? generateName(dpt, objFormat3, index)
                : null
            }
            optionValues={generatedValues}
            value={
              format1
                ? values[index][generateNameForValue(dpt, objFormat1)]
                : format2
                ? values[index][generateNameForValue(dpt, objFormat2)]
                : format3
                ? values[index][generateNameForValue(dpt, objFormat3)]
                : null
            }
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
