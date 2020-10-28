import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

console.log(firebaseConfig)
const firebaseApp = firebase.initializeApp(firebaseConfig);
/* const base = Rebase.createClass(app.database()); */

const db = firebaseApp.firestore()
const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db


