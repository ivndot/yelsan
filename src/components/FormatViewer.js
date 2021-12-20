import React from "react";
//styles
import "../css/FormatViewer.css";

//questions format 1
const questionsFormat1 = [
  "1.- ¿El personal sabe que métodos de limpieza y sanitización aplicar para cada una de las necesidades de los departamentos? Pedir que algún empleado mencione 3 ejemplos diferentes.",
  "2.- ¿Se utilizan sólo los productos químicos de limpieza y sanitización autorizados?",
  "3.- ¿Las  superficies  que  están  en  contacto  con  las  manos  se  encuentran  limpias  y  desinfectadas  (perillas, botones, manijas, etc).",
  "4.- ¿Las superficies o equipos que están en contacto directo con los alimentos se encuentran sin acumulación de suciedad?",
  "5.- ¿Las  superficies  o  equipos  que  NO  están  en  contacto  directo  con  los  alimentos  se  encuentran  sin acumulación de suciedad?",
  "6.- ¿Se encuentran limpias las paredes, techos, pisos, tubería de los departamentos?",
  "7.- ¿Se encuentran limpias las puertas, cortinas de metal, mallas en ventanas o respiraderos, cortinas de aire, guardapolvos o cortinas hawaianas?",
  "8.- ¿Existe un área limpia, separada e identificada para productos no aptos para la venta, devoluciones, etc?",
  "9.- ¿Drenajes, rejillas o registros limpios y sin acumulación de residuos de alimentos y en buen estado?",
  "10.- ¿Los equipos lavalozas se encuentran limpios y con productos químicos disponibles?",
  "11.- ¿Los departamentos se encuentran libres de contaminación química?",
  "12.- ¿Los departamentos se encuentran libres de contaminación física?",
  "13.- ¿El personal de los departamentos evitan prácticas que causen contaminación cruzada?",
  "14.- ¿Existen alimentos caducados, abollados, con abombamientos, con óxido, descompuestos o no aptos para su venta o uso en piso de venta, almacén de secos y cámaras?",
  "15.- ¿Alimentos y recipientes colocados en anaqueles y tarimas a 15 cm sobre el nivel del piso, 10 cm de pared y techo?",
  "16.- ¿Los  ingredientes,  materias  primas  y  productos  terminados  se encuentran  identificados y  llevan a  cabo el sistema PEPS dándoles una rotación adecuada?",
  "17.- ¿Los Empleados tienen una buena Higiene Personal?",
  "18.- ¿Los Empleados evitan salir de las áreas de proceso con su bata o mandil?",
  "19.- ¿Existe evidencia de consumo de alimentos o tabaco?",
  "20.- ¿Los Empleados se lavan las manos adecuadamente?",
  "21.- ¿El  departamento  cuenta  con  una  tarja  asignada  para  el  lavado  de  manos  con  agua  potable,  toallas desechables, jabón desinfectante, cepillo en solución desinfectante, bote de basura exclusivo con bolsa y tapa?",
  "22.- ¿El  departamento  cuenta  con  tarjas  o  recipientes  que  garanticen  que  se  realizan  los  tres  pasos  para  el lavado y sanitización de utensilios y partes removibles de los equipos?",
  "23.- ¿Los equipos o superficies de trabajo se encuentran en buen estado sin amarres, libres de oxidación, pintura (descarapelada),  cuñas o arreglos provisionales?",
  "24.- ¿Las puertas, cortinas de metal, mallas en ventanas o respiraderos, cortinas de aire, guardapolvos o cortinas hawaianas están en buen estado?",
  "25.- ¿Los  Empleados  saben  como  tomar  temperaturas  en  los  alimentos  en  vitrinas,  cámaras,  recibo,  etc adecuadamente y cada departamento cuenta con un termómetro?",
  "26.- ¿Los  alimentos  fríos  se  mantienen  a  temperaturas  por  debajo  de  los  5  C  en equipos  de almacenamiento, exhibición y venta (vitrinas, cámaras, refrigeradores, arcones promocionales, etc.)? En el departamento de Frutas y Verduras,  la temperatura máxima será 10 ° C, solo en vitrinas y cámaras de conservación.",
  "27.- ¿Los alimentos congelados se mantienen mínimo a -18 C en equipos de almacenamiento, exhibición y venta (vitrinas, cámaras, arcones promocionales, etc.)?",
  "28.- ¿Los alimentos calientes se mantienen mínimo a   60 C en equipos de almacenamiento, exhibición  y venta (vitrinas, baños maría, etc.)?",
  "29.- ¿Los botes de basura se encuentran limpios, con tapa y bolsa de plástico.",
  "30.- ¿Existe evidencia de plaga (roedores, excretas, cucarachas, moscas, grillos, pájaros, chapulines, etc)?",
  "31.- ¿El  departamento  presenta  fallas  estructurales  en  paredes,  techos,  pisos,  tubería  que  ayuden  a  que  las plagas se aniden?",
  "32.- ¿Se llevan adecuadamente las bitácoras, programas o registros que soporten adecuadamente las actividades realizadas? Y se almacenan en carpetas debidamente identificadas y resguardadas?",
  "32(a).- ¿Los  empleados  registran  en  los  programas  de  limpieza  las  actividades  que  realizan  y  cuentan  con  los documentos que avalen está información?.",
  "32(b).- ¿Los  empleados  llenan  adecuadamente  las  bitácoras  de  temperaturas  que  corresponden  a  cada departamento?.",
  "32(c).- ¿Se  lleva  a  cabo  el  registro  de  temperaturas  y  características  organolépticas  de  los  alimentos  en  las bitácoras correspondientes al momento de la recepción en la unidad?",
  "32(d).- ¿Se lleva a cabo el registro de limpieza y desinfección de la cisterna en la bitácora correspondiente?",
  "32(e).- ¿Se llevan  a cabo los análisis del Agua Potable y éstos son satisfactoríos?",
  "33.- ¿El departamento cuenta con los carteles de Acreditación en el MHA y el de Calificaciones obtenidas en la auditoría; actualizados y en buen estado?",
  "34.- ¿El  personal  de  Gerencia  acompaña  durante  todo  el  recorrido  de  la  revisión  de  Auditoría  de  Seguridad Alimentaria al Asesor?",
  "35.- ¿El personal de Gerencia realiza el plan de acción de la visita de auditoría?",
];

//questions format 2
const questionsFormat2 = [
  "1.- ¿La estación de lavado de manos cuenta con todos los implementos necesarios para realizar la técnica de lavado de manos?",
  "2.- ¿La  estación  de  lavado  de  utensilios  cuenta  con  tres   estaciones?.  Verificar   que  realmente   realicen  los   cinco  pasos: escamochar, lavar, enjuagar, sanitizar y secar al aire.",
  "3.- ¿Los colaboradores realizan correctamente la técnica de lavado y desinfección de frutas y verduras?",
  "4.- ¿Las superficies en contacto con los alimentos se encuentran limpias y sanitizadas?",
  "5.- ¿Las superficies que no están en contacto directo con los alimentos se encuentran limpias y sanitizadas?",
  "6.- ¿El  departamento  cuenta  con  todos  los  químicos  y  jarciería  de  limpieza  necesarios  y  autorizados  para realizar  la limpieza del área?",
  "7.- ¿El departamento cuenta con un programa de limpieza y los colaboradores lo conocen y ejecutan adecuadamente?",
  "8.- ¿El departamento se encuentra libre de riesgos o prácticas que puedan ser causa de contaminación Cruzada?",
  "9.- ¿El departamento se encuentra libre de riesgos o prácticas que puedan ser causa de contaminación Física?",
  "10.- ¿El departamento se encuentra libre de riesgos o prácticas que puedan ser causa de contaminación Química?",
  "11.- ¿Todos los alimentos se almacenan y exhiben en condiciones adecuadas, el etiquetado y la rotación son adecuados, de acuerdo al sistema PEPS? Recipientes íntegros, cerrados, con identificación, separados de piso y pared.",
  "12.- ¿Todos los alimentos que se encuentran dentro del departamento están en buen estado, con fecha de caducidad vigente? (ESTA PREGUNTA GENERA ALERTA AUTOMÁTICA)",
  "13.- ¿Todos los alimentos listos para consumo (ALC) son preparados y manipulados de forma segura?",
  "14.- ¿Los colaboradores tienen buenos hábitos de higiene personal durante la recepción, almacenamiento, preparación, exhibición y venta de alimentos?",
  "15.- ¿Los colaboradores efectúan correctamente el procedimiento de lavado de manos?",
  "16.- ¿Los colaboradores utilizan correctamente la cofia y/o red y el cubrebocas?",
  "17.- ¿El departamento cuenta con termómetro con la escala adecuada y saben como tomar temperaturas en los alimentos en vitrinas, cámaras, recibo, etc, adecuadamente?",
  "18.- ¿Los alimentos fríos se mantienen por debajo de los 5° C en equipos de almacenamiento, exhibición y venta (vitrinas, cámaras, bunker, etc.)?",
  "19.- ¿Los alimentos calientes se mantienen a 60°C mínimo? En equipos de exhibición y venta (vitrinas, baños maría, islas, etc.)",
  "20.- ¿Los alimentos congelados se mantienen mínimo a -15° C en equipos de almacenamiento, exhibición y venta (vitrinas, cámaras, bunker, etc.)?",
  "21.- ¿Se llevan adecuadamente las bitácoras? Verificar: Bitácoras de temperaturas, ajuste de termómetro, rastreabilidad, de recibo y características organolépticas.",
  "22.- ¿Todos los botes de basura se encuentran limpios, con tapa y bolsas de plástico?",
  "23.- ¿Las áreas se encuentran libres de evidencia de plaga (roedores, excretas, cucarachas, moscas, grillos, pájaros, chapulines, etc)? (ESTA PREGUNTA GENERA ALERTA AUTOMÁTICA)",
  "24.- ¿El departamento se encuentra libre de prácticas o condiciones que favorezcan la atracción y proliferación de plagas?",
  "25.- ¿El departamento se encuentra libre de fallas estructurales en paredes, pisos, techos, tuberías que dificulten la limpieza o faciliten la anidación de plagas?",
  "26.- ¿Los equipos utilizados para la recepción, el almacenamiento, elaboración y exhibición de los alimentos se encuentran en buen estado?",
  "27.- ¿La tienda cuenta con el plan de acción de la revisión anterior de Diversey, revisiones internas, bitácoras de limpieza de cisterna, anáIisis microbiológicos de agua, cloración de agua y el último servicio de fumigación? (ESTA PREGUNTA GENERA ALERTA AUTOMÁTICA)",
  "27.1.- (PLAN DE ACCIÓN INCOMPLETO) (REINCIDENCIAS) (FALTA DE SEGUIMIENTO)",
];

//questions format 3
const questionsFormat3 = [
  "1.- ¿Están despejadas y desbloqueadas las Salidas de Emergencia?",
  "2.- ¿Es posible Abrir la Salida de Emergencia en una única acción?",
  "3.- ¿Están las salidas de emergencia señalizadas?",
  "4.- ¿Las instalaciones tienen planos de evacuación actualizados y publicados?",
  "5.- ¿Están las vías de escape hacia salidas de emergencia claramente señalizadas?",
  "6.- ¿El Responsable de la tienda y sus reportes directos conocen el ancho libre mínimo que deben tener los pasillos de depósito/recepción para asegurar que las rutas de evacuación sean consideradas efectivamente libres?",
  "7.- ¿Están los pasillos del depósito/recepción libres (respetar el ancho libre exigido por la legislación local. En caso de no existir legislación local al respecto respetar un ancho mínimo de 1,20m) de obstrucciones?",
  "8.- ¿Están los extintores en su lugar y en buenas condiciones?",
  "9.- ¿Están los extintores desbloqueados?",
  "10.- ¿Están los extintores inspeccionados anualmente por una empresa externa especializada?",
  "11.- ¿Son los extintores inspeccionados mensualmente?",
  "12.- ¿Están los extintores adecuadamente señalizados?",
  "13.- Realice una Prueba de Alarmas de Incendio: ¿Suenan las alarmas cuando son accionadas? (pruebe al menos un pulsador de aviso de incendio)",
  "14.- ¿Están las bombas de incendio con el trablero de operación en modo automático?",
  "15.- ¿Existe algún asociado capacitado para realizar la prueba de arranque automático de las bombas de incendio?",
  "16.- Realizar prueba de arranque automático de las bombas de incendio: ¿Todas las bombas de incendio arrancan automáticamente al disminuir la presión de la instalación contra incendio?",
  "17.- ¿Conoce el responsable de la tienda y sus reportes directos el Procedimiento de 'Fire Watch-Alerta de Incendio' y qué debe hacerse mientras dure este proceso?",
  "18.- Están limpias las campanas de extracción y los conductos sobre los equipos de cocina (cocinas, hornos, freidoras, etc.)?",
  "19.- ¿Se ha realizado por lo menos un simulacro de evacuación en los últimos 12 meses?",
  "20.- ¿Saben los asociados qué hacer en caso de emergencia?",
  "21.- ¿Las máquinas de producción y las compactadoras de basura y de cartón tienen las protecciones adecuadas y los dispositivos de seguridad de corte en buenas condiciones?",
  "22.- ¿Se están utlizando en la tienda únicamente escaleras que cumplen con el estándar?",
  "23.- ¿Los asociados están utilizando las escaleras en forma correcta?",
  "24.- ¿Todos los dispositivos de seguridad para los hornos LPG están en su lugar y funcionan correctamente?",
  "25.- ¿Son utilizados únicamente prolongadores eléctricos (Extensiones) aprobados, con protección eléctrica contra sobrecarga, los mismos están etiquetados con fecha de colocación que no supera los 90 días y están enchufados a un tomacorrientes de pared?",
  "26.- ¿Todos los conductores de autoelevadores/montacargas (forklifts), tienen la licencia vigente y tiene la categoría autorizada del equipo que está manejando?",
  "27.- ¿Se realiza la inspección diaria de seguridad de autoelevadores/montacarga (forklifts)?",
  "28.- ¿Están los autoelevadores/montacargas (forklifts) en condiciones seguras de uso?",
  "29.- ¿Se cuenta con brigadas de emergencia equipadas, conformadas, actualizadas y capacitadas y distribuidas de tal modo que quedan cubiertos los diferentes turnos de trabajo.?",
  "30.- ¿Se cuenta con la revisión de la instalación de gas  de la unidad, efectuada por un externo de acuerdo a los requerimientos locales?",
  "31.- ¿Se utilizan permisos para realizar trabajos peligrosos? (Trabajos en alturas, en caliente, en espacios confinados y bloqueo y candadeo)",
  "32.- ¿Los asociados portan el EPP de acuerdo a su posición?",
  "33.- ¿El protocolo de candadeo se aplica en la maquinaria de producción? (Panadería, Tortillería y carnicería)",
];

const FormatViewer = (props) => {
  const { format, values, handleViewer } = props;

  const questions =
    format === "Formato 1"
      ? [...questionsFormat1]
      : format === "Formato 2"
      ? [...questionsFormat2]
      : format === "Formato 3"
      ? [...questionsFormat3]
      : null;

  return (
    <>
      {/* button to return */}
      <button type="button" onClick={() => handleViewer({ format: "", data: {} })} className="btnReturn">
        <i className="fas fa-arrow-left btnReturn__icon"></i>
        <span className="btnReturn__label">Regresar</span>
      </button>
      <div className="formatViewer">
        {/* header */}
        <ViewerHeader format={format} values={values} />
        {/* body */}
        {questions.map((question, idx) => (
          <QuestionViewer key={idx} question={question} answers={values.preguntas[idx]} format={format} />
        ))}
      </div>
    </>
  );
};

const ViewerHeader = (props) => {
  const { format, values } = props;
  let jsx = "";

  if (format === "Formato 1" || format === "Formato 2") {
    jsx = (
      <>
        <h1 className="title">Auditor&iacute;a de seguridad alimentaria</h1>
        <div className="header">
          <p className="header__title">Nombre de la sucursal:</p>
          <p className="header__value">{values.nombreSucursal}</p>
        </div>
        <div className="header">
          <p className="header__title">Número de sucursal:</p>
          <p className="header__value">{values.noSucursal}</p>
        </div>
        <div className="header">
          <p className="header__title">Nombre gerencia:</p>
          <p className="header__value">{values.nombreGerencia}</p>
        </div>
        <div className="header">
          <p className="header__title">Nombre del AIS:</p>
          <p className="header__value">{values.nombreAIS}</p>
        </div>
      </>
    );
  } else if (format === "Formato 3") {
    jsx = (
      <>
        <h1 className="title">Auditor&iacute;a de seguridad e higiene</h1>
        <div className="header">
          <p className="header__title">Nombre de la sucursal:</p>
          <p className="header__value">{values.nombreSucursal}</p>
        </div>
        <div className="header">
          <p className="header__title">Determinante de la sucursal:</p>
          <p className="header__value">{values.determinante}</p>
        </div>
        <div className="header">
          <p className="header__title">Nombre de quien atiende la visita:</p>
          <p className="header__value">{values.nombreAtiendeVisita}</p>
        </div>
        <div className="header">
          <p className="header__title">Cargo de quien atiende la visita:</p>
          <p className="header__value">{values.cargoAtiendeVisita}</p>
        </div>
        <div className="header">
          <p className="header__title">Nombre del AIS:</p>
          <p className="header__value">{values.nombreAIS}</p>
        </div>
      </>
    );
  }

  return (
    <div className="viewerHeader">
      {jsx}
      <div className="header">
        <p className="header__title">Fecha:</p>
        <p className="header__value">{values.fecha}</p>
      </div>
      <div className="header">
        <p className="header__title">Hora de inicio:</p>
        <p className="header__value">{values.horaInicio}</p>
      </div>
      <div className="header">
        <p className="header__title">Hora de finalizaci&oacute;n:</p>
        <p className="header__value">{values.horaFinal}</p>
      </div>
      <div className="header">
        <p className="header__title">Calificaci&oacute;n:</p>
        <p className="header__value">{values.calificacionTotal}</p>
      </div>
    </div>
  );
};

const QuestionViewer = (props) => {
  const { question, answers, format } = props;
  let jsx = "";

  //render different department for each format
  if (format === "Formato 1") {
    jsx = (
      <>
        <div className="answer">
          <p className="answer__label">Carnes</p>
          <p className="answer__value">{answers.carnes}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Alimentos preparados</p>
          <p className="answer__value">{answers.alimentosPreparados}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Panader&iacute;a y tortiller&iacute;a</p>
          <p className="answer__value">{answers.panaderiaTortilleria}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Salchichoner&iacute;a</p>
          <p className="answer__value">{answers.salchichoneria}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Frutas y verduras</p>
          <p className="answer__value">{answers.frutasVerduras}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Pescados</p>
          <p className="answer__value">{answers.pescados}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Recibo</p>
          <p className="answer__value">{answers.recibo}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Cisterna</p>
          <p className="answer__value">{answers.cisterna}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Cto. de basura</p>
          <p className="answer__value">{answers.ctoBasura}</p>
        </div>
      </>
    );
  } else if (format === "Formato 2") {
    jsx = (
      <>
        <div className="answer">
          <p className="answer__label">Carnes</p>
          <p className="answer__value">{answers.carnes}</p>
        </div>
        <div className="answer">
          <p className="answer__label">PyM</p>
          <p className="answer__value">{answers.pym}</p>
        </div>
        <div className="answer">
          <p className="answer__label">S, L y C</p>
          <p className="answer__value">{answers.slyc}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Frutas y verduras</p>
          <p className="answer__value">{answers.frutasVerduras}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Panader&iacute;a y chocolater&iacute;a</p>
          <p className="answer__value">{answers.panaderiaChocolateria}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Fte. de Sodas / Alim. Selecto / Tacos y Sushi</p>
          <p className="answer__value">{answers.fteSodasAlimSelectoTacosSushi}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Tortiller&iacute;a</p>
          <p className="answer__value">{answers.tortilleria}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Helados / Palomitas</p>
          <p className="answer__value">{answers.heladosPalomitas}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Caf&eacute;</p>
          <p className="answer__value">{answers.cafe}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Pizza y pasta</p>
          <p className="answer__value">{answers.pizzaPasta}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Jugos y frutas</p>
          <p className="answer__value">{answers.jugosFrutas}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Recibo</p>
          <p className="answer__value">{answers.recibo}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Cto. Basura y cart&oacute;n</p>
          <p className="answer__value">{answers.ctoBasura}</p>
        </div>
      </>
    );
  } else if (format === "Formato 3") {
    jsx = (
      <>
        <div className="answer">
          <p className="answer__label">Verde</p>
          <p className="answer__value">{answers.verde}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Amarillo</p>
          <p className="answer__value">{answers.amarillo}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Rojo</p>
          <p className="answer__value">{answers.rojo}</p>
        </div>
        <div className="answer">
          <p className="answer__label">Autofalla</p>
          <p className="answer__value">{answers.autofalla}</p>
        </div>
      </>
    );
  }

  return (
    <div className="question">
      <p className="question__label">{question}</p>
      <div className="answers">{jsx}</div>
    </div>
  );
};

export default FormatViewer;
