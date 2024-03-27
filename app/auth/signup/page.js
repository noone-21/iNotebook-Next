import SignUpForm from "@/components/forms/signup-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUp() {

    const session = await getServerSession()
    if(session){
        redirect('/')
    }

    return <SignUpForm />
}