import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function addUserProfile(uid, profileData) {
  await setDoc(doc(db, "users", uid), profileData);
}