import readLankaDbAdmin from "firebase-admin";
import credentials from "../../readlanka-c7718-firebase-adminsdk-pqukl-b48dbbd207.json" assert {type: "json"};

const readLankaFirebaseApp = readLankaDbAdmin.initializeApp(
    {
        credential: readLankaDbAdmin.credential.cert(credentials),
    },
    "first-app"
);
const readLankaDB = readLankaFirebaseApp.firestore();

export const readLankaFirebaseAppData = {
    readLankaDB,
    readLankaFirebaseApp
};
