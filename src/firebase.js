import { initializeApp } from "firebase/app"

import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
const firebaseConfig = {

  apiKey: "AIzaSyAgWcKpdGrdBcWkEaW_KuIBLjiyo2CoTHk",

  authDomain: "tiem-nha-uyen.firebaseapp.com",

  projectId: "tiem-nha-uyen",

  storageBucket: "tiem-nha-uyen.firebasestorage.app",

  messagingSenderId: "868585400041",

  appId: "1:868585400041:web:0db9205a5fc054d58f3278"

}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const db = getFirestore(app)