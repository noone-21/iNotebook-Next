import { hashPassword } from "@/lib/auth";
import { connectToDatabase, findOneFromDatabase, insertToDatabase } from "@/lib/db-util";
import sendEmail from '@/lib/mailer'
import { NextResponse } from "next/server"

export async function POST(request) {

  const res = await request.json()
  
  const email = res.email

        if (
          !email ||
          email.trim() === '' ||
          !email.includes('@') 
        ) {
          return NextResponse.json({message: 'Invalid Input!'}, { status: 422 })
        }

        let client

        try {
    
          client = await connectToDatabase()
          
        } catch (error) {
          return NextResponse.json({message: 'Connection to Db Failed!'}, { status: 500 })
        }

        const existingUser = await findOneFromDatabase(client,'users',email)

        if (!existingUser) {
          client.close();
          return NextResponse.json({ message: 'Email doesnot exist!' }, { status: 422 })
        }

        const otp = Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000;

        const emailResponse = await sendEmail(email,otp)

        // try {
          
        //   const result = await insertToDatabase(client,newUser, 'users' )
        //   newUser.id = result.insertedId
          
        // } catch (error) {
        //   client.close()
        //   return NextResponse.json({message: 'Failed to Sign Up!'}, { status: 500 })
    
        // }
  // Do whatever you want
  client.close();
  return NextResponse.json({ message: 'SignedUp Successfully!' }, { status: 201 })
}
