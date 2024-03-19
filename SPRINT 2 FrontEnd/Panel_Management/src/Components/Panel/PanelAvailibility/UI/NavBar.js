import { FaUserCircle } from 'react-icons/fa';
const NavBar=(props)=>{
    return(
<nav className="navbar navbar-expand-lg navbar-primary bg-primary" >
  <div className="container-fluid">
    <span className="navbar-brand ms-2 ms-4">Panel Management</span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active ms-2 mt-1" aria-current="page" href="#">Admin</a>
        </li>
      </ul>
        <a className="d-flex link-light">
        <FaUserCircle size={'1.5rem'} className='mx-2'/>
        </a>
        <div className='mx-2 me-2'>
            <div style={{fontSize:'1rem', color:'white'}}>{props.adminName}</div>
            <div style={{fontSize:'0.7rem',color:'white'}}>{props.roleName}</div>
        </div>
      
    </div>
  </div>
</nav>
        
    )
}
export default NavBar;
