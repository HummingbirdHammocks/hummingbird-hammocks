const admin = require('firebase-admin');
const { doc, setDoc, getDoc, updateDoc, deleteDoc } = require('@firebase/firestore/lite');

const db = admin.firestore()

exports.saveDocumentGenerateID = async function (collectionName, data) {
    const docSnap = await db.collection(collectionName).add(data)
        .then(() => {
            return true
        })
        .catch((error) => {
            console.error('Error saving document: ', error);
            return false
        });
    return docSnap
}

exports.findInCollection = async function (collectionName, field, value) {
    const response = await db.collection(collectionName).where(field, "==", value)
        .get()
        .then((querySnapshot) => {
            let documents = []
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                documents.push(doc.data());
            });
            return documents
        })
        .catch((error) => {
            console.error('Error locating document: ', error);
            return false
        });
    return response
}