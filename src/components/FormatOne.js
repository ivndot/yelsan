import React, { useState } from "react";
import { useFormik } from "formik";
//components
import FormatHeader from "./FormatHeader";
import Question from "./Question";
import Section from "./Section";
import { addFormat1Answers } from "../util/requests";
import { generateQuestionObjects, generateFinalTime, getFinalRating } from "../util/util";
//styles
import "../css/Format.css";

// initial points for each department in format 1
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

//total points for each department
const totalPointsDepartments = {
  carnes: 182,
  alimentosPreparados: 192,
  panaderiaTortilleria: 188,
  salchichoneria: 182,
  frutasVerduras: 153,
  pescados: 182,
  recibo: 112,
  cisterna: 76,
  ctoBasura: 47,
};

//initial values for Formik
const initialValues = {
  fecha: "",
  horaInicio: "",
  horaFinal: "",
  nombreSucursal: "",
  noSucursal: "",
  nombreGerencia: "",
  nombreAIS: "",
  preguntas: generateQuestionObjects(35, initialPointsDepartments),
  puntosObtenidos: {},
  calificacionDpts: {},
  calificacionTotal: "",
};

//question objects for section 1
const questionsSection1 = [
  {
    index: 0,
    question:
      "1.- ¿El personal sabe que métodos de limpieza y sanitización aplicar para cada una de las necesidades de los departamentos? Pedir que algún empleado mencione 3 ejemplos diferentes.",
    points: 6,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 1,
    question: "2.- ¿Se utilizan sólo los productos químicos de limpieza y sanitización autorizados?",
    points: 3,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 2,
    question:
      "3.- ¿Las  superficies  que  están  en  contacto  con  las  manos  se  encuentran  limpias  y  desinfectadas  (perillas, botones, manijas, etc).",
    points: 6,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 3,
    question:
      "4.- ¿Las superficies o equipos que están en contacto directo con los alimentos se encuentran sin acumulación de suciedad?",
    points: 10,
    filterDepartments: "Recibo,Cto. de basura",
  },
  {
    index: 4,
    question:
      "5.- ¿Las  superficies  o  equipos  que  NO  están  en  contacto  directo  con  los  alimentos  se  encuentran  sin acumulación de suciedad?",
    points: 6,
    filterDepartments: "Cto. de basura",
  },
  {
    index: 5,
    question: "6.- ¿Se encuentran limpias las paredes, techos, pisos, tubería de los departamentos?",
    points: 3,
    filterDepartments: "",
  },
  {
    index: 6,
    question:
      "7.- ¿Se encuentran limpias las puertas, cortinas de metal, mallas en ventanas o respiraderos, cortinas de aire, guardapolvos o cortinas hawaianas?",
    points: 3,
    filterDepartments: "",
  },
  {
    index: 7,
    question:
      "8.- ¿Existe un área limpia, separada e identificada para productos no aptos para la venta, devoluciones, etc?",
    points: 3,
    filterDepartments: "Cisterna,Cto. de basura",
  },
  {
    index: 8,
    question:
      "9.- ¿Drenajes, rejillas o registros limpios y sin acumulación de residuos de alimentos y en buen estado?",
    points: 3,
    filterDepartments: "Cisterna,Cto. de basura",
  },
  {
    index: 9,
    question: "10.- ¿Los equipos lavalozas se encuentran limpios y con productos químicos disponibles?",
    points: 6,
    filterDepartments:
      "Carnes,Alimentos Preparados,Salchichonería,Frutas y verduras,Pescados,Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 10,
    question: "11.- ¿Los departamentos se encuentran libres de contaminación química?",
    points: 6,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 11,
    question: "12.- ¿Los departamentos se encuentran libres de contaminación física?",
    points: 6,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 12,
    question: "13.- ¿El personal de los departamentos evitan prácticas que causen contaminación cruzada?",
    points: 6,
    filterDepartments: "Frutas y verduras,Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 13,
    question:
      "14.- ¿Existen alimentos caducados, abollados, con abombamientos, con óxido, descompuestos o no aptos para su venta o uso en piso de venta, almacén de secos y cámaras?",
    points: 6,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 14,
    question:
      "15.- ¿Alimentos y recipientes colocados en anaqueles y tarimas a 15 cm sobre el nivel del piso, 10 cm de pared y techo?",
    points: 3,
    filterDepartments: "Cisterna,Cto. de basura",
  },
];

const FormatOne = () => {
  //React Hook State
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Function to get the obtained points for each department
   * @param {object} values Format object to send to firebase with the values
   * @returns An object with the obtained points for each department
   */
  const getObtainedPoints = (values) => {
    //initial obtained points
    const obtainedPoints = {
      carnes: 0,
      alimentosPreparados: 0,
      panaderiaTortilleria: 0,
      salchichoneria: 0,
      frutasVerduras: 0,
      pescados: 0,
      recibo: 0,
      cisterna: 0,
      ctoBasura: 0,
    };
    //itarate through each question
    values.preguntas.forEach((question) => {
      //sum the points of each departments for all questions
      obtainedPoints.carnes += parseInt(question.carnes);
      obtainedPoints.alimentosPreparados += parseInt(question.alimentosPreparados);
      obtainedPoints.panaderiaTortilleria += parseInt(question.panaderiaTortilleria);
      obtainedPoints.salchichoneria += parseInt(question.salchichoneria);
      obtainedPoints.frutasVerduras += parseInt(question.frutasVerduras);
      obtainedPoints.pescados += parseInt(question.pescados);
      obtainedPoints.recibo += parseInt(question.recibo);
      obtainedPoints.cisterna += parseInt(question.cisterna);
      obtainedPoints.ctoBasura += parseInt(question.ctoBasura);
    });

    return obtainedPoints;
  };

  /**
   * Function to get the raiting for each department
   * @param {object} obtainedPoints An object of the obtained points for each department
   * @returns An object containing the rating for each department
   */
  const getRatingDpts = (obtainedPoints) => {
    //raiting departments
    // puntos obtenidos / puntos posibles por departamento * 100
    const raitingDpts = {
      carnes: ((obtainedPoints.carnes / totalPointsDepartments.carnes) * 100).toFixed(1),
      alimentosPreparados: (
        (obtainedPoints.alimentosPreparados / totalPointsDepartments.alimentosPreparados) *
        100
      ).toFixed(1),
      panaderiaTortilleria: (
        (obtainedPoints.panaderiaTortilleria / totalPointsDepartments.panaderiaTortilleria) *
        100
      ).toFixed(1),
      salchichoneria: ((obtainedPoints.salchichoneria / totalPointsDepartments.salchichoneria) * 100).toFixed(
        1
      ),
      frutasVerduras: ((obtainedPoints.frutasVerduras / totalPointsDepartments.frutasVerduras) * 100).toFixed(
        1
      ),
      pescados: ((obtainedPoints.pescados / totalPointsDepartments.pescados) * 100).toFixed(1),
      recibo: ((obtainedPoints.recibo / totalPointsDepartments.recibo) * 100).toFixed(1),
      cisterna: ((obtainedPoints.cisterna / totalPointsDepartments.cisterna) * 100).toFixed(1),
      ctoBasura: ((obtainedPoints.ctoBasura / totalPointsDepartments.ctoBasura) * 100).toFixed(1),
    };

    return raitingDpts;
  };

  /**
   * Function to handle the submit of the form
   * @param {*} values The object containing the submitted values
   */
  const handleSubmit = async (values) => {
    //update state
    setIsLoading(true);

    //get obtained points
    const obtainedPoints = getObtainedPoints(values);
    values.puntosObtenidos = obtainedPoints;

    //get raiting for each department
    values.calificacionDpts = getRatingDpts(obtainedPoints);

    //get final raiting
    values.calificacionTotal = getFinalRating(obtainedPoints, totalPointsDepartments);

    //get final time
    values.horaFinal = generateFinalTime();

    //set data to firebase
    await addFormat1Answers(values);

    //update state
    setIsLoading(false);

    console.log(values);
  };

  //formik
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
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
        {questionsSection1.map((quesObj, idx) => (
          <Question
            key={idx}
            format1
            index={quesObj.index}
            question={quesObj.question}
            description="Selecciona un puntaje para cada departamento"
            points={quesObj.points}
            filterDepartments={quesObj.filterDepartments}
            values={formik.values.preguntas}
            handleChange={formik.handleChange}
            formik={formik}
          />
        ))}
        {/* 2 section */}
        <Section description="II. Control de registros" />

        <button type="submit" className="btnForm">
          Enviar
        </button>

        <div>{isLoading ? "Loading..." : null}</div>
      </form>
    </div>
  );
};

export default FormatOne;
