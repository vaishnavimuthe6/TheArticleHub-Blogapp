import {useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useClerk,useUser} from '@clerk/clerk-react'
import { UserAuthorContextObj } from '../../contexts/UserAuthorContext' 

const Header=()=> {

const {signOut}=useClerk();
const {currentUser,setCurrentUser}=useContext(UserAuthorContextObj);
const navigate=useNavigate();
const {isSignedIn,user,isLoaded}=useUser();
const handleSignOut=async()=>{
  console.log("signpout called");
  try{
    await signOut();
    setCurrentUser(null);
    localStorage.clear();
    navigate('/')
  }catch(err){
    console.error("Error signing out:",err);
  }
};


  return (
   <div >
    <nav className='d-flex justify-content-between py-3 head'>
      <div className='d-flex justify-content-center'>
            <Link to='/'>
            <img src="https://img.freepik.com/premium-vector/gradient-quill-writing-open-book-judicial-vector-illustration_992795-8973.jpg" alt="" width="70px" className='ms-4 rounded' /></Link>
      </div>
      <h1 className="title text-center align-items-center">THE ARTICLE HUB</h1>
      <ul className='d-flex list-unstyled justify-content-center align-items-center me-3'>
        {/* <li>
          <Link to="">Home</Link>
        </li> */}
        {!isSignedIn?(
          <>
             <li>
          <Link to="Signin" className="me-4 text-decoration-none text-black rounded p-2 bg-info">SignIn</Link>
           </li>
        <li>
          <Link to="Signout" className='text-decoration-none text-black rounded p-2 bg-info'>SignUp</Link>
        </li>
          </>
        ):(
           <div className="user-button">
            <div style={{position:"relative"}}>
                <img src={user.imageUrl} width="30px" className="rounded-circle " alt="" />
                <p className="role bg-warning rounded p-1" style={{position:"absolute",top:"-20px",right:"-5px"}}>{currentUser.role}</p>
            <div>
              <p className="mb-0 user-name">{user.firstName}</p>
            </div>

              <button onClick={handleSignOut} className='btn btn-info'>SignOut</button>

            </div>
           </div>
        )
        }
       
      </ul>
    </nav>
   </div>
  )
}

export default Header