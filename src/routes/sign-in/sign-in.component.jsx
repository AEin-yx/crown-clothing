import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.util"
import SignUpForm from "../../component/sign-up-form/sign-up-form.component";
const SignIn=()=>{
    const logUser=async()=>{
        try{
            const { user } = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user);
        }catch(error){
            console.log(error.message)
        }
    }
    return(<div>
        <h1>Signin here</h1>
        <button onChange={logUser}>Sign in with Google Popup</button>
        <SignUpForm />
    </div>)
}

export default SignIn;