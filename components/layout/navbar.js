'use client'

import Link from "next/link"
import NavItems from "./nav-items";
import Button from "../button/logout-button"
import { useSession } from "next-auth/react";

export default function Navbar() {

    const { data: session, status } = useSession()

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2" style={{ background: 'linear-gradient(#5C8374, #092635)' }}   >
        <div className="container-fluid">
            <Link className="navbar-brand" href='/' style={{color: '#161510'}} >iNotebook</Link>
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
                        <Link className="btn btn-success mx-1" href='/auth/login' role="button" style={{backgroundColor: '#1B4242', borderColor: '#5C8374', color: '#161510',fontWeight:'bold'}} >Login</Link>
                        <Link className="btn btn-success mx-1" href="/auth/signup" role="button" style={{backgroundColor: '#1B4242',borderColor: '#5C8374', color: '#161510',fontWeight:'bold'}}  >SignUp</Link>
                    </div>
                )}

            </div>
        </div>
    </nav>
}