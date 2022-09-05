import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://mpp-me.com" target="_blank" rel="noopener noreferrer">
          MPP-ME
        </a>
        <span className="ms-1">&copy; 2022 MPP-ME LLC.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
