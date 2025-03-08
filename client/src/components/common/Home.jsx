
import React from 'react'
import {useContext,useEffect,useState} from 'react'
import { UserAuthorContextObj } from '../../contexts/UserAuthorContext'
import {useUser} from '@clerk/clerk-react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Home.css';
function Home() {
   const {currentUser,setCurrentUser}=useContext(UserAuthorContextObj);
   const [error,setError]=useState("");
   const navigate=useNavigate();

   const {isSignedIn,user,isLoaded}=useUser();

  async function onSelectedRole(e){
    setError('')
    const selectedRole=e.target.value;
    // currentUser.role=selectedRole;
    const updatedUser={...currentUser,role:selectedRole};
    let res=null;
    try{
      if(selectedRole==="author"){
        res=await axios.post('http://localhost:3000/author-api/author',updatedUser);
        let {message,payload}=res.data;
        if(message=="author"){
          if(payload.isActive===true){
            setCurrentUser({...updatedUser,...payload});
            localStorage.setItem("currentuser",JSON.stringify(payload))
          }else{
            setError('You are blocked.Please contact admin.')
          }
        
        }else{
          setError(message);
        }
      }
      if(selectedRole==='user'){
        res=await axios.post('http://localhost:3000/user-api/user', updatedUser);
        let{message,payload}=res.data;
        if(message==='user'){
          if(payload.isActive===true){
            setCurrentUser({...updatedUser,...payload});
            localStorage.setItem("currentuser",JSON.stringify(payload))
          }else{
            setError('You are blocked.Please contact admin.')
          }
        }else{
          setError(message);
        }
      }
      if(selectedRole==='admin'){
        if (currentUser.email !== "23071a1238@vnrvjiet.in") {
          setError("Invalid Role: You are not authorized as an admin.");
          return;
      }
        res=await axios.post('http://localhost:3000/admin-api/admin', updatedUser);
        let{message,payload}=res.data;
        if(message==='admin'){
          if(payload.isActive===true){
            setCurrentUser({...updatedUser,...payload});
            localStorage.setItem("currentuser",JSON.stringify(payload))
          }
        }else{
          setError(message);
        }
      }
       
    
    }catch(err){
      setError(err.message);
    }
  }

  useEffect(()=>{
    if(isSignedIn===true && user){
      setCurrentUser({
        ...currentUser,firstName:user.firstName,
        lastName:user.lastName,
        email:user.emailAddresses[0].emailAddress,
        profileImageUrl:user.imageUrl,
      })
    }
  },[isLoaded,isSignedIn,user])

  useEffect(()=>{
    if(currentUser?.role==="user" && error.length===0 &&currentUser.isActive===true){
      navigate(`/user-profile/${currentUser.email}`);
    }
    if(currentUser?.role==="author" && error.length===0 &&currentUser.isActive===true){
      navigate(`/author-profile/${currentUser.email}`);
    }
    if(currentUser?.role==="admin"&&error.length===0 &&currentUser.isActive===true){
      
      navigate(`/admin-profile/${currentUser.email}`)
     
    }
  },[currentUser,error,navigate]);

  return (
    <div className='container'>
      {
        isSignedIn===false && <div className='mt-5 text-center'>
          <img src="https://img.freepik.com/premium-photo/woman-writing-notebook-journal-home-ideas-innovation-vision_379823-12505.jpg" className='img-fluid rounded w-75' alt="" />
          <p className='text-justify mt-3 px-5'>Welcome to our platform, a dynamic space where creativity meets engagement. Whether you're here to create compelling content, interact with insightful discussions, or manage a thriving community, we provide the tools you need to make an impact. Authors can craft stories, users can explore and contribute, and administrators ensure a seamless experience for all. Join us in shaping a digital world filled with knowledge and inspiration.</p>
          <p className='mt-3 fw-bold'>Explore the roles available on this platform:</p>
          <div className="row gap-3 justify-content-center">

            <div className="col-md-4 grid d-flex align-items-center p-3">
              <img src="https://tse3.mm.bing.net/th?id=OIP.1qY-K7gqmHTeP5r0tHLMygAAAA&pid=Api&P=0&h=220" className='me-4' width="100px" height="180px" alt="" />
              <p className='text-justify'><strong>Author:</strong> Responsible for creating, editing, and managing content, ensuring fresh and engaging articles for the community.</p>
            </div>


            <div className="col-md-4 grid d-flex align-items-center p-3">
              <img src="https://pluspng.com/img-png/png-user-icon-icons-logos-emojis-users-2400.png" className='me-4' width="100px" height="180px" alt="" />
              <p className='text-justify'><strong>User:</strong> Engages with content, shares opinions through comments, and interacts with the community by discovering insightful articles.</p>
            </div>


            <div className="col-md-4 grid d-flex align-items-center p-3">
              <img src="https://thumbs.dreamstime.com/z/admin-sign-laptop-icon-stock-vector-166205404.jpg" className='me-4' width="100px" height="180px" alt="" />
              <p className='text-justify'><strong>Admin:</strong> Oversees content quality, manages users, and ensures compliance with platform guidelines for a healthy ecosystem.</p>
            </div>
          </div>
        </div>
      }

      {
        isSignedIn===true && <div>
          <h1 className='mt-5 text-secondary'><i>Hello, {user.firstName}!!..</i></h1>
          <div className='d-flex justify-content-evenly align-items-center bg-light p-3 rounded shadow-sm mt-2'>
            
            <div>
            <img src={user.imageUrl} width="120px" className='rounded-circle' alt="" />
            <p className="display-6">{user.firstName}</p>

              </div>
              
            <p className="lead">{user.emailAddresses[0].emailAddress}</p>
          </div>

          <p className='lead text-center mt-3 fs-2'><i>Select role:</i></p>
          {
            error.length!==0 &&(
              <p className="text-danger fs-5 text-center">{error}</p>
            )
          }

          <div className='d-flex py-3 justify-content-center bg-light w-50 mx-auto rounded'>
            <div className='me-4'>
              <input type="radio" name="role" id="author" value="author" className="form-check-input" onChange={onSelectedRole} />
              <label htmlFor="author" className="form-check-label ">Author</label>
            </div>

            <div className='me-4'>
              <input type="radio" name="role" id="user" value="user" className="form-check-input" onChange={onSelectedRole} />
              <label htmlFor="user" className="form-check-label">User</label>
            </div>
            <div>
              <input type="radio" name="role" id="admin" value="admin" className="form-check-input" onChange={onSelectedRole} />
              <label htmlFor="admin" className="form-check-label">Admin</label>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Home;


