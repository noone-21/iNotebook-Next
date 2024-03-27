"use client"

import { Fragment, useRef, useState } from "react";
import AddNote from "./add-note";
import NoteItem from "./note-item";

export default function Notes() {

    const [note, setNote] = useState([{ id: "1", title: "Hello!", description: "This is my New Note", tag: "tag" }])
    const [notes, setNotes] = useState([])

    const ref = useRef(null)
    const refClose = useRef(null)

    const editNoteBtn = (e) => {
        // editNote(note.id, note.title, note.description, note.etag)
        refClose.current.click();
        // props.showAlert("Updated Successfully!", "success")
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        // setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return <Fragment>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editNote">
            Launch demo modal
        </button>
        <div className="modal fade" id="editNote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <form >
                            <h1 className='d-flex justify-content-center'>EDIT NOTE</h1>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input required minLength={3} type="text" className={` form-control ${note[0].title.length < 3 ? 'is-invalid' : 'is-valid'}`} value={note[0].title} placeholder="Your Note Title here" onChange={onChange} name="title" id="title" />
                                <div className={note[0].title.length < 3 ? 'invalid-feedback' : 'valid-feedback'}>
                                    {note[0].title.length < 3 ? 'Please Enter a Valid Title' : 'Looks Good'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input required minLength={10} type="text" className={` form-control ${note[0].description.length < 10 ? 'is-invalid' : 'is-valid'}`} placeholder="Your Note Description here" onChange={onChange} value={note[0].description} name="description" id="description" />
                                <div className={note[0].description.length < 10 ? 'invalid-feedback' : 'valid-feedback'}>
                                    {note[0].description.length < 10 ? 'Please Enter a Valid Description' : 'Looks Good'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="etag">Tag</label>
                                <input type="text" className="form-control" value={note[0].tag} onChange={onChange} name="etag" id="etag" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note[0].description.length < 10 || note[0].title.length < 3} type="button" className="btn btn-primary" onClick={editNoteBtn} >Update</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex flex-row">
            <h1 className="p-2" >YOUR NOTES</h1>
            <div className="my-3 p-2">
                <AddNote />
            </div>
        </div>

        <div className="row my-2 mx-2">
            {/* {notes.length === 0 && 'No Notes To Display'} */}
            {note.map((note) => {
                return <NoteItem key={note.id} note={note} updateNote={updateNote} />
            })}
        </div>

    </Fragment>
}