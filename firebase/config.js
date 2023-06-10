// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsFpy6WKyf9sOF0ENmXTXAm5z-6fAEJMY",
  authDomain: "rn-project-f3b98.firebaseapp.com",
  databaseURL: "https://rn-project-f3b98.firebaseio.com",
  projectId: "rn-project-f3b98",
  storageBucket: "rn-project-f3b98.appspot.com",
  messagingSenderId: "738939601284",
  appId: "1:738939601284:web:275d2c1c7a703eeed71dd1",
  measurementId: "G-XMV1W7CJDG",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
