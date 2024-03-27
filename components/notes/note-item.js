import editNote from '@/public/images/editNote.png';
import deleteNote from '@/public/images/deleteNote.png'
import Image from 'next/image';

export default function NoteItem(props) {

    const { note,updateNote } = props


    return <div className='col-md-3'>
        <div className="card my-3" >
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '50% ', zIndex: '1' }} >{note.tag}</span>
            <div className="card-body">
                <div className="d-flex justify-content-between ">
                    <h5 className="card-title">{note.title}</h5>
                    <div>
                        <Image src={editNote} alt='Delete Note' width={30} height={30} style={{ cursor: 'pointer' }}  onClick={()=>{updateNote(note)} }  />
                        <Image src={deleteNote} alt='Delete Note' width={30} height={30} style={{ cursor: 'pointer' }}  />
                    </div>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    </div>
}