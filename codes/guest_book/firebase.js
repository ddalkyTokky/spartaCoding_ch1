import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  startAfter,
  limit,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import firebaseConfig from "../fbconfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const register = async (data) => {
  await addDoc(collection(db, "guest_book"), data);
};

const getGuestbook = async () => {
  const first = query(
    collection(db, "guest_book"),
    orderBy("createdAt", "desc"),
    limit(10)
  );
  const documentSnapshots = await getDocs(first);
  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return documentSnapshots;
};

let lastVisible = null;

const next = async () => {
  if(lastVisible !== undefined) {
    const first = query(
      collection(db, "guest_book"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(10)
    );
    const documentSnapshots = await getDocs(first);
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  
    return documentSnapshots;
  }
};

const deleteGuestbookItem = async (id) => {
  await deleteDoc(doc(db, "guest_book", id));
};

const updateGuestbookItem = async (id, data) => {
  console.log("updateGuestbookItem - data : ", data)
  await updateDoc(doc(db, "guest_book", id), data);
};

export {
  register,
  getGuestbook,
  next,
  deleteGuestbookItem,
  updateGuestbookItem,
};
