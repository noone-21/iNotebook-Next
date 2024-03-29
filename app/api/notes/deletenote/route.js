
import { connectToDatabase, deleteInDatabase } from "@/lib/db-util"
import { NextResponse } from "next/server"

import mongoose from 'mongoose';

export async function DELETE(request) {

  const res = await request.json()

  const { _id,user } = res

  const parsedId = new mongoose.Types.ObjectId(_id)


  let client

  try {

    client = await connectToDatabase()
    
  } catch (error) {
    return NextResponse.json({ message: 'Connection to Db Failed!' }, { status: 500 })
  }
  
  
  try {
    const existingNotes = await deleteInDatabase(client, 'notes', parsedId)
    
  } catch (error) {
    client.close()
    return NextResponse.json({ message: 'Failed to delete note from Db!' }, { status: 500 })
  }


  client.close()
  return NextResponse.json({ message: 'Note Deleted Successfully!' }, { status: 201 })
}
