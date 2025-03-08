

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserAuthorContextObj } from '../../contexts/UserAuthorContext';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { ImBlocked } from "react-icons/im";
import { FcApprove } from "react-icons/fc";

function AdminDashboard() {
    const { getToken } = useAuth();
    const { currentUser, setCurrentUser } = useContext(UserAuthorContextObj);
    const [storeuser, setStoreUser] = useState([]);
    const [storeauthor, setStoreauthor] = useState([]);
    const [error, setError] = useState('');

    // Fetch all users
    async function getAllUsers() {
        try {
            const token = await getToken();
            const res = await axios.get('http://localhost:3000/admin-api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.message === 'all users') {
                setStoreUser(res.data.payload);
                setError('');
            } else {
                setError(res.data.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users');
        }
    }

    // Fetch all authors
    async function getAllAuthors() {
        try {
            const token = await getToken();
            let res = await axios.get('http://localhost:3000/admin-api/authors', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.message === 'all authors') {
                setStoreauthor(res.data.payload);
                setError('');
            } else {
                setError(res.data.message);
            }
        } catch (error) {
            console.error('Error fetching authors:', error);
            setError('Failed to fetch authors');
        }
    }

    async function blockUsers(email) {
      try {
         
          let res = await axios.put(`http://localhost:3000/admin-api/user/${email}`,
              { isActive: false });
          if (res.data.message === 'Your account is blocked or activated') {
              setStoreUser(storeuser.map(user => user.email === email ? { ...user, isActive: false } : user));
              getAllUsers(); // Refetch users to ensure UI is up-to-date
          }
      } catch (error) {
          console.error('Error blocking user:', error);
          setError('Failed to block user');
      }
  }
    // Activate a user
    async function activateUsers(email) {
      
      console.log('Activating user with email:', email);
        try{
          
        let res = await axios.put(`http://localhost:3000/admin-api/user/${email}`,
            { isActive: true });
        if (res.data.message === 'Your account is blocked or activated') {
            setStoreUser(storeuser.map(user => user.email === email ? { ...user, isActive: true } : user));
            getAllUsers();
        }
        } catch (error) {
          console.error('Error blocking user:', error);
          setError('Failed to block user');
      }
    }

    // Block an author
    async function blockAuthors(email) {
      
      try{
        
        let res = await axios.put(`http://localhost:3000/admin-api/author/${email}`,
            { isActive: false });
        if (res.data.message === 'Your account is blocked or activated') {
            setStoreauthor(storeauthor.map(author => author.email === email ? { ...author, isActive: false } : author));
            getAllAuthors();
        }
      }catch (error) {
        console.error('Error blocking user:', error);
        setError('Failed to block user');
    }
    }

    // Activate an author
    async function activateAuthors(email) {
        try{
         
        let res = await axios.put(`http://localhost:3000/admin-api/author/${email}`,
            { isActive: true });
        if (res.data.message === 'Your account is blocked or activated') {
            setStoreauthor(storeauthor.map(author => author.email === email ? { ...author, isActive: true } : author));
            getAllAuthors();
        }
        }catch (error) {
          console.error('Error blocking user:', error);
          setError('Failed to block user');
      }
    }

    // Fetch data on component mount
    useEffect(() => {
        getAllUsers();
        getAllAuthors();
    }, []);

    return (
        <div className='container'>
            <div>
                {error.length !== 0 && <p className='display-4 text-center mt-5 text-danger'>{error}</p>}

                {/* Users Flexbox Layout */}
               <div className='d-flex flex-wrap gap-4 justify-content-center align-items-strength'>
               {currentUser.role === 'admin' && (
                    <div className='d-flex flex-wrap gap-4 justify-content-center '>
                        {storeuser.map((userObj) => (
                            <div className="card h-100 d-flex flex-column" key={userObj.email} style={{ width: '18rem' }}>
                                <div className='card-body text-center d-flex flex-column h-100'>
                                    <img src={userObj.profileImageUrl} width="80px" className="rounded-circle mb-3" alt="" />
                                    <p className='card-text text-success fs-1'>{userObj.role}</p>
                                    <h5 className="card-title">{userObj.firstName} {userObj.lastName}</h5>
                                    <p className="card-text text-secondary">{userObj.email}</p>
                            
                                    <div className='mt-auto d-flex  justify-content-center gap-2'>
                                        {userObj.isActive ? (
                                            <button className="btn btn-danger" onClick={() => blockUsers(userObj.email)}>
                                                <ImBlocked /> Block
                                            </button>
                                        ) : (
                                            <button className="btn btn-success" onClick={() => activateUsers(userObj.email)}>
                                                <FcApprove /> Activate
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Authors Flexbox Layout */}
                {currentUser.role === 'admin' && (
                    <div className='d-flex flex-wrap gap-4 justify-content-center mt-4 h-100' >
                        {storeauthor.map((authorObj) => (
                            <div className="card h-100 d-flex flex-column" key={authorObj.email} style={{ width: '18rem'  }}>
                                <div className='card-body text-center d-flex flex-column h-100'>
                                    <img src={authorObj.profileImageUrl} width="80px" className="rounded-circle mb-3" alt="" />
                                    <p className='card-text text-success fs-1' >{authorObj.role}</p>
                                    <h5 className="card-title">{authorObj.firstName} {authorObj.lastName}</h5>
                                    <p className="card-text text-secondary">{authorObj.email}</p>
                                    <div className='mt-auto d-flex justify-content-center gap-2'>
                                        {authorObj.isActive ? (
                                            <button className="btn btn-danger" onClick={() => blockAuthors(authorObj.email)}>
                                                <ImBlocked /> Block
                                            </button>
                                        ) : (
                                            <button className="btn btn-success" onClick={() => activateAuthors(authorObj.email)}>
                                                <FcApprove /> Activate
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

               </div>


            </div>
        </div>
    );
}

export default AdminDashboard;