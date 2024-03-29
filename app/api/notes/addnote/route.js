
import { connectToDatabase, insertToDatabase } from "@/lib/db-util"
import { NextResponse } from "next/server"

export async function POST(request) {

  const res = await request.json()

  const { user, title, description, tag } = res

  if(!user){
    return NextResponse.json({message: 'Please Authenticate to continue!'}, { status: 422 })
  }

  if(title.length <3 || description.length<10){
    return NextResponse.json({message: 'Invalid Input!'}, { status: 422 })
  }

  let client

  try {
    
    client = await connectToDatabase()
    
  } catch (error) {
    return NextResponse.json({message: 'Connection to Db Failed!'}, { status: 500 })
  }

  const newNote ={
    user,
    title,
    description,
    tag
  }

  
  try {
          
    const result = await insertToDatabase(client,newNote, 'notes' )
    newNote.id = result.insertedId
    
  } catch (error) {
    client.close()
    return NextResponse.json({message: 'Failed to Add Note!'}, { status: 500 })

  }
  
  
  return NextResponse.json({ message: 'New Note Added Successfully!' }, { status: 201 })
}
