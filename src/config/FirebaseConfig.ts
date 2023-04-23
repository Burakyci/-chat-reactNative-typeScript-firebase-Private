import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNne1UDL4jRfCXuBNC0mbAx5nvJEk0pA4",
  authDomain: "chat-3b279.firebaseapp.com",
  projectId: "chat-3b279",
  storageBucket: "chat-3b279.appspot.com",
  messagingSenderId: "896667461433",
  appId: "1:896667461433:web:04d8185dd40e3a0c702ae8",
  measurementId: "G-DY9PV0DK56",
};

const fireApp = initializeApp(firebaseConfig);

export const fireAuth = getAuth(fireApp);
export const fireFunctions = getFunctions(fireApp);
export const db = getFirestore(fireApp);
export const storage = getStorage(fireApp);
export default fireApp;
