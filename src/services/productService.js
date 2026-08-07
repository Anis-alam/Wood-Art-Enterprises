import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// ===============================
// Add Product
// ===============================

export async function addProduct(product) {
  return await addDoc(collection(db, "products"), product);
}

// ===============================
// Get All Products
// ===============================

export async function getProducts() {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ===============================
// Get Featured Products
// (No Firestore Index Required)
// ===============================

export async function getFeaturedProducts() {
  const products = await getProducts();

  return products.filter((product) => product.featured === true).slice(0, 8);
}

// ===============================
// Delete Product
// ===============================

export async function deleteProduct(id) {
  return await deleteDoc(doc(db, "products", id));
}

// ===============================
// Update Product
// ===============================

export async function updateProduct(id, data) {
  return await updateDoc(doc(db, "products", id), data);
}
