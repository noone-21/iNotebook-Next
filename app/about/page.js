import classes from './page.module.css'

export default function About(){
    return (
    <div className={`container  ${classes.about}`} >
    <h1 className='d-flex justify-content-center' >About Us</h1>
    <div className="accordion my-2" id="accordionExample" >
      <div className="accordion-item" >
        <h2 className="accordion-header" id="headingOne" >
          <button  className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <strong>iNotebook-The Cloud Storage for Your Notes.</strong>
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            iNotebook is a safe and secure app for your notes, You can Add New Notes, Delete your existing notes and update your existing notes too. Your notes are completely safe with us. Only the authorized person <strong>whom you have given access to your credentials</strong> can login to your account and access your notes. Your account is completely secure. The password is  completely encrypted. Even if an intruder gets into our database <strong>Which is very unlikely</strong> he won't be able to see your actual password.
          </div>
        </div>
      </div>
    </div>
  </div>
) }