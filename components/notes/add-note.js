

import { Fragment, useRef, useState } from "react";
import addNote from '@/public/images/addNote.png'
import Image from "next/image";

export default function AddNote() {

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const addNoteFormRef = useRef(null)
    const saveNoteRef = useRef(null)

    const addNoteBtn = (e) => {
        e.preventDefault();
        // addNote(note.title, note.description, note.tag);
        saveNoteRef.current.click();
        setNote({ title: "", description: "", tag: "" })
        // props.showAlert("Added Successfully!","success")
    }

    const addNoteForm = () => {
        addNoteFormRef.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    return <Fragment>
        <Image src={addNote} alt="Add Note Button" onClick={addNoteForm} width={30} height={30} style={{ cursor: 'pointer' }} />
        <button ref={addNoteFormRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#addNote">
            Launch demo modal
        </button>
        <div className="modal fade" id="addNote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <form >
                            <h1 className='d-flex justify-content-center'>ADD NOTE</h1>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input required minLength={3} type="text" className={` form-control ${note.title.length === 0 ? '' : note.title.length < 3 ? 'is-invalid' : 'is-valid'}`} value={note.title} placeholder="Your Note Title here" onChange={onChange} name="title" id="title" />
                                <div className={note.title.length < 3 ? 'invalid-feedback' : 'valid-feedback'}>
                                    {note.title.length < 3 ? 'Please Enter a Valid Title' : 'Looks Good'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input required minLength={10} type="text" className={` form-control ${note.description.length === 0 ? '' : note.description.length < 10 ? 'is-invalid' : 'is-valid'}`} placeholder="Your Note Description here" onChange={onChange} value={note.description} name="description" id="description" />
                                <div className={note.description.length < 10 ? 'invalid-feedback' : 'valid-feedback'}>
                                    {note.description.length < 10 ? 'Please Enter a Valid Description' : 'Looks Good'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tag">Tag</label>
                                <input required type="text" className="form-control" value={note.tag} placeholder="Your Note Tag here" onChange={onChange} name="tag" id="tag" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                    <button ref={saveNoteRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note.description.length < 10 || note.title.length < 3} type="button" className="btn btn-primary" onClick={addNoteBtn} >Add</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
}