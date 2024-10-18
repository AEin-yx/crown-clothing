import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
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

const provider=new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth=getAuth();
export const signInWithGooglePopup=() => signInWithPopup(auth,provider); 
export const db=getFirestore()

export const createUserDocumentFromAuth= async (userAuth)=>{
    const userDocRef=doc(db, 'users', userAuth.uid)
    console.log(userDocRef)
    const userSnapshot=await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
        const { displayName,email }=userAuth;
        const createdAt= new Date();

        try{
            setDoc(userDocRef,{
                displayName,
                email,
                createdAt
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