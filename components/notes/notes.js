"use client"

import { Fragment, useContext, useEffect, useRef, useState } from "react";
import AddNote from "./add-note";
import NoteItem from "./note-item";
import { useSession } from "next-auth/react";
import AlertContext from "@/store/context/alertContext";

export default function Notes() {

    const alertCtx = useContext(AlertContext)

    const [notes, setNotes] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const { data: session } = useSession()

    const userId = session.user?.email

    useEffect( () => {

        setIsFetching(true)

        fetch(`/api/notes/${userId}`, {
            method: 'GET'
        }).then((response) => response.json())
            .then((data) => {
                setNotes(data.notes)
                setIsFetching(false)
            });

    }, [userId])


    const [note, setNote] = useState([{ _id: "", title: "", description: "", tag: "" }])

    const EditFormRef = useRef(null)
    const refClose = useRef(null)

    const updateNote = async (e) => {
        e.preventDefault()

        refClose.current.click();

        const response = await fetch('/api/notes/updatenote', {
            method: 'PATCH',
            body: JSON.stringify({ note }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (!response.ok) {
            alertCtx.showAlert(data.message, "danger")
        } else {
            setIsFetching(true)
            await fetch(`/api/notes/${userId}`, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => {
                    setNotes(data.notes)
                    setIsFetching(false)
                    alertCtx.showAlert("Updated Successfully!", "success")
                });

        }

    }

    const updateNoteBtn = (currentNote) => {
        EditFormRef.current.click();
        setNote({ _id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag })
    }

    const deleteNote = async (noteId) => {
        const response = await fetch(`/api/notes/deletenote`, {
            method: 'DELETE',
            body: JSON.stringify({ _id: noteId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            alertCtx.showAlert(data.message, "danger")
        } else {
            setIsFetching(true)
            await fetch(`/api/notes/${userId}`, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => {
                    setNotes(data.notes)
                    setIsFetching(false)
                    alertCtx.showAlert("Deleted Successfully!", "success")
                });
        }

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return <Fragment>
        <button ref={EditFormRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editNote">
            Launch demo modal
        </button>
        <div className="modal fade" id="editNote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <form onSubmit={updateNote} >
                        <div className="modal-body">
                            <h1 className='d-flex justify-content-center'>EDIT NOTE</h1>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input required minLength={3} type="text" className={` form-control ${note.title?.length < 3 ? 'is-invalid' : 'is-valid'}`} value={note.title} placeholder="Your Note Title here" onChange={onChange} name="title" id="title" />
                                <div className={note.title?.length < 3 ? 'invalid-feedback' : 'valid-feedback'}>
                                    {note.title?.length < 3 ? 'Please Enter a Valid Title' : 'Looks Good'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input required minLength={10} type="text" className={` form-control ${note.description?.length < 10 ? 'is-invalid' : 'is-valid'}`} placeholder="Your Note Description here" onChange={onChange} value={note.description} name="description" id="description" />
                                <div className={note.description?.length < 10 ? 'invalid-feedback' : 'valid-feedback'}>
                                    {note.description?.length < 10 ? 'Please Enter a Valid Description' : 'Looks Good'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="etag">Tag</label>
                                <input type="text" className="form-control" value={note.tag} onChange={onChange} name="tag" id="tag" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.description?.length < 10 || note.title?.length < 3} type="submit" className="btn btn-primary"  >Update</button>
                        </div>
                    </form>

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
            {isFetching ? <p>Loading...</p> :
                notes.length === 0 ? 'No Notes To Display' : notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNoteBtn} deleteNote={deleteNote} />
                })
            }
        </div>

    </Fragment>
}