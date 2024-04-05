"use client"

import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import styles from './forgot-password-form.module.css'
import { signIn } from "next-auth/react"
import AlertContext from "@/store/context/alertContext"

export default function ForgotPassForm() {

    const alertCtx = useContext(AlertContext)

    const [credentials, setCredentials] = useState({ email: "" })

    const router = useRouter()

    const resetPassword = async (e) => {
        e.preventDefault()

        const response = await fetch('/api/auth/forgotpassword', {
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


        alertCtx.showAlert("OTP Sent Successfully!", "success")
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return <div className={`container   ${styles.login}`}  >
        <div className={`row mx-6 d-flex justify-content-center  ${styles.cardBody}` } >
            <div className={`col-md-4 jumbotron ${styles.card}`} >
                <form onSubmit={resetPassword} >
                    <h2 className="d-flex justify-content-center"  >FORGOT PASSWORD</h2>
                    <div className="form-group">
                        <label className={`${styles.label}`} htmlFor="email">Email address</label>
                        <input className={`form-control ${styles.input}`} type="email"  onChange={onChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <button type="submit" className={` mt-4 ${styles.Button}`}  >Send OTP</button>
                </form>
            </div>
        </div>
    </div>
}