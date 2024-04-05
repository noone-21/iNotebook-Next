"use client"

import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import styles from './login-form.module.css'
import { signIn } from "next-auth/react"
import AlertContext from "@/store/context/alertContext"
import Link from "next/link"

import hide from '@/public/images/hide.png'
import view from '@/public/images/view.png'
import Image from "next/image"

export default function LoginForm() {

    const alertCtx = useContext(AlertContext)

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [passwordHide, setPasswordHide] = useState(true)

    const router = useRouter()

    const userLogin = async (e) => {
        e.preventDefault()

        const response = await signIn('credentials', {
            email: credentials.email,
            password: credentials.password,
            redirect: false,
        })

        if (response?.error) {
            alertCtx.showAlert("Invalid Credentials", "danger")
        } else {
            router.push('/')
            router.refresh()
            alertCtx.showAlert("Logged-In Successfully!", "success")
        }
    }

    const showPasswordToggler = () => {
        setPasswordHide(!passwordHide)
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return <div className={`container   ${styles.login}`}  >
        <div className={`row mx-6 d-flex justify-content-center  ${styles.cardBody}`} >
            <div className={`col-md-4 jumbotron ${styles.card}`} >
                <form onSubmit={userLogin} >
                    <h2 className="d-flex justify-content-center"  >LOGIN</h2>
                    <div className="form-group py-2">
                        <label className={`${styles.label}`} htmlFor="email">Email address</label>
                        <input className={`form-control ${styles.input}`} type="email" onChange={onChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group py-2">
                        <label className={`${styles.label}`} htmlFor="password" >Password</label>
                        <Image style={{position:'relative', left:'3px'}}  src={!passwordHide ? view : hide} width={20} height={20} onClick={showPasswordToggler} />
                        <input className={`form-control ${styles.input}`} type={passwordHide ? 'password' : 'text'} onChange={onChange} value={credentials.password} name='password' id="password" placeholder="Password" />
                    </div>
                    <div>
                        <Link href='/auth/forgotpassword' >Forgot password?</Link>
                    </div>
                    <button type="submit" className={` mt-4 ${styles.Button}`}  >Login</button>
                </form>
                <div  className={`mt-2 ${styles.label}`} >
                    New here? <Link href='/auth/signup' style={{textDecoration:'none'}} >Signup</Link>
                </div>
            </div>
        </div>
    </div>
}