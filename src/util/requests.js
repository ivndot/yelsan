//firebase
import db from "./firebase";
import { addDoc, collection, query, getDocs } from "firebase/firestore";

const addFormat1Answers = async (formatAnswers) => {
  try {
    await addDoc(collection(db, "formato1"), formatAnswers);
    console.log("format added");
  } catch (e) {
    console.error(e);
  }
};

/**
 * Function to get all the branches in a specified format
 * @param {string} format The format to get all its branches
 */
const getAllBranches = async (format) => {
  let res = [];
  try {
    const formatRef = collection(db, format);
    // get all branches names
    const q = query(formatRef);

    //execute the query
    const querySnapshot = await getDocs(q);

    //iterate through the results
    querySnapshot.forEach((doc) => {
      res.push(doc.data().nombreSucursal);
    });

    return res;
  } catch (e) {
    console.error(e);
  }
};

export { addFormat1Answers, getAllBranches };
