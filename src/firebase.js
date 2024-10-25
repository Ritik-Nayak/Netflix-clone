
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/web-extension";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD_BF9XbKfN4-4FxV1Mokozl9MXsI_iCxI",
  authDomain: "netflix-clone-724d3.firebaseapp.com",
  projectId: "netflix-clone-724d3",
  storageBucket: "netflix-clone-724d3.appspot.com",
  messagingSenderId: "780198310576",
  appId: "1:780198310576:web:0d3b1a68c42a2adcab4175"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
           uid: user.uid, 
           name,
           authProvider: "local",
           email,
        });
    }catch (error){
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};