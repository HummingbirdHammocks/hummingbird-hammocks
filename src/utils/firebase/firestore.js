import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from './firebase-config';

export async function saveDocumentGenerateID(collectionName, data) {
  console.log(db());
  const docRef = await addDoc(collection(db(), collectionName), data)
    .then(() => {
      toast.success('Saved Successfully');
      return true;
    })
    .catch((error) => {
      toast.error('Error saving document: ', error);
      console.error('Error saving document: ', error);
      return false;
    });
  return docRef;
}

export async function saveDocument(collectionName, id, data) {
  const existingDoc = await getDocument(collectionName, id);
  if (existingDoc) {
    toast.error('ID already exists. Please use a different ID');
    return false;
  }
  const docSnap = await setDoc(doc(db(), collection, id), data)
    .then(() => {
      toast.success('Saved Successfully');
      return true;
    })
    .catch((error) => {
      toast.error('Error saving document: ', error);
      console.error('Error saving document: ', error);
      return false;
    });
  return docSnap;
}

export async function getDocument(collectionName, id) {
  const docSnap = await getDoc(doc(db(), collectionName, id));

  if (docSnap.exists()) {
    /* console.log("Document data:", docSnap.data()); */
    return docSnap.data();
  }
  return null;
}

export async function findInCollection(collectionName, field, value) {
  const q = await query(collection(db(), collectionName), where(field, '==', value));

  const querySnapshot = await getDocs(q);

  const documents = [];
  querySnapshot.forEach(function (doc) {
    // doc.data() is never undefined for query doc snapshots
    documents.push(doc.data());
  });

  return documents;
}

export async function updateDocument(collectionName, id, data) {
  const existingDoc = await getDocument(collectionName, id);
  if (!existingDoc) {
    toast.error('Document Not Found');
    return false;
  }
  const docSnap = await updateDoc(doc(db(), collection, id), data)
    .then(() => {
      toast.success('Saved Successfully');
      return true;
    })
    .catch((error) => {
      toast.error('Error updating document: ', error);
      console.error('Error updating document: ', error);
      return false;
    });
  return docSnap;
}

export async function getReference(reference) {
  const files = await reference.get();
  if (files) {
    /* console.log("Reference data:", files.data()); */
    return files.data();
  }
  return null;
}

export async function getCollection(collectionName) {
  const collectionRef = db().collection(collectionName);
  const snapshot = await collectionRef.get();
  return snapshot;
}

export async function deleteDocument(collectionName, id) {
  await deleteDoc(doc(db(), collectionName, id))
    .then((data) => {
      toast.success('Deleted Successfully');
      return data;
    })
    .catch((error) => {
      toast.error('Error deleting document: ', error);
      console.error('Error deleting document: ', error);
      return false;
    });
}
