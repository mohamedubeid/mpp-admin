/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react'
import { CToast, CToastHeader, CToastBody } from '@coreui/react'

const Notification = (props) => {
  return (
    <CToast
      visible={true}
      style={{
        position: 'fixed',
        top: '10%',
        right: '38%',
        zIndex: 10000,
      }}
    >
      <CToastHeader closeButton>
        <svg className="rounded me-2" width="20" height="20">
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <strong className="me-auto">Notification</strong>
      </CToastHeader>
      <CToastBody>{props.msg}</CToastBody>
    </CToast>
  )
}

export default Notification
