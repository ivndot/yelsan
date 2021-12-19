import React from "react";
//styles
import "../css/Navbar.css";

//react router
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbarContainer">
    <div className="navbar">
      <Link to="/" className="navbar__link">
        <i className="fas fa-home link__icon"></i>
        <span className="link__route">Inicio</span>
      </Link>
      <Link to="/formato1" className="navbar__link">
        <i className="fas fa-file link__icon"></i>
        <span className="link__route">Formato 1</span>
      </Link>
      <Link to="/formato2" className="navbar__link">
        <i className="fas fa-file link__icon"></i>
        <span className="link__route">Formato 2</span>
      </Link>
      <Link to="/formato3" className="navbar__link">
        <i className="fas fa-file link__icon"></i>
        <span className="link__route">Formato 3</span>
      </Link>
      <Link to="/consulta" className="navbar__link">
        <i className="far fa-folder-open link__icon"></i>
        <span className="link__route">Consultar</span>
      </Link>
    </div>
  </nav>
);

export default Navbar;
