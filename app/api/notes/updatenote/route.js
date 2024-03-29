
import { connectToDatabase, updateInDatabase } from "@/lib/db-util"
import { NextResponse } from "next/server"

import mongoose from 'mongoose';

export async function PATCH(request) {

  const res = await request.json()

  const { note } = res

  const parsedId = new mongoose.Types.ObjectId(note._id)

  let client

  try {

    client = await connectToDatabase()
    
  } catch (error) {
    return NextResponse.json({ message: 'Connection to Db Failed!' }, { status: 500 })
  }
  
  
  try {
    const existingNotes = await updateInDatabase(client, 'notes', parsedId, note)
    
  } catch (error) {
    client.close()
    return NextResponse.json({ message: 'Failed to update note in Db!' }, { status: 500 })
  }


  client.close()
  return NextResponse.json({ message: 'Note Updated Successfully!' }, { status: 201 })
}
