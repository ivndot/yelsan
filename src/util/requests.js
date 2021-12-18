//firebase
import db from "./firebase";
import { addDoc, collection } from "firebase/firestore";

const addFormat1Answers = async (formatAnswers) => {
  try {
    await addDoc(collection(db, "formato1"), formatAnswers);
    console.log("format added");
  } catch (e) {
    console.error(e);
  }
};

export { addFormat1Answers };
