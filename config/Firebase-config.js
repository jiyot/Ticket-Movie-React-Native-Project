// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration - jiyot
// const firebaseConfig = {
//   apiKey: "AIzaSyAez3CM2N_F9Ds5-B8BRzx291E4729cVF0",
//   authDomain: "serviceapp-ea11a.firebaseapp.com",
//   projectId: "serviceapp-ea11a",
//   storageBucket: "serviceapp-ea11a.appspot.com",
//   messagingSenderId: "886476683215",
//   appId: "1:886476683215:web:11219971f12eac5d62c4ba"
// };


// Your web app's Firebase configuration - 
const firebaseConfig = {
    apiKey: "AIzaSyAez3CM2N_F9Ds5-B8BRzx291E4729cVF0",
    authDomain: "serviceapp-ea11a.firebaseapp.com",
    projectId: "serviceapp-ea11a",
    storageBucket: "serviceapp-ea11a.appspot.com",
    messagingSenderId: "886476683215",
    appId: "1:886476683215:web:11219971f12eac5d62c4ba"
  };
  

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);