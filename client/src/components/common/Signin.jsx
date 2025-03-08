
import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function Signin() {
  return (
    <div className='d-flex  mt-5 justify-content-center align-items-center h-100'>
      <SignIn/>
    </div>
  )
}

export default Signin
