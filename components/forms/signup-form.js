"use client"

import { useState, useRef, useContext } from "react"
import styles from './signup-form.module.css'
import { useRouter } from "next/navigation"
import AlertContext from "@/store/context/alertContext"
import Image from "next/image"

import hide from '@/public/images/hide.png'
import view from '@/public/images/view.png'
import Link from "next/link"


export default function SignUpForm() {

    const alertCtx = useContext(AlertContext)

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cnfrmPassword: "" })
    const [passwordHide, setPasswordHide] = useState(true)
    const [cnfrmPasswordHide, setCnfrmPasswordHide] = useState(true)

    const emailInputRef = useRef()
    const nameInputRef = useRef()
    const passwordInputRef = useRef()
    const cnfrmPasswordInputRef = useRef()

    const router = useRouter()

    // const [isDisabled, setIsDisabled] = useState(true)

    const userSignUp = async (e) => {
        e.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const enteredCnfrmPassword = cnfrmPasswordInputRef.current.value

        const credentials = {
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
            cnfrmPassword: enteredCnfrmPassword
        }

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (!response.ok) {
            alertCtx.showAlert(data.message, "danger")
        }

        alertCtx.showAlert("Account Created Successfully!", "success")

        setCredentials({ name: "", email: "", password: "", cnfrmPassword: "" })

        router.push('/auth/login')
    }

    const showPasswordToggler = () => {
        setPasswordHide(!passwordHide)
    }
    const showCnfrmPasswordToggler = () => {
        setCnfrmPasswordHide(!cnfrmPasswordHide)
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        //   if(credentials.name.length >= 3 && validateEmail(credentials.email)&&credentials.password.length >=7&&credentials.password === credentials.cnfrmPassword){
        //       setIsDisabled(false)
        // }
        // else{
        //     setIsDisabled(true)
        //   }
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    return <div className={`container  ${styles.signup} `} >
        <div className={`row mx-6 d-flex justify-content-center  ${styles.cardBody}`} >
            <div className={`col-md-4 jumbotron ${styles.card}`} >
                <form onSubmit={userSignUp}>
                    <h2 className="d-flex justify-content-center" >SIGN UP</h2>
                    <div className="form-group py-2">
                        <label htmlFor="name" className={`${styles.label}`}>Name</label>
                        <input type="text" className={` form-control ${styles.input} ${credentials.name.length === 0 ? '' : credentials.name.length < 3 && credentials.name.length > 0 ? 'is-invalid' : 'is-valid'}`} onChange={onChange} required minLength={3} value={credentials.name} name='name' id="name" placeholder="Enter Your Name" ref={nameInputRef} />
                        <div className={credentials.name.length === 0 ? '' : credentials.name.length < 3 && credentials.name.length > 0 ? 'invalid-feedback' : 'valid-feedback'}>
                            {credentials.name.length === 0 ? '' : credentials.name.length < 3 && credentials.name.length > 0 ? 'Invalid Name!' : <i className="fa-solid fa-check-double"></i>}
                        </div>
                    </div>

                    <div className="form-group py-2">
                        <label htmlFor="email" className={`${styles.label}`}>Email address</label>
                        <input type="email" className={` form-control ${styles.input} ${credentials.email.length === 0 ? '' : !validateEmail(credentials.email) ? 'is-invalid' : 'is-valid'}`} onChange={onChange} required value={credentials.email} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter Your email" ref={emailInputRef} />
                        <div className={credentials.email.length === 0 ? '' : !validateEmail(credentials.email) ? 'invalid-feedback' : 'valid-feedback'}>
                            {credentials.email.length === 0 ? '' : !validateEmail(credentials.email) ? 'Invalid Email!' : <i className="fa-solid fa-check-double"></i>}
                        </div>
                    </div>

                    <div className="form-group py-2">
                        <label htmlFor="password" className={`${styles.label}`}>Password</label>
                        <Image style={{position:'relative', left:'3px'}}  src={!passwordHide ? view : hide} width={20} height={20} onClick={showPasswordToggler} />
                            <input type={passwordHide ? 'password' : 'text'} onChange={onChange} required minLength={8} className={` form-control ${styles.input} ${credentials.password.length === 0 ? '' : credentials.password.length < 8 && credentials.password.length > 0 ? 'is-invalid' : 'is-valid'}`} value={credentials.password} name='password' id="password" placeholder="Enter Your Password" ref={passwordInputRef} />
                        <div className={credentials.password.length === 0 ? '' : credentials.password.length < 8 && credentials.password.length > 0 ? 'invalid-feedback' : 'valid-feedback'}>
                            {credentials.password.length === 0 ? '' : credentials.password.length < 8 && credentials.password.length > 0 ? 'Password too short!' : 
                            <i className="fa-solid fa-check-double"></i>}
                        </div>
                    </div>

                    <div className="form-group py-2">
                        <label htmlFor="cnfrmPassword" className={`${styles.label}`}>Confirm Password</label>
                            <Image style={{position:'relative', left:'3px'}} src={!cnfrmPasswordHide ? view : hide} width={20} height={20} onClick={showCnfrmPasswordToggler} />
                            <input type={cnfrmPasswordHide ? 'password' : 'text'} onChange={onChange} required minLength={8} className={` form-control ${styles.input} ${credentials.cnfrmPassword.length === 0 || credentials.password.length < 8 ? '' : credentials.password !== credentials.cnfrmPassword ? 'is-invalid' : 'is-valid'}`} value={credentials.cnfrmPassword} name='cnfrmPassword' id="cnfrmPassword" placeholder="Re-Enter Your Password" ref={cnfrmPasswordInputRef} />
                        <div className={credentials.cnfrmPassword.length === 0 || credentials.password.length < 8 ? '' : credentials.password !== credentials.cnfrmPassword ? 'invalid-feedback' : 'valid-feedback'}>
                            {credentials.cnfrmPassword.length === 0 || credentials.password.length < 8 ? '' : credentials.password !== credentials.cnfrmPassword ? 'Passwords do not not match!' : <i className="fa-solid fa-check-double"></i>}
                        </div>
                    </div>

                    <button type="submit" className={` mt-4 ${styles.Button}`} >SignUp</button>
                </form>
                <div  className={`mt-2 ${styles.label}`} >
                    Already have an account? <Link href='/auth/login' style={{textDecoration:'none'}} >Login</Link>
                </div>
            </div>

        </div>
    </div>
}