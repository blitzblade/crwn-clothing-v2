import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"
import { useContext, useState } from "react"
import './sign-in-form.styles.scss'
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
    email: "",
    password: ""
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const { email, password } = formFields
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(user)

            // setCurrentUser(user);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                default:
                    console.log(error)
            }
        }
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
      }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="Email" 
                inputOptions={{
                    type: "email",
                    required: true, 
                    onChange: handleChange,
                    name: "email",
                    value: email
                }}
                />

                <FormInput 
                label="Password" 
                inputOptions={{
                    type: "password",
                    required: true, 
                    onChange: handleChange,
                    name: "password",
                    value: password
                }}
                />
                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;