import readLankaDbAdmin from "firebase-admin";
import credentials from "../../readlanka-c7718-firebase-adminsdk-pqukl-b48dbbd207.json" assert {type: "json"};
import {getStorage} from "firebase-admin/storage";

const readLankaFirebaseApp = readLankaDbAdmin.initializeApp(
    {
        credential: readLankaDbAdmin.credential.cert(credentials),
        storageBucket: "readlanka-c7718.appspot.com",
    },
    "first-app"
);
const readLankaDB = readLankaFirebaseApp.firestore();
const readLankaStorage = readLankaFirebaseApp.storage();
const readLankaStorageBucket = readLankaStorage.bucket();

export const readLankaFirebaseAppData = {
    readLankaDB,
    readLankaStorage,
    readLankaStorageBucket,
    readLankaFirebaseApp
};
