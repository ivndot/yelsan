import React from "react";
import WaveIcon from "../assets/wave";
//styles
import "../css/Home.css";

const Home = () => (
  <>
    <section className="container">
      <WaveIcon />
      <section className="container__content">
        <h1 className="title-yelsan">YELSAN</h1>
        <p className="welcome">¡Bienvenido!</p>
        <p className="description">
          Escoge un formato para hacer una auditor&iacute;a o consulta alg&uacute;n formato anteriormente
          realizado.
        </p>
      </section>
    </section>
  </>
);

export default Home;
