import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
//components
import FormatHeader from "./FormatHeader";
import Question from "./Question";
import Section from "./Section";
import Loading from "./Loading";
import { addFormatAnswers } from "../util/requests";
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
  carnes: 202,
  alimentosPreparados: 212,
  panaderiaTortilleria: 208,
  salchichoneria: 202,
  frutasVerduras: 186,
  pescados: 202,
  recibo: 112,
  cisterna: 86,
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
  preguntas: generateQuestionObjects(40, initialPointsDepartments),
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
  {
    index: 15,
    question:
      "16.- ¿Los  ingredientes,  materias  primas  y  productos  terminados  se encuentran  identificados y  llevan a  cabo el sistema PEPS dándoles una rotación adecuada?",
    points: 6,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 16,
    question: "17.- ¿Los Empleados tienen una buena Higiene Personal?",
    points: 8,
    filterDepartments: "Cisterna,Cto. de basura",
  },
  {
    index: 17,
    question: "18.- ¿Los Empleados evitan salir de las áreas de proceso con su bata o mandil?",
    points: 6,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 18,
    question: "19.- ¿Existe evidencia de consumo de alimentos o tabaco?",
    points: 3,
    filterDepartments: "Cto. de basura",
  },
  {
    index: 19,
    question: "20.- ¿Los Empleados se lavan las manos adecuadamente?",
    points: 3,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 20,
    question:
      "21.- ¿El  departamento  cuenta  con  una  tarja  asignada  para  el  lavado  de  manos  con  agua  potable,  toallas desechables, jabón desinfectante, cepillo en solución desinfectante, bote de basura exclusivo con bolsa y tapa?",
    points: 3,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 21,
    question:
      "22.- ¿El  departamento  cuenta  con  tarjas  o  recipientes  que  garanticen  que  se  realizan  los  tres  pasos  para  el lavado y sanitización de utensilios y partes removibles de los equipos?",
    points: 3,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 22,
    question:
      "23.- ¿Los equipos o superficies de trabajo se encuentran en buen estado sin amarres, libres de oxidación, pintura (descarapelada),  cuñas o arreglos provisionales?",
    points: 3,
    filterDepartments: "Cto. de basura",
  },
  {
    index: 23,
    question:
      "24.- ¿Las puertas, cortinas de metal, mallas en ventanas o respiraderos, cortinas de aire, guardapolvos o cortinas hawaianas están en buen estado?",
    points: 3,
    filterDepartments: "",
  },
  {
    index: 24,
    question:
      "25.- ¿Los  Empleados  saben  como  tomar  temperaturas  en  los  alimentos  en  vitrinas,  cámaras,  recibo,  etc adecuadamente y cada departamento cuenta con un termómetro?",
    points: 6,
    filterDepartments: "Cisterna,Cto. de basura",
  },
  {
    index: 25,
    question:
      "26.- ¿Los  alimentos  fríos  se  mantienen  a  temperaturas  por  debajo  de  los  5  C  en equipos  de almacenamiento, exhibición y venta (vitrinas, cámaras, refrigeradores, arcones promocionales, etc.)? En el departamento de Frutas y Verduras,  la temperatura máxima será 10 ° C, solo en vitrinas y cámaras de conservación.",
    points: 10,
    filterDepartments: "Cisterna,Cto. de basura",
  },
  {
    index: 26,
    question:
      "27.- ¿Los alimentos congelados se mantienen mínimo a -18 C en equipos de almacenamiento, exhibición y venta (vitrinas, cámaras, arcones promocionales, etc.)?",
    points: 10,
    filterDepartments: "Frutas y verduras,Cisterna,Cto. de basura",
  },
  {
    index: 27,
    question:
      "28.- ¿Los alimentos calientes se mantienen mínimo a   60 C en equipos de almacenamiento, exhibición  y venta (vitrinas, baños maría, etc.)?",
    points: 10,
    filterDepartments:
      "Carnes,Panadería y tortillería,Salchichonería,Frutas y verduras,Pescados,Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 28,
    question: "29.- ¿Los botes de basura se encuentran limpios, con tapa y bolsa de plástico.",
    points: 3,
    filterDepartments: "Cisterna",
  },
  {
    index: 29,
    question:
      "30.- ¿Existe evidencia de plaga (roedores, excretas, cucarachas, moscas, grillos, pájaros, chapulines, etc)?",
    points: 8,
    filterDepartments: "",
  },
  {
    index: 30,
    question:
      "31.- ¿El  departamento  presenta  fallas  estructurales  en  paredes,  techos,  pisos,  tubería  que  ayuden  a  que  las plagas se aniden?",
    points: 3,
    filterDepartments: "",
  },
];

//question objects for section 2
const questionsSection2 = [
  {
    index: 31,
    question:
      "32.- ¿Se llevan adecuadamente las bitácoras, programas o registros que soporten adecuadamente las actividades realizadas? Y se almacenan en carpetas debidamente identificadas y resguardadas?",
    points: 10,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 32,
    question:
      "32(a).- ¿Los  empleados  registran  en  los  programas  de  limpieza  las  actividades  que  realizan  y  cuentan  con  los documentos que avalen está información?.",
    points: 10,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 33,
    question:
      "32(b).- ¿Los  empleados  llenan  adecuadamente  las  bitácoras  de  temperaturas  que  corresponden  a  cada departamento?.",
    points: 10,
    filterDepartments: "Recibo,Cisterna,Cto. de basura",
  },
  {
    index: 34,
    question:
      "32(c).- ¿Se  lleva  a  cabo  el  registro  de  temperaturas  y  características  organolépticas  de  los  alimentos  en  las bitácoras correspondientes al momento de la recepción en la unidad?",
    points: 10,
    filterDepartments:
      "Carnes,Alimentos Preparados,Panadería y tortillería,Salchichonería,Frutas y verduras,Pescados,Cisterna,Cto. de basura",
  },
  {
    index: 35,
    question:
      "32(d).- ¿Se lleva a cabo el registro de limpieza y desinfección de la cisterna en la bitácora correspondiente?",
    points: 10,
    filterDepartments:
      "Carnes,Alimentos Preparados,Panadería y tortillería,Salchichonería,Frutas y verduras,Pescados,Recibo,Cto. de basura",
  },
  {
    index: 36,
    question: "32(e).- ¿Se llevan  a cabo los análisis del Agua Potable y éstos son satisfactoríos?",
    points: 10,
    filterDepartments:
      "Carnes,Alimentos Preparados,Panadería y tortillería,Salchichonería,Frutas y verduras,Pescados,Recibo,Cto. de basura",
  },
  {
    index: 37,
    question:
      "33.- ¿El departamento cuenta con los carteles de Acreditación en el MHA y el de Calificaciones obtenidas en la auditoría; actualizados y en buen estado?",
    points: 6,
    filterDepartments: "",
  },
];

//questioin objects for section 3
const questionsSection3 = [
  {
    index: 38,
    question:
      "34.- ¿El  personal  de  Gerencia  acompaña  durante  todo  el  recorrido  de  la  revisión  de  Auditoría  de  Seguridad Alimentaria al Asesor?",
    points: 10,
    filterDepartments: "",
  },
  {
    index: 39,
    question: "35.- ¿El personal de Gerencia realiza el plan de acción de la visita de auditoría?",
    points: 8,
    filterDepartments: "",
  },
];

const FormatOne = () => {
  //React Hook State
  const [isLoading, setIsLoading] = useState(false);
  const [isDataSend, setIsDataSend] = useState(false);

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
    await addFormatAnswers(values, "formato1");

    //update state
    setIsLoading(false);

    //update state to redirect to consulta
    setIsDataSend(true);
    console.log(values);
  };

  //formik
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <>
      {/* redirec to consult */}
      {isDataSend ? <Navigate replace to="/consulta" /> : null}
      {/* loading modal */}
      {isLoading ? (
        <Loading />
      ) : (
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
            {/* questions */}
            {questionsSection2.map((quesObj, idx) => (
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
            {/* 3 section */}
            <Section description="III. Participación gerencial por departamento" />
            {/* questions */}
            {questionsSection3.map((quesObj, idx) => (
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
            <button type="submit" className="btnForm">
              Enviar
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FormatOne;
