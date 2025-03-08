import React from 'react'
import {Link,Outlet} from 'react-router-dom';
function UserProfile() {
  return (
    <div>
      <ul className="d-flex justify-content-around list-unstyled fs-1 mt-5">
        <li>
          <Link to ="articles" className="text-dark text-decoration-none styles" >Articles</Link>
        </li>
      </ul>


      <div className="mt-5" style={{minHeight:"100vh"}} >
        <Outlet/>
      </div>
    </div>
  )
}

export default UserProfile;