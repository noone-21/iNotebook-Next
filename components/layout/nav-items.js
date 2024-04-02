'use client'

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link"

import home from '@/public/images/home.png'
import about from '@/public/images/info.png'
import styles from './nav-item.module.css'


export default function NavItems(props) {

    const pathname = usePathname()

    return <ul className="navbar-nav mr-auto" >
        {navItems.map((item)=><li key={item.id} className="nav-item "  >
            <Link className={`nav-link `} style={{color: '#161510', fontSize:'1.2rem', backgroundColor: pathname===item.path?'rgb(158, 200, 185,0.1)':'', borderRadius:'10px', padding:'7px'}} href={item.path} > <Image src={item.src} style={{marginBottom: '5px'}} alt={item.title} width={25} height={25} /> {item.title}</Link>
        </li>)}
    </ul>
}

const navItems =[
    {
        id: 1,
        title: 'Home',
        src: home,
        path: '/'
    },
    {
        id: 2,
        title: 'About',
        src: about,
        path: '/about'
    }
]