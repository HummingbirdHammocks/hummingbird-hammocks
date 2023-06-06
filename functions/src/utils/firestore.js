const admin = require('firebase-admin');

const db = admin.firestore();

exports.saveDocumentGenerateID = async function (collectionName, data) {
  const docSnap = await db
    .collection(collectionName)
    .add(data)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error('Error saving document: ', error);
      return false;
    });
  return docSnap;
};

exports.findInCollection = async function (collectionName, field, value) {
  const response = await db
    .collection(collectionName)
    .where(field, '==', value)
    .get()
    .then((querySnapshot) => {
      const documents = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        documents.push(doc);
      });
      return documents;
    })
    .catch((error) => {
      console.error('Error locating document: ', error);
      return false;
    });
  return response;
};

exports.deleteDocument = async function (collectionName, id) {
  console.log(collectionName, id);
  await db
    .collection(collectionName)
    .doc(id)
    .delete()
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error('Error saving document: ', error);
      return false;
    });
};
