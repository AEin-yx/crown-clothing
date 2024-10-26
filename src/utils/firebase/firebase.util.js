import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwgZykD_ORlMsne1vz15Y2dQO_l-Uhj7Y",
  authDomain: "crwn-clothing-db-809d1.firebaseapp.com",
  projectId: "crwn-clothing-db-809d1",
  storageBucket: "crwn-clothing-db-809d1.appspot.com",
  messagingSenderId: "321533736404",
  appId: "1:321533736404:web:cb33cf140bbce34a9a1241"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider=new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:"select_account"
});

const auth=getAuth();
export const signInWithGooglePopup=() => signInWithPopup(auth,googleProvider); 

export const db=getFirestore()

export const createUserDocumentFromAuth= async (userAuth,additionalInfo)=>{
    if(!userAuth) return;

    const userDocRef=doc(db, 'users', userAuth.uid)
    const userSnapshot=await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const { displayName,email }=userAuth;
        const createdAt= new Date();

        try{
            setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }catch(error){
            console.log('error creating user',error.message);
        }
    }

    return userDocRef;
    //if it exists
    //retern user details
    //if it doesn't exist
    //create/set user details using setDoc
}

export const createAuthUserWithEmailAndPassword=async(email,password)=>{
    if(!email || !password) return ;

    return await createUserWithEmailAndPassword(auth,email,password);
}