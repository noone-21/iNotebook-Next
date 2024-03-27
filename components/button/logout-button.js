'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function Button(props){

    const router = useRouter()

    const logoutHandler =async ()=>{
        signOut()
        // router.refresh()
        // router.push('/auth/login')
        
    }

    return <button className="btn btn-success mx-1" type="button" onClick={logoutHandler} >
        {props.children}
    </button>
}