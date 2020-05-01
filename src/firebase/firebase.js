import Firebase from "firebase/app";
import credentials from "./credentials";

export default Firebase.initializeApp(credentials.config);
