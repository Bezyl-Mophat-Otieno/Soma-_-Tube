import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//TODO install firebase

// firebase configuration ...

const firebaseConfig = {

    apiKey: "AIzaSyBSNAwJpRcoyHH-L1Lm9EP3uI5MmwyU9EM",
  
    authDomain: "videostorage-850a0.firebaseapp.com",
  
    projectId: "videostorage-850a0",
  
    storageBucket: "videostorage-850a0.appspot.com",
  
    messagingSenderId: "622901084895",
  
    appId: "1:622901084895:web:07321ae23cbbf2f971df6a"
  
  };
  


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
