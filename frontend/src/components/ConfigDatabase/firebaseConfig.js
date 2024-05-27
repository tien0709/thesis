import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


// import {...} from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCEw_-d2mBtBvUAw9Qe86nmEEXxRe9pz8k",
    authDomain: "smarthome-92b52.firebaseapp.com",
    databaseURL: "https://smarthome-92b52-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smarthome-92b52",
    storageBucket: "smarthome-92b52.appspot.com",
    messagingSenderId: "119873366940",
    appId: "1:119873366940:web:5a1657656393caea277659",
    measurementId: "G-68LXM19SMC"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
