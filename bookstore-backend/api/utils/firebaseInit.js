import readLankaDbAdmin from "firebase-admin";
import credentials from "../utils/readlanka-c7718-firebase-adminsdk-pqukl-b48dbbd207.json" assert {type: "json"};

console.log("initializing......")
const readLankaFirebaseApp = readLankaDbAdmin.initializeApp(
    {
        credential: readLankaDbAdmin.credential.cert(credentials)
    },
    "first-app"
);

console.log("inside of the firebase init......")
const readLankaDB = readLankaFirebaseApp.firestore();

export const readLankaFirebaseAppData = {
    readLankaDB,
    readLankaFirebaseApp
};