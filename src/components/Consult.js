import React, { useState } from "react";
//firebase
import { getAllBranches } from "../util/requests";

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

  /**
   * Function to handle change
   * @param {Event} e Event listener
   */
  const handleChange = async (e) => {
    //update state
    setFilters({
      [e.target.name]: e.target.value,
    });

    //made request to get all branches
    setBranches(await getAllBranches("formato1"));
  };

  return (
    <div className="containerConsult">
      <div className="consult">
        <h1 className="consult__title">Consulta de formatos</h1>
        <p className="consult__description">
          Consulta aqu&iacute; los formatos de las auditor&iacute;as realizadas.
        </p>
        <div className="filtersContainer">
          <p className="filter__description">Filtrar por:</p>
          <div className="filters">
            {/* format filter */}
            <Filter
              name="format"
              label="Formato"
              value={filters.format}
              handleChange={handleChange}
              options={["Selecciona", ...formats]}
            />
            {/* branch filter */}
            <Filter
              name="branch"
              label="Sucursal"
              value={filters.branch}
              handleChange={handleChange}
              options={["Selecciona", ...branches]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Filter = (props) => {
  const { name, label, value, handleChange, options } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} value={value} onChange={handleChange}>
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
