import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}
