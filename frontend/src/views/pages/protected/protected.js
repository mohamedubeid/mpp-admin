import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected() {

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login')
    } else if (localStorage.getItem('user') === 'undefined') {
      localStorage.removeItem('user')
      navigate('/login')
    } else {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user)
    }
  }, [])
  return (
    <div>
     
    </div>
  )
}

export default Protected
