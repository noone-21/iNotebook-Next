import { connectToDatabase, findAllFromDatabase } from "@/lib/db-util"
import { NextResponse } from "next/server"


export async function GET(request, context) {
    const userId = context.params.userId 

    let client
    let notesData 

    try {

        client = await connectToDatabase()

    } catch (error) {
        return NextResponse.json({ message: 'Connection to Db Failed!' }, { status: 500 })
    }

    try {

        notesData = await findAllFromDatabase(client, 'notes')
        client.close()

    } catch (error) {
        return NextResponse.json({ message: 'Failed to Find data from Db!' }, { status: 500 })
    }

    const selectedNotes = notesData.filter(
        (note) => note.user === userId
    );
    return NextResponse.json({ notes: selectedNotes })
  }



