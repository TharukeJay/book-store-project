import {readLankaFirebaseAppData} from "./firebaseInit.js";

export const findUserByEmail = async (email) => {
    const userCollectionRef = readLankaFirebaseAppData.readLankaDB.collection("users")

    const snapshot = await userCollectionRef.where("email", "==", email).get()
    let userData;
    snapshot.forEach(result => {
        console.log("userdata =====> ", result.data());
        userData = result.data()
    })
    return userData;
}
