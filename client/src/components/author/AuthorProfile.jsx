import React from 'react'
import {NavLink,Outlet} from 'react-router-dom'
function AuthorProfile() {
  return (
    <div>

      <ul className="d-flex justify-content-around list-unstyled fs-3 mt-5">
        <li>
          <NavLink to="articles" className="text-dark text-decoration-none styles  shadow-sm" >Articles</NavLink>
        </li>
        <li>
          <NavLink to="article" className="text-dark text-decoration-none styles shadow-sm">Add new article</NavLink>
        </li>
      </ul>
      <div className='mt-5' style={{minHeight:"100vh"}}>
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthorProfile