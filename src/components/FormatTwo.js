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

//initial points for each department in format 2
const initialPointsDepartments = {
  carnes: "0",
  pym: "0",
  slyc: "0",
  frutasVerduras: "0",
  panaderiaChocolateria: "0",
  fteSodasAlimSelectoTacosSushi: "0",
  tortilleria: "0",
  heladosPalomitas: "0",
  cafe: "0",
  pizzaPasta: "0",
  jugosFrutas: "0",
  recibo: "0",
  ctoBasura: "0",
};

//total points for each department
const totalPointsDepartments = {
  carnes: 223,
  pym: 233,
  slyc: 233,
  frutasVerduras: 223,
  panaderiaChocolateria: 233,
  fteSodasAlimSelectoTacosSushi: 243,
  tortilleria: 177,
  heladosPalomitas: 203,
  cafe: 233,
  pizzaPasta: 243,
  jugosFrutas: 223,
  recibo: 173,
  ctoBasura: 68,
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
  preguntas: generateQuestionObjects(28, initialPointsDepartments),
  puntosObtenidos: {},
  calificacionDpts: {},
  calificacionTotal: "",
};

//questions section 1
const questionsSection1 = [
  {
    index: 0,
    question:
      "1.- ¿La estación de lavado de manos cuenta con todos los implementos necesarios para realizar la técnica de lavado de manos?",
    points: 10,
    filterDepartments: "Helados / Palomitas,Recibo,Cto. Basura y cartón",
  },
  {
    index: 1,
    question:
      "2.- ¿La  estación  de  lavado  de  utensilios  cuenta  con  tres   estaciones?.  Verificar   que  realmente   realicen  los   cinco  pasos: escamochar, lavar, enjuagar, sanitizar y secar al aire.",
    points: 10,
    filterDepartments: "Cto. Basura y cartón",
  },
  {
    index: 2,
    question:
      "3.- ¿Los colaboradores realizan correctamente la técnica de lavado y desinfección de frutas y verduras?",
    points: 10,
    filterDepartments: "Tortillería,Helados / Palomitas,Recibo,Cto. Basura y cartón",
  },
  {
    index: 3,
    question: "4.- ¿Las superficies en contacto con los alimentos se encuentran limpias y sanitizadas?",
    points: 10,
    filterDepartments: "Recibo,Cto. Basura y cartón",
  },
  {
    index: 4,
    question:
      "5.- ¿Las superficies que no están en contacto directo con los alimentos se encuentran limpias y sanitizadas?",
    points: 6,
    filterDepartments: "",
  },
  {
    index: 5,
    question:
      "6.- ¿El  departamento  cuenta  con  todos  los  químicos  y  jarciería  de  limpieza  necesarios  y  autorizados  para realizar  la limpieza del área?",
    points: 10,
    filterDepartments: "",
  },
  {
    index: 6,
    question:
      "7.- ¿El departamento cuenta con un programa de limpieza y los colaboradores lo conocen y ejecutan adecuadamente?",
    points: 10,
    filterDepartments: "",
  },
];

//questions section 2
const questionsSection2 = [
  {
    index: 7,
    question:
      "8.- ¿El departamento se encuentra libre de riesgos o prácticas que puedan ser causa de contaminación Cruzada?",
    points: 10,
    filterDepartments: "Cto. Basura y cartón",
  },
  {
    index: 8,
    question:
      "9.- ¿El departamento se encuentra libre de riesgos o prácticas que puedan ser causa de contaminación Física?",
    points: 10,
    filterDepartments: "Cto. Basura y cartón",
  },
  {
    index: 9,
    question:
      "10.- ¿El departamento se encuentra libre de riesgos o prácticas que puedan ser causa de contaminación Química?",
    points: 10,
    filterDepartments: "Cto. Basura y cartón",
  },
  {
    index: 10,
    question:
      "11.- ¿Todos los alimentos se almacenan y exhiben en condiciones adecuadas, el etiquetado y la rotación son adecuados, de acuerdo al sistema PEPS? Recipientes íntegros, cerrados, con identificación, separados de piso y pared.",
    points: 10,
    filterDepartments: "Recibo,Cto. Basura y cartón",
  },
  {
    index: 11,
    question:
      "12.- ¿Todos los alimentos que se encuentran dentro del departamento están en buen estado, con fecha de caducidad vigente? (ESTA PREGUNTA GENERA ALERTA AUTOMÁTICA)",
    points: 10,
    filterDepartments: "Recibo,Cto. Basura y cartón",
  },
  {
    index: 12,
    question:
      "13.- ¿Todos los alimentos listos para consumo (ALC) son preparados y manipulados de forma segura?",
    points: 10,
    filterDepartments: "Carnes,Tortillería,Helados / Palomitas,Recibo,Cto. Basura y cartón",
  },
];

//questions section 3
const questionsSection3 = [
  {
    index: 13,
    question:
      "14.- ¿Los colaboradores tienen buenos hábitos de higiene personal durante la recepción, almacenamiento, preparación, exhibición y venta de alimentos?",
    points: 10,
    filterDepartments: "Cto. Basura y cartón",
  },
  {
    index: 14,
    question: "15.- ¿Los colaboradores efectúan correctamente el procedimiento de lavado de manos?",
    points: 10,
    filterDepartments: "Cto. Basura y cartón",
  },
  {
    index: 15,
    question: "16.- ¿Los colaboradores utilizan correctamente la cofia y/o red y el cubrebocas?",
    points: 6,
    filterDepartments: "Cto. Basura y cartón",
  },
];

//questions section 4
const questionsSection4 = [
  {
    index: 16,
    question:
      "17.- ¿El departamento cuenta con termómetro con la escala adecuada y saben como tomar temperaturas en los alimentos en vitrinas, cámaras, recibo, etc, adecuadamente?",
    points: 6,
    filterDepartments: "Tortillería,Cto. Basura y cartón",
  },
  {
    index: 17,
    question:
      "18.- ¿Los alimentos fríos se mantienen por debajo de los 5° C en equipos de almacenamiento, exhibición y venta (vitrinas, cámaras, bunker, etc.)?",
    points: 10,
    filterDepartments: "Tortillería,Cto. Basura y cartón",
  },
  {
    index: 18,
    question:
      "19.- ¿Los alimentos calientes se mantienen a 60°C mínimo? En equipos de exhibición y venta (vitrinas, baños maría, islas, etc.)",
    points: 10,
    filterDepartments:
      "Carnes,PyM,S L y C,Frutas y verduras,Panadería y chocolatería,Tortillería,Helados / Palomitas,Café,Jugos y frutas,Recibo,Cto. Basura y cartón",
  },
  {
    index: 19,
    question:
      "20.- ¿Los alimentos congelados se mantienen mínimo a -15° C en equipos de almacenamiento, exhibición y venta (vitrinas, cámaras, bunker, etc.)?",
    points: 10,
    filterDepartments: "Frutas y verduras,Tortillería,Jugos y frutas,Cto. Basura y cartón",
  },
  {
    index: 20,
    question:
      "21.- ¿Se llevan adecuadamente las bitácoras? Verificar: Bitácoras de temperaturas, ajuste de termómetro, rastreabilidad, de recibo y características organolépticas.",
    points: 10,
    filterDepartments: "Tortillería,Cto. Basura y cartón",
  },
];

//questions section 5
const questionsSection5 = [
  {
    index: 21,
    question: "22.- ¿Todos los botes de basura se encuentran limpios, con tapa y bolsas de plástico?",
    points: 6,
    filterDepartments: "",
  },
  {
    index: 22,
    question:
      "23.- ¿Las áreas se encuentran libres de evidencia de plaga (roedores, excretas, cucarachas, moscas, grillos, pájaros, chapulines, etc)? (ESTA PREGUNTA GENERA ALERTA AUTOMÁTICA)",
    points: 10,
    filterDepartments: "",
  },
  {
    index: 23,
    question:
      "24.- ¿El departamento se encuentra libre de prácticas o condiciones que favorezcan la atracción y proliferación de plagas?",
    points: 3,
    filterDepartments: "",
  },
  {
    index: 24,
    question:
      "25.- ¿El departamento se encuentra libre de fallas estructurales en paredes, pisos, techos, tuberías que dificulten la limpieza o faciliten la anidación de plagas?",
    points: 3,
    filterDepartments: "",
  },
  {
    index: 25,
    question:
      "26.- ¿Los equipos utilizados para la recepción, el almacenamiento, elaboración y exhibición de los alimentos se encuentran en buen estado?",
    points: 3,
    filterDepartments: "Cto. Basura y cartón",
  },
];

//questions section 6
const questionsSection6 = [
  {
    index: 26,
    question:
      "27.- ¿La tienda cuenta con el plan de acción de la revisión anterior de Diversey, revisiones internas, bitácoras de limpieza de cisterna, anáIisis microbiológicos de agua, cloración de agua y el último servicio de fumigación? (ESTA PREGUNTA GENERA ALERTA AUTOMÁTICA)",
    points: 20,
    filterDepartments: "",
  },
  {
    index: 27,
    question: "27.1.- (PLAN DE ACCIÓN INCOMPLETO) (REINCIDENCIAS) (FALTA DE SEGUIMIENTO)",
    points: 0,
    filterDepartments: "",
  },
];

const FormatTwo = () => {
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
      pym: 0,
      slyc: 0,
      frutasVerduras: 0,
      panaderiaChocolateria: 0,
      fteSodasAlimSelectoTacosSushi: 0,
      tortilleria: 0,
      heladosPalomitas: 0,
      cafe: 0,
      pizzaPasta: 0,
      jugosFrutas: 0,
      recibo: 0,
      ctoBasura: 0,
    };
    //itarate through each question
    values.preguntas.forEach((question) => {
      //sum the points of each department for all questions
      obtainedPoints.carnes += parseInt(question.carnes);
      obtainedPoints.pym += parseInt(question.pym);
      obtainedPoints.slyc += parseInt(question.slyc);
      obtainedPoints.frutasVerduras += parseInt(question.frutasVerduras);
      obtainedPoints.panaderiaChocolateria += parseInt(question.panaderiaChocolateria);
      obtainedPoints.fteSodasAlimSelectoTacosSushi += parseInt(question.fteSodasAlimSelectoTacosSushi);
      obtainedPoints.tortilleria += parseInt(question.tortilleria);
      obtainedPoints.heladosPalomitas += parseInt(question.heladosPalomitas);
      obtainedPoints.cafe += parseInt(question.cafe);
      obtainedPoints.pizzaPasta += parseInt(question.pizzaPasta);
      obtainedPoints.jugosFrutas += parseInt(question.jugosFrutas);
      obtainedPoints.recibo += parseInt(question.recibo);
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
      pym: ((obtainedPoints.pym / totalPointsDepartments.pym) * 100).toFixed(1),
      slyc: ((obtainedPoints.slyc / totalPointsDepartments.slyc) * 100).toFixed(1),
      frutasVerduras: ((obtainedPoints.frutasVerduras / totalPointsDepartments.frutasVerduras) * 100).toFixed(
        1
      ),
      panaderiaChocolateria: (
        (obtainedPoints.panaderiaChocolateria / totalPointsDepartments.panaderiaChocolateria) *
        100
      ).toFixed(1),
      fteSodasAlimSelectoTacosSushi: (
        (obtainedPoints.fteSodasAlimSelectoTacosSushi /
          totalPointsDepartments.fteSodasAlimSelectoTacosSushi) *
        100
      ).toFixed(1),
      tortilleria: ((obtainedPoints.tortilleria / totalPointsDepartments.tortilleria) * 100).toFixed(1),
      heladosPalomitas: (
        (obtainedPoints.heladosPalomitas / totalPointsDepartments.heladosPalomitas) *
        100
      ).toFixed(1),
      cafe: ((obtainedPoints.cafe / totalPointsDepartments.cafe) * 100).toFixed(1),
      pizzaPasta: ((obtainedPoints.pizzaPasta / totalPointsDepartments.pizzaPasta) * 100).toFixed(1),
      jugosFrutas: ((obtainedPoints.jugosFrutas / totalPointsDepartments.jugosFrutas) * 100).toFixed(1),
      recibo: ((obtainedPoints.recibo / totalPointsDepartments.recibo) * 100).toFixed(1),
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
    await addFormatAnswers(values, "formato2");

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
            <Section description="I. Limpieza y sanitización" />
            {/* questions */}
            {questionsSection1.map((quesObj, idx) => (
              <Question
                key={idx}
                format2
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
            <Section description="II. Manejo de alimentos" />
            {/* questions */}
            {questionsSection2.map((quesObj, idx) => (
              <Question
                key={idx}
                format2
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
            <Section description="III. Higiene personal" />
            {/* questions */}
            {questionsSection3.map((quesObj, idx) => (
              <Question
                key={idx}
                format2
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
            {/* 4 section */}
            <Section description="IV. Control de temperaturas" />
            {/* questions */}
            {questionsSection4.map((quesObj, idx) => (
              <Question
                key={idx}
                format2
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
            {/* 5 section */}
            <Section description="V. Control de plagas" />
            {/* questions */}
            {questionsSection5.map((quesObj, idx) => (
              <Question
                key={idx}
                format2
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
            {/* 6 section */}
            <Section description="VI. Gerencia" />
            {/* questions */}
            {questionsSection6.map((quesObj, idx) => (
              <Question
                key={idx}
                format2
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

export default FormatTwo;
