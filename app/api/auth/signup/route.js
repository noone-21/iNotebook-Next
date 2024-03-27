import { hashPassword } from "@/lib/auth";
import { connectToDatabase, findFromDatabase, findOneFromDatabase, insertToDatabase } from "@/lib/db-util";
import { NextResponse } from "next/server"

export async function POST(request) {

  const res = await request.json()
  
  const name = res.name
  const email = res.email
  const password = res.password
  const cnfrmPassword = res.cnfrmPassword


  //       console.log(name)
  //       console.log(email)
  //       console.log(password)
  //       console.log(cnfrmPassword)

        if (
          !email ||
          email.trim() === '' ||
          !email.includes('@') ||
          !name ||
          name.trim() === '' ||
          !password || ! cnfrmPassword || password !== cnfrmPassword
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

        console.log(existingUser)

        if (existingUser) {
          client.close();
          return NextResponse.json({ message: 'User exists already!' }, { status: 422 })
        }

        const secPass = await  hashPassword(password)

        const newUser =  {
          email: email,
          name : name,
          password : secPass
        }

        try {
          
          const result = await insertToDatabase(client,newUser, 'users' )
          newUser.id = result.insertedId
          
        } catch (error) {
          client.close()
          return NextResponse.json({message: 'Failed to Sign Up!'}, { status: 500 })
    
        }
  // Do whatever you want
  client.close();
  return NextResponse.json({ message: 'SignedUp Successfully!' }, { status: 201 })
}
