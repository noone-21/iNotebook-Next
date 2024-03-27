"use client"

import { useState } from "react"
import {  useRouter } from "next/navigation"
import styles from './login-form.module.css'
import { signIn } from "next-auth/react"

export default function LoginForm() {


    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const router = useRouter()

    const userLogin = async (e) => {
        e.preventDefault()

        const response = await signIn('credentials', {
            email: credentials.email,
            password: credentials.password,
            redirect: false,
        })
    
        if (!response?.error) {
           router.push('/')
           router.refresh()
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return <div className={`container my-3  ${styles.login}`} >
        <div className='row mx-6' style={{ marginLeft: '350px' }} >
            <div className='col-md-6 jumbotron' style={{ padding: '5% 4%' }} >
                <form onSubmit={userLogin} >
                    <h1 style={{ marginLeft: '100px' }} >LOGIN</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" onChange={onChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={onChange} className="form-control" value={credentials.password} name='password' id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary" >Login</button>
                </form>
            </div>
        </div>
    </div>
}