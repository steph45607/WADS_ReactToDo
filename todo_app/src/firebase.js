// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArlugGLNFQF4wCSl7TvzGAS_53ly7I324",
  authDomain: "todo-app-311c3.firebaseapp.com",
  projectId: "todo-app-311c3",
  storageBucket: "todo-app-311c3.appspot.com",
  messagingSenderId: "755529537880",
  appId: "1:755529537880:web:c09dae9e530e32c8edad2d",
  measurementId: "G-TL959F9L13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db};