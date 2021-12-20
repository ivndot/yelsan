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

// initial points for each department in format 3
const initialPointsDepartments = {
  verde: "0",
  amarillo: "0",
  rojo: "0",
  autofalla: "",
};

//total points for each department
const totalPointsDepartments = {
  verde: 330,
  amarillo: 90,
  rojo: 160,
};

//initial values for Formik
const initialValues = {
  fecha: "",
  horaInicio: "",
  horaFinal: "",
  nombreSucursal: "",
  determinante: "",
  nombreAtiendeVisita: "",
  cargoAtiendeVisita: "",
  nombreAIS: "",
  preguntas: generateQuestionObjects(33, initialPointsDepartments),
  puntosObtenidos: {},
  calificacionDpts: {},
  calificacionTotal: "",
};

//questions section 1
const questionsSection1 = [
  {
    index: 0,
    question: "1.- ¿Están despejadas y desbloqueadas las Salidas de Emergencia?",
    points: 10,
    filterDepartments: "Amarillo,Rojo",
  },
  {
    index: 1,
    question: "2.- ¿Es posible Abrir la Salida de Emergencia en una única acción?",
    points: 10,
    filterDepartments: "Amarillo,Rojo",
  },
  {
    index: 2,
    question: "3.- ¿Están las salidas de emergencia señalizadas?",
    points: 10,
    filterDepartments: "Rojo,Autofalla",
  },
  {
    index: 3,
    question: "4.- ¿Las instalaciones tienen planos de evacuación actualizados y publicados?",
    points: 10,
    filterDepartments: "Amarillo",
  },
  {
    index: 4,
    question: "5.- ¿Están las vías de escape hacia salidas de emergencia claramente señalizadas?",
    points: 10,
    filterDepartments: "Amarillo",
  },
  {
    index: 5,
    question:
      "6.- ¿El Responsable de la tienda y sus reportes directos conocen el ancho libre mínimo que deben tener los pasillos de depósito/recepción para asegurar que las rutas de evacuación sean consideradas efectivamente libres?",
    points: 10,
    filterDepartments: "Rojo,Autofalla",
  },
  {
    index: 6,
    question:
      "7.- ¿Están los pasillos del depósito/recepción libres (respetar el ancho libre exigido por la legislación local. En caso de no existir legislación local al respecto respetar un ancho mínimo de 1,20m) de obstrucciones?",
    points: 10,
    filterDepartments: "Amarillo",
  },
  {
    index: 7,
    question: "8.- ¿Están los extintores en su lugar y en buenas condiciones?",
    points: 10,
    filterDepartments: "Amarillo",
  },
  {
    index: 8,
    question: "9.- ¿Están los extintores desbloqueados?",
    points: 10,
    filterDepartments: "Amarillo",
  },
  {
    index: 9,
    question: "10.- ¿Están los extintores inspeccionados anualmente por una empresa externa especializada?",
    points: 10,
    filterDepartments: "Amarillo",
  },
  {
    index: 10,
    question: "11.- ¿Son los extintores inspeccionados mensualmente?",
    points: 10,
    filterDepartments: "Rojo,Autofalla",
  },
  {
    index: 11,
    question: "12.- ¿Están los extintores adecuadamente señalizados?",
    points: 10,
    filterDepartments: "Rojo,Autofalla",
  },
  {
    index: 12,
    question:
      "13.- Realice una Prueba de Alarmas de Incendio: ¿Suenan las alarmas cuando son accionadas? (pruebe al menos un pulsador de aviso de incendio)",
    points: 10,
    filterDepartments: "Amarillo,Rojo",
  },
  {
    index: 13,
    question: "14.- ¿Están las bombas de incendio con el trablero de operación en modo automático?",
    points: 10,
    filterDepartments: "Amarillo,Rojo",
  },
  {
    index: 14,
    question:
      "15.- ¿Existe algún asociado capacitado para realizar la prueba de arranque automático de las bombas de incendio?",
    points: 10,
    filterDepartments: "Amarillo,Rojo",
  },
  {
    index: 15,
    question:
      "16.- Realizar prueba de arranque automático de las bombas de incendio: ¿Todas las bombas de incendio arrancan automáticamente al disminuir la presión de la instalación contra incendio?",
    points: 10,
    filterDepartments: "Amarillo,Rojo",
  },
  {
    index: 16,
    question:
      "17.- ¿Conoce el responsable de la tienda y sus reportes directos el Procedimiento de 'Fire Watch-Alerta de Incendio' y qué debe hacerse mientras dure este proceso?",
    points: 10,
    filterDepartments: "Rojo,Autofalla",
  },
  {
    index: 17,
    question:
      "18.- Están limpias las campanas de extracción y los conductos sobre los equipos de cocina (cocinas, hornos, freidoras, etc.)?",
    points: 10,
    filterDepartments: "Amarillo,Autofalla",
  },
  {
    index: 18,
    question: "19.- ¿Se ha realizado por lo menos un simulacro de evacuación en los últimos 12 meses?",
    points: 10,
    filterDepartments: "Amarillo,Autofalla",
  },
  {
    index: 19,
    question: "20.- ¿Saben los asociados qué hacer en caso de emergencia?",
    points: 10,
    filterDepartments: "Amarillo,Autofalla",
  },
  {
    index: 20,
    question:
      "21.- ¿Las máquinas de producción y las compactadoras de basura y de cartón tienen las protecciones adecuadas y los dispositivos de seguridad de corte en buenas condiciones?",
    points: 10,
    filterDepartments: "Amarillo,Autofalla",
  },
  {
    index: 21,
    question: "22.- ¿Se están utlizando en la tienda únicamente escaleras que cumplen con el estándar?",
    points: 10,
    filterDepartments: "Amarillo,Autofalla",
  },
  {
    index: 22,
    question: "23.- ¿Los asociados están utilizando las escaleras en forma correcta?",
    points: 10,
    filterDepartments: "Amarillo,Autofalla",
  },
  {
    index: 23,
    question:
      "24.- ¿Todos los dispositivos de seguridad para los hornos LPG están en su lugar y funcionan correctamente?",
    points: 10,
    filterDepartments: "Amarillo,Autofalla",
  },
  {
    index: 24,
    question:
      "25.- ¿Son utilizados únicamente prolongadores eléctricos (Extensiones) aprobados, con protección eléctrica contra sobrecarga, los mismos están etiquetados con fecha de colocación que no supera los 90 días y están enchufados a un tomacorrientes de pared?",
    points: 10,
    filterDepartments: "Rojo,Autofalla",
  },
  {
    index: 25,
    question:
      "26.- ¿Todos los conductores de autoelevadores/montacargas (forklifts), tienen la licencia vigente y tiene la categoría autorizada del equipo que está manejando?",
    points: 10,
    filterDepartments: "Amarillo,Autofalla",
  },
  {
    index: 26,
    question: "27.- ¿Se realiza la inspección diaria de seguridad de autoelevadores/montacarga (forklifts)?",
    points: 10,
    filterDepartments: "Rojo,Autofalla",
  },
  {
    index: 27,
    question: "28.- ¿Están los autoelevadores/montacargas (forklifts) en condiciones seguras de uso?",
    points: 10,
    filterDepartments: "Amarillo,Autofalla",
  },
  {
    index: 28,
    question:
      "29.- ¿Se cuenta con brigadas de emergencia equipadas, conformadas, actualizadas y capacitadas y distribuidas de tal modo que quedan cubiertos los diferentes turnos de trabajo.?",
    points: 10,
    filterDepartments: "Rojo,Autofalla",
  },
  {
    index: 29,
    question:
      "30.- ¿Se cuenta con la revisión de la instalación de gas  de la unidad, efectuada por un externo de acuerdo a los requerimientos locales?",
    points: 10,
    filterDepartments: "Rojo,Autofalla",
  },
  {
    index: 30,
    question:
      "31.- ¿Se utilizan permisos para realizar trabajos peligrosos? (Trabajos en alturas, en caliente, en espacios confinados y bloqueo y candadeo)",
    points: 10,
    filterDepartments: "Amarillo,Rojo",
  },
  {
    index: 31,
    question: "32.- ¿Los asociados portan el EPP de acuerdo a su posición?",
    points: 10,
    filterDepartments: "Amarillo,Autofalla",
  },
  {
    index: 32,
    question:
      "33.- ¿El protocolo de candadeo se aplica en la maquinaria de producción? (Panadería, Tortillería y carnicería)",
    points: 10,
    filterDepartments: "Amarillo,Rojo",
  },
];

const FormatThree = () => {
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
      verde: 0,
      amarillo: 0,
      rojo: 0,
    };
    //itarate through each question
    values.preguntas.forEach((question) => {
      //sum the points of each departments for all questions
      obtainedPoints.verde += parseInt(question.verde);
      obtainedPoints.amarillo += parseInt(question.amarillo);
      obtainedPoints.rojo += parseInt(question.rojo);
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
      verde: ((obtainedPoints.verde / totalPointsDepartments.verde) * 100).toFixed(1),
      amarillo: ((obtainedPoints.amarillo / totalPointsDepartments.amarillo) * 100).toFixed(1),
      rojo: ((obtainedPoints.rojo / totalPointsDepartments.rojo) * 100).toFixed(1),
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
    await addFormatAnswers(values, "formato3");

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
              format3={true}
              values={formik.values}
              handleChange={formik.handleChange}
              formik={formik}
            />
            {/* 1 section */}
            <Section description="I. Sección primera" />
            {/* questions */}
            {questionsSection1.map((quesObj, idx) => (
              <Question
                key={idx}
                format3
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

export default FormatThree;
