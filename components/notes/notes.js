"use client"

import { Fragment, useContext, useEffect, useRef, useState } from "react";
import AddNote from "./add-note";
import NoteItem from "./note-item";
import { useSession } from "next-auth/react";
import AlertContext from "@/store/context/alertContext";
import Image from "next/image";

import addNote from '@/public/images/addNote.png'

export default function Notes() {

    const alertCtx = useContext(AlertContext)

    const [notes, setNotes] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const [note, setNote] = useState([{ _id: "", title: "", description: "", tag: "" }])

    const { data: session } = useSession()

    const userId = session.user?.email

    // FETCHING NOTES

    useEffect(() => {

        setIsFetching(true)

        fetch(`/api/notes/${userId}`, {
            method: 'GET'
        }).then((response) => response.json())
            .then((data) => {
                setNotes(data.notes)
                setIsFetching(false)
            });

    }, [userId])



    // EDIT NOTE FUNTIONS

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

    // DELETE NOTE HANDLER

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

    // ADD NOTE FUNCTIONS

    const addNoteFormRef = useRef(null)
    const saveNoteRef = useRef(null)

    const addNoteHandler = async (e) => {
        // e.preventDefault()

        saveNoteRef.current.click()

        const newNote = {
            user: session.user?.email,
            title: note.title,
            description: note.description,
            tag: note.tag
        }

        const response = await fetch('/api/notes/addnote', {
            method: 'POST',
            body: JSON.stringify(newNote),
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
                    alertCtx.showAlert("Added Successfully!", "success")
                });
            setNote({ title: "", description: "", tag: "" })
        }
    }

    const addNoteForm = () => {
        addNoteFormRef.current.click()
    }

    // ON CHANGE HANDLER

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return <Fragment>
        {/* EDIT NOTE FORM */}
        <button ref={EditFormRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editNote">
            Launch demo modal
        </button>
        <div className="modal fade" id="editNote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content" style={{ padding: '5% 4%', background: 'linear-gradient(#5C8374, #092635)', border: 'none' }} >
                    <form onSubmit={updateNote} >
                        <div className="modal-body">
                            <h1 className='d-flex justify-content-center' style={{ color: '#161510' }}>EDIT NOTE</h1>
                            <div className="form-group">
                                <label htmlFor="title" style={{ color: '#161510', fontWeight: 'bolder' }}>Title</label>
                                <input required minLength={3} style={{ backgroundColor: '#1B4242', color: '#161510' }} type="text" className={` form-control ${note.title?.length < 3 ? 'is-invalid' : 'is-valid'}`} value={note.title} placeholder="Your Note Title here" onChange={onChange} name="title" id="title" />
                                <div className={note.title?.length < 3 ? 'invalid-feedback' : 'valid-feedback'}>
                                    {note.title?.length < 3 ? 'Please Enter a Valid Title' : 'Looks Good'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" style={{ color: '#161510', fontWeight: 'bolder' }}>Description</label>
                                <input required minLength={10} style={{ backgroundColor: '#1B4242', color: '#161510' }} type="text" className={` form-control ${note.description?.length < 10 ? 'is-invalid' : 'is-valid'}`} placeholder="Your Note Description here" onChange={onChange} value={note.description} name="description" id="description" />
                                <div className={note.description?.length < 10 ? 'invalid-feedback' : 'valid-feedback'}>
                                    {note.description?.length < 10 ? 'Please Enter a Valid Description' : 'Looks Good'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="etag" style={{ color: '#161510', fontWeight: 'bolder' }}>Tag</label>
                                <input type="text" style={{ backgroundColor: '#1B4242', color: '#161510', border: 'none' }} className="form-control" value={note.tag} onChange={onChange} name="tag" id="tag" />
                            </div>
                        </div>
                        <div className="modal-footer" style={{ border: 'none' }}>
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: '#39544d', borderColor: '#82b7a9', padding: '10px 20px', color: '#161510', fontWeight: 'bold' }}  >Close</button>
                            <button disabled={note.description?.length < 10 || note.title?.length < 3} type="submit" className="btn btn-primary" style={{ backgroundColor: '#1B4242', borderColor: '#5C8374', padding: '10px 20px', color: '#161510', fontWeight: 'bold' }} >Update</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

        <div className="d-flex flex-row">
            <h1 className="p-2" >YOUR NOTES</h1>
            <div className=" p-2">
                {/* ADD NOTE FORM */}
                <Image src={addNote} alt="Add Note Button" onClick={addNoteForm} width={30} height={30} style={{ cursor: 'pointer' }} />
                <button ref={addNoteFormRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#addNote">
                    Launch demo modal
                </button>
                <div className="modal fade" id="addNote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className="modal-dialog" role="document" >
                        <div className="modal-content" style={{ padding: '5% 4%', background: 'linear-gradient(#5C8374, #092635)', border: 'none' }}>
                            <div className="modal-body">
                                <form onSubmit={addNoteHandler} >
                                    <h1 className='d-flex justify-content-center' style={{ color: '#161510' }}>ADD NOTE</h1>
                                    <div className="form-group">
                                        <label htmlFor="title" style={{ color: '#161510', fontWeight: 'bolder' }}>Title</label>
                                        <input required minLength={3} style={{ backgroundColor: '#1B4242', color: '#161510', border: 'none' }} type="text" className={` form-control ${note.title?.length === 0 ? '' : note.title?.length < 3 ? 'is-invalid' : 'is-valid'}`} value={note.title} placeholder="Your Note Title here" onChange={onChange} name="title" id="title" />
                                        <div className={note.title?.length < 3 ? 'invalid-feedback' : 'valid-feedback'}>
                                            {note.title?.length < 3 ? 'Please Enter a Valid Title' : 'Looks Good'}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description" style={{ color: '#161510', fontWeight: 'bolder' }}>Description</label>
                                        <input required minLength={10} style={{ backgroundColor: '#1B4242', color: '#161510', border: 'none' }} type="text" className={` form-control ${note.description?.length === 0 ? '' : note.description?.length < 10 ? 'is-invalid' : 'is-valid'}`} placeholder="Your Note Description here" onChange={onChange} value={note.description} name="description" id="description" />
                                        <div className={note.description?.length < 10 ? 'invalid-feedback' : 'valid-feedback'}>
                                            {note.description?.length < 10 ? 'Please Enter a Valid Description' : 'Looks Good'}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tag" style={{ color: '#161510', fontWeight: 'bolder' }}>Tag</label>
                                        <input type="text" style={{ backgroundColor: '#1B4242', color: '#161510', border: 'none' }} className="form-control" value={note.tag} placeholder="Your Note Tag here" onChange={onChange} name="tag" id="tag" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer" style={{ border: 'none' }} >
                                <button ref={saveNoteRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: '#39544d', borderColor: '#82b7a9', padding: '10px 20px', color: '#161510', fontWeight: 'bold' }} >Close</button>
                                <button disabled={note.description?.length < 10 || note.title?.length < 3} type="submit" className="btn btn-primary" onClick={addNoteHandler} style={{ backgroundColor: '#1B4242', borderColor: '#5C8374', padding: '10px 20px', color: '#161510', fontWeight: 'bold' }}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* NOTE ITEM */}
        <div className="row my-2 mx-2">
            {isFetching ? <p>Loading...</p> :
                notes.length === 0 ? 'No Notes To Display' : notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNoteBtn} deleteNote={deleteNote} />
                })
            }
        </div>

    </Fragment>
}