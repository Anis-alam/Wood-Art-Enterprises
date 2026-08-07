import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// ===============================
// Add Enquiry
// ===============================

export async function addEnquiry(data) {
  return await addDoc(collection(db, "enquiries"), data);
}

// ===============================
// Get All Enquiries
// ===============================

export async function getEnquiries() {
  const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

// ===============================
// Delete Enquiry
// ===============================

export async function deleteEnquiry(id) {
  return await deleteDoc(doc(db, "enquiries", id));
}
