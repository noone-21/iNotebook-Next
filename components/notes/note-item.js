import editNote from '@/public/images/editNote.png';
import deleteImg from '@/public/images/deleteNote.png'
import Image from 'next/image';

export default function NoteItem(props) {

    const { note,updateNote, deleteNote } = props


    return <div className='col-md-3'>
        <div className="card my-3" style={{background: 'linear-gradient(#1B4242, #092635)', border: 'none'}} >
            <span className="position-absolute top-0  translate-middle badge rounded-pill " style={{ left: '50% ', zIndex: '1', backgroundColor:'#5C8374', color: '#060504'}} >{note.tag}</span>
            <div className="card-body">
                <div className="d-flex justify-content-between ">
                    <h5 className="card-title" style={{color: '#060504',fontWeight:'bolder'}} >{note.title}</h5>
                    <div style={{display: 'flex'}} >
                        <Image src={editNote} alt='Delete Note' width={30} height={30} style={{ cursor: 'pointer' }}  onClick={()=>{updateNote(note)} }  />
                        <Image src={deleteImg} alt='Delete Note' width={30} height={30} style={{ cursor: 'pointer' }}  onClick={()=>{deleteNote(note._id)} }  />
                    </div>
                </div>
                <p className="card-text" style={{color: '#060504',fontWeight:'bolder'}} >{note.description}</p>
            </div>
        </div>
    </div>
}