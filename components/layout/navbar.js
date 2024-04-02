'use client'

import Link from "next/link"
import NavItems from "./nav-items";
import Button from "../button/logout-button"
import { useSession } from "next-auth/react"
import styles from './navbar.module.css'

export default function Navbar() {

    const { data: session, status } = useSession()

    return <nav className={`navbar navbar-expand-lg px-2 ${styles.navbar} `}  >
        <div className="container-fluid">
            <Link className={`navbar-brand ${styles.logo}`} href='/' >iNotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent"  >
                <NavItems color='#161510' />
                {status === 'authenticated' ? (
                    <div >
                        <Button >{session.user?.name} -  Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Link className={`btn btn-success mx-1 ${styles.Button}`} href='/auth/login' role="button" style={{backgroundColor: '#1B4242', borderColor: '#5C8374', color: '#161510',fontWeight:'bold'}} >Login</Link>
                        <Link className={`btn btn-success mx-1 ${styles.Button}`} href="/auth/signup" role="button" style={{backgroundColor: '#1B4242',borderColor: '#5C8374', color: '#161510',fontWeight:'bold'}}  >SignUp</Link>
                    </div>
                )}

            </div>
        </div>
    </nav>
}