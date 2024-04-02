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
        <div className='row mx-6 d-flex justify-content-center'  >
            <div className='col-md-4 jumbotron' style={{ padding: '6% 4%', background: 'linear-gradient(#5C8374, #092635)', borderRadius: '10px' }} >
                <form onSubmit={userLogin} >
                    <h2 className="d-flex justify-content-center" style={{color: '#161510'}} >LOGIN</h2>
                    <div className="form-group">
                        <label htmlFor="email" style={{color: '#161510',fontWeight:'bolder'}}>Email address</label>
                        <input type="email"  style={{backgroundColor:'#1B4242', color:'#161510', border:'none'}}  className="form-control" onChange={onChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" style={{color: '#161510',fontWeight:'bolder'}}>Password</label>
                        <input type="password"  style={{backgroundColor:'#1B4242', color:'#161510', border:'none'}}  onChange={onChange} className="form-control" value={credentials.password} name='password' id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4"  style={{backgroundColor : '#1B4242', borderColor: '#5C8374', padding: '10px 20px', color: '#161510',fontWeight:'bold' }} >Login</button>
                </form>
            </div>
        </div>
    </div>
}