import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZ-0DheZo0sMSbIZmdcb7v1J1IKBwAULM",
  authDomain: "vs-saude.firebaseapp.com",
  projectId: "vs-saude",
  storageBucket: "vs-saude.appspot.com",
  messagingSenderId: "181076803449",
  appId: "1:181076803449:web:e77ca85fcba60a428779a8",
  measurementId: "G-LGH62J00F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence to LOCAL (mantém o usuário logado mesmo após fechar o navegador)
setPersistence(auth, browserLocalPersistence);

export { auth, db };
export default app; 