import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// ===============================
// Add Category
// ===============================

export async function addCategory(name) {
  try {
    return await addDoc(collection(db, "categories"), {
      name: name.trim(),
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
}

// ===============================
// Get Categories
// ===============================

export async function getCategories() {
  try {
    const q = query(collection(db, "categories"), orderBy("name", "asc"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error loading categories:", error);
    return [];
  }
}

// ===============================
// Delete Category
// ===============================

export async function deleteCategory(id) {
  try {
    await deleteDoc(doc(db, "categories", id));
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}
