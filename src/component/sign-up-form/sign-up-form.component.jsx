import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}


const SignUpForm = () =>{
    
    const [formField,setFormField]=useState(defaultFormFields);
    const {displayName,email,password,confirmPassword}=formField;
    
    console.log(formField);
    
    
    const handleSubmit=async (event)=>{
        event.preventDefault();
         const clearField=()=>{
           setFormField(defaultFormFields);
         }
         if(password!==confirmPassword){
            alert('Your Passwords donot match')
            return;
        }
        try{
            const { user }=await createAuthUserWithEmailAndPassword(email, password, displayName);
            await createUserDocumentFromAuth(user,{displayName});
        }catch(error){
            if(error.code==='auth/email-already-in-use'){
                alert('Cannot create User,email already in use');
            }else{
                console.log("Error creating User",error.message)
            }
        }
        clearField();
    }
    
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormField({...formField,[name]:value})
    }

    return(
        <div className="group">
            <h1>Sign Up With Email and Password</h1>
            <form onSubmit={handleSubmit} className="form-input">
                <FormInput
                    label='Display Name'
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name='displayName'
                    value={displayName}
                 />

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

                <FormInput 
                    label='Confirm Password'
                    type='password' 
                    required 
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <Button type='submit' buttonType='inverted'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;