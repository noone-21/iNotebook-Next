import ForgotPassForm from "@/components/forms/forgot-password-form"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Login() {

    const session = await getServerSession()
    if(session){
        redirect('/')
    }

    return <ForgotPassForm/>
}