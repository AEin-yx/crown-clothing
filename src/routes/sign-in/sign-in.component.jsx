import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.util"

const SignIn=()=>{
    const logUser=async()=>{
        const { user } = await signInWithGooglePopup();
        const userDocRef=await createUserDocumentFromAuth(user);
    }
    return(<div>
        <h1>Signin here</h1>
        <button onClick={logUser}>Sign in with Google</button>
    </div>)
}

export default SignIn;