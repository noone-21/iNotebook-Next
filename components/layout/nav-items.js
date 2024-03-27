'use client'

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link"

import home from '@/public/images/home.png'
import about from '@/public/images/info.png'


export default function NavItems() {

    const pathname = usePathname()

    return <ul className="navbar-nav mr-auto" >
        {navItems.map((item)=><li key={item.id} className="nav-item " >
            <Link className={`nav-link ${pathname === item.path ? "active" : ""}`} href={item.path} > <Image src={item.src} alt={item.title} width={25} height={25} /> {item.title}</Link>
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