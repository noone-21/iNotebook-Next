import Image from "next/image";
import Link from "next/link"
import styles from "@/app/page.module.css"

import facebook from '@/public/images/facebook.png'
import instagram from '@/public/images/instagram.png'
import twitter from '@/public/images/twitter.png'
import gmail from '@/public/images/gmail.png'
import linkedin from '@/public/images/linkedin.png'
import github from '@/public/images/github.png'

export default function Footer() {
    return <footer className="w-100 text-white bottom-0 position-absolute " style={{ background: 'linear-gradient(#5C8374, #092635)' }} >
        <div className="container pt-4"  >
            <div className="mb-2 d-flex justify-content-center" >
                <Link href='https://www.facebook.com/no.one.0021' className="btn btn-link btn-floating btn-lg text-dark m-1" >
                    <Image src={facebook} alt='facebook' width={30} height={30} />
                </Link>
                <Link href='https://instagram.com/no_one.__.21?igshid=1kmkme0zgmjop' className="btn btn-link btn-floating btn-lg text-dark m-1" >
                    <Image src={instagram} alt='instagram' width={30} height={30} />

                </Link>
                <Link href='https://twitter.com/no__one_21?s=09' className="btn btn-link btn-floating btn-lg text-dark m-1" >
                    <Image src={twitter} alt='twitter' width={30} height={30} />

                </Link>
                <Link href='mailto:ahmed.danish800@gmail.com' className="btn btn-link btn-floating btn-lg text-dark m-1" >
                    <Image src={gmail} alt='gmail' width={30} height={30} />

                </Link>
                <Link href='https://www.linkedin.com/in/noone21/' className="btn btn-link btn-floating btn-lg text-dark m-1" >
                    <Image src={linkedin} alt='linkedin' width={30} height={30} />

                </Link>
                <Link href='https://github.com/noone-21' className="btn btn-link btn-floating btn-lg text-dark m-1" >
                    <Image src={github} alt='github' width={30} height={30} />

                </Link>
            </div>
        </div>
        <div className="text-center p-2"  style={{ backgroundColor: 'rgb(92, 131, 116,0.3)', color: '#161510' }}  >
            {/* <p> */}
                <Link  href='/' >iNotebook:</Link> Developed and designed by Danish Ahmed © Copyright
            {/* </p> */}
        </div>
    </footer>
}