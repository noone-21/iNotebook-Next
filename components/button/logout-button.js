'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function Button(props){

    const router = useRouter()

    const logoutHandler =async ()=>{
        signOut()
        
    }

    return <button className="btn btn-success mx-1" style={{backgroundColor: '#1B4242', borderColor: '#5C8374',color: '#161510',fontWeight:'bold'}} type="button" onClick={logoutHandler} >
        {props.children}
    </button>
}