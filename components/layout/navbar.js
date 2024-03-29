'use client'

import Link from "next/link"
import NavItems from "./nav-items";
import Button from "../button/logout-button"
import { useSession } from "next-auth/react";

export default function Navbar() {

    const { data: session, status } = useSession()

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2" >
        <Link className="navbar-brand" href='/' >iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent"  >
            <NavItems />
            {status === 'authenticated' ? (
                <div>
                    <Button >{session.user?.name} -  Logout</Button>,
                </div>
            ) : (
                <div className="" >
                    <Link className="btn btn-success mx-1" href='/auth/login' role="button">Login</Link>
                    <Link className="btn btn-success mx-1" href="/auth/signup" role="button">SignUp</Link>
                </div>
            )}

        </div>
    </nav>
}