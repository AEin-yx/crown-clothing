import { useState } from "react";
import { 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

const defaultFormFields={
    email:'',
    password:'',
}


const SignInForm = () =>{
    
    const [formField,setFormField]=useState(defaultFormFields);
    const {email,password}=formField;

    const clearField=()=>{
      setFormField(defaultFormFields);
    }
    
    const signInWithGoogle=async ()=>{
        try{
            const { user } = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user);
        }catch(error){
            console.log(error.message)
        }
    }

    const handleSubmit=async (event)=>{
        event.preventDefault();
        
        try{
            const response = await signInAuthUserWithEmailAndPassword(email,password);
            console.log(response);
        }catch(error){
            switch (error.code) {
                case "auth/user-not-found":
                  alert("Incorrect user");
                  break;
                case "auth/invalid-credential":
                  alert("Incorrect email or password");
                  break;
                default:
                  console.log(error);
              }
            console.log(error);
        }
        clearField();
    }
    
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormField({...formField,[name]:value})
    }

    return(
        <div className="sign-in-container">
            <h2>Already have an Account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit} className="form-input">
                <FormInput  
                    label='Email'
                    type="email" 
                    required 
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput 
                    label='Password'
                    type='password' 
                    required 
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button onClick={signInWithGoogle} buttonType='google'>Google Sign in</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;