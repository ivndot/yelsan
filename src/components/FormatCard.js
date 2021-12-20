import React from "react";
//styles
import "../css/FormatCard.css";

const FormatCard = (props) => {
  const { format, branchName, branchNum, raiting, viewCard } = props;

  /**
   * Function to get the status based on a given raiting
   * @param {string} raiting The final raiting obtained
   * @returns The name of the status class based on the raiting
   */
  const getRaitingStatus = (raiting) => {
    let status = "";
    //parse raiting to int
    const newRaiting = parseInt(raiting);

    if (format === "Formato 1") {
      status =
        newRaiting <= 75.9
          ? "status--red"
          : newRaiting >= 76 && newRaiting <= 90.9
          ? "status--green"
          : newRaiting >= 91 && newRaiting <= 100
          ? "status--yellow"
          : "";
    } else if (format === "Formato 2") {
      status =
        newRaiting <= 79.9
          ? "status--red"
          : newRaiting >= 80 && newRaiting <= 90.9
          ? "status--yellow"
          : newRaiting >= 91 && newRaiting <= 100
          ? "status--green"
          : "";
    } else if (format === "Formato 3") {
      status =
        newRaiting < 80
          ? "status--red"
          : newRaiting >= 80 && newRaiting <= 94.9
          ? "status--yellow"
          : newRaiting >= 95 && newRaiting <= 100
          ? "status--green"
          : "";
    }

    return status;
  };

  return (
    <div className="card" onClick={viewCard}>
      <div className="card__details">
        <h3 className="details__format">{format}</h3>
        <p className="details__branchName">{`Sucursal ${branchName}`}</p>
        <p className="details__branchNum">{`Número ${branchNum}`}</p>
      </div>
      <div className="card__raiting">
        <div className={`raiting__status ${getRaitingStatus(raiting)}`}></div>
        <span className="raiting__percent">{`Calificación: ${raiting}%`}</span>
      </div>
    </div>
  );
};

export default FormatCard;
