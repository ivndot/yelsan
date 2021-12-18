/**
 * Function to generate an array of question objects
 * @param {number} number Number of questions objects to generate
 * @param {object} initialPointsDepartments Object with the initial points of each department
 * @returns An array of question objects
 */
const generateQuestionObjects = (number, initialPointsDepartments) => {
  const questions = [];
  for (let i = 0; i < number; i++) {
    questions.push(initialPointsDepartments);
  }
  return questions;
};

/**
 * Function to generate the final time
 * @returns A string with the time of submit
 */
const generateFinalTime = () => {
  const date = new Date();
  //time
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
};

/**
 * Function to get the final raiting of the audit
 * @param {object} obtainedPoints An object of the obtained points for each department
 * @param {object} totalPointsDepartments An object containing the total points for each department
 * @returns The final raiting of the audit
 */
const getFinalRating = (obtainedPoints, totalPointsDepartments) => {
  //get the sum of obtained points
  const totalObtainedPoints = Object.values(obtainedPoints).reduce((total, points) => total + points);

  //get the sum of points possible
  const totalPointsPossible = Object.values(totalPointsDepartments).reduce((total, points) => total + points);

  return ((totalObtainedPoints / totalPointsPossible) * 100).toFixed(1);
};

export { generateQuestionObjects, generateFinalTime, getFinalRating };
