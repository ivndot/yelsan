import React, { useEffect, useState } from "react";
//firebase
import { getAllBranches, getAllFormats } from "../util/requests";
//components
import FormatCard from "./FormatCard";
//styles
import "../css/Consult.css";

const Consult = (props) => {
  /**
   * State Hooks
   */
  const [filters, setFilters] = useState({
    format: "",
    branch: "",
  });
  const [formats] = useState(["Formato 1", "Formato 2", "Formato 3"]);
  const [branches, setBranches] = useState([]);
  const [cards, setCards] = useState([]);

  //React Hooks - componentDidMount
  useEffect(() => {
    //make request with the values of format 1
    const fetchData = async () => {
      //update cards state
      //get format cards
      setCards(await getAllFormats());

      const firstBranches = await getAllBranches("formato1");
      //update branches state
      setBranches(firstBranches);
      //update filters state
      setFilters({
        format: "Formato 1",
        branch: firstBranches[0],
      });
    };
    fetchData();
  }, []);

  /**
   * Function to parse the format into a format number that could be query by firebase
   * @param {string} formatNumber The type of format, it could be [Formato 1, Formato 2, Formato 3]
   * @returns A string with the corresponding format number
   */
  const parseFormatNumber = (formatNumber) => {
    return formatNumber === "Formato 1"
      ? "formato1"
      : formatNumber === "Formato 2"
      ? "formato2"
      : formatNumber === "Formato 3"
      ? "formato3"
      : "formato1";
  };

  /**
   * Function to handle the submit form
   * @param {Event} e Event Listener
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filters);
  };

  /**
   * Function to handle change of Format select
   * @param {Event} e Event listener
   */
  const handleChangeFormat = async (e) => {
    const format = e.target.value;

    //get the format number
    const formatNumber = parseFormatNumber(format);

    //make request to get all branches
    const newBranches = await getAllBranches(formatNumber);
    //update branches state
    setBranches(newBranches);

    //update state branch
    setFilters({
      format,
      branch: newBranches[0],
    });
  };

  /**
   * Function to handle change of branch's filter
   * @param {Event} e Event listener
   */
  const handleChangeBranch = (e) => {
    //update state
    setFilters({
      format: filters.format,
      branch: e.target.value,
    });
  };

  /**
   * Function to view the result of the specified card
   * @param {number} id The id of the card
   */
  const viewCard = (id) => {
    console.log("ver card con el id: ", id);
  };

  return (
    <div className="containerConsult">
      <div className="consult">
        <h1 className="consult__title">Consulta de formatos</h1>
        <p className="consult__description">
          Consulta aqu&iacute; los formatos de las auditor&iacute;as realizadas.
        </p>
      </div>
      <div className="filtersContainer">
        <p className="filtersContainer__description">Filtrar por:</p>
        <form className="filters" onSubmit={handleSubmit}>
          {/* format filter */}
          <Filter
            name="format"
            label="Formato:"
            value={filters.format}
            handleChange={handleChangeFormat}
            options={formats}
          />
          {/* branch filter */}
          <Filter
            name="branch"
            label="Sucursal:"
            value={filters.branch}
            handleChange={handleChangeBranch}
            options={branches}
          />
          <button type="submit" className="btnFilter">
            <i className="fas fa-filter btnFilter__icon"></i>
            <span className="btnFilter__label">Filtrar</span>
          </button>
        </form>
      </div>
      <div className="cardsContainer">
        {cards.length === 0 ? (
          <div className="loadingCards">Cargando...</div>
        ) : (
          cards.map((card, idx) => (
            <FormatCard
              key={idx}
              format={card.format}
              branchName={card.nombreSucursal}
              branchNum={card.noSucursal}
              raiting={card.calificacionTotal}
              viewCard={() => viewCard(card.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const Filter = (props) => {
  const { name, label, value, handleChange, options } = props;
  return (
    <div className="filter">
      <label htmlFor={name} className="filter__label">
        {label}
      </label>
      <select name={name} id={name} value={value} onChange={handleChange} className="filter__select">
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Consult;
