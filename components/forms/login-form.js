"use client"

import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import styles from './login-form.module.css'
import { signIn } from "next-auth/react"
import AlertContext from "@/store/context/alertContext"
import Button from "../button/logout-button"

export default function LoginForm() {

    const alertCtx = useContext(AlertContext)

    const [credentials, setCredentials] = useState({ email: "", password: "" })

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

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return <div className={`container   ${styles.login}`}  >
        <div className={`row mx-6 d-flex justify-content-center  ${styles.cardBody}` } >
            <div className={`col-md-4 jumbotron ${styles.card}`} >
                <form onSubmit={userLogin} >
                    <h2 className="d-flex justify-content-center"  >LOGIN</h2>
                    <div className="form-group">
                        <label className={`${styles.label}`} htmlFor="email">Email address</label>
                        <input className={`form-control ${styles.input}`} type="email"  onChange={onChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label className={`${styles.label}`} htmlFor="password" >Password</label>
                        <input className={`form-control ${styles.input}`} type="password"  onChange={onChange} value={credentials.password} name='password' id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className={`btn btn-primary mt-4 ${styles.Button}`}  >Login</button>
                </form>
            </div>
        </div>
    </div>
}