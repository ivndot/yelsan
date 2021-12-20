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
 * @param {string} formatNumber The format to get all its branches
 * @returns An array with the branches's names of the specified format(brand)
 */
const getAllBranches = async (formatNumber) => {
  let res = [];
  try {
    const formatRef = collection(db, formatNumber);
    // get all branches names
    const q = query(formatRef);

    //execute the query
    const querySnapshot = await getDocs(q);

    //iterate through the results
    querySnapshot.forEach((doc) => {
      //push the "nombreSucursal of each doc"
      res.push(doc.data().nombreSucursal);
    });

    return res;
  } catch (e) {
    console.error(e);
  }
};

/**
 * Function to get all the formats registered before
 * @returns An array of format objects
 */
const getAllFormats = async () => {
  let res = [];
  try {
    //collection references
    const format1Ref = collection(db, "formato1");
    const format2Ref = collection(db, "formato2");
    const format3Ref = collection(db, "formato3");

    //query to get all the docs
    const q1 = query(format1Ref);
    const q2 = query(format2Ref);
    const q3 = query(format3Ref);

    //execute querys
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    const querySnapshot3 = await getDocs(q3);

    //save the results in an array of objects
    querySnapshot1.forEach((doc) => {
      res.push({ id: doc.id, format: "Formato 1", ...doc.data() });
    });
    querySnapshot2.forEach((doc) => {
      res.push({ id: doc.id, format: "Formato 2", ...doc.data() });
    });
    querySnapshot3.forEach((doc) => {
      res.push({ id: doc.id, format: "Formato 3", ...doc.data() });
    });

    return res;
  } catch (e) {
    console.error(e);
  }
};

export { addFormat1Answers, getAllBranches, getAllFormats };
