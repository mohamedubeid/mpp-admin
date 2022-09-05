import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState } from 'react'
import SettingsService from 'src/service/settingsService'
import { useNavigate } from 'react-router-dom'

const AddPosts = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')

  const navigate = useNavigate()
  
  function handleAddSetting() {
    const data = {
      setting_title: title,
      setting_value: value,
      language_id: 1,
    }
    SettingsService.postSetting(data).then((result) => {
      if(result) navigate("/settings/setting-list")
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add</strong> <small>Setting Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Setting Title</CFormLabel>
                <CFormInput type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Setting Value</CFormLabel>
                <CFormInput type="text" id="value" onChange={(e) => setValue(e.target.value)} />
              </CCol>
              <CCol sm={10}>
                <CButton type="submit" onClick={handleAddSetting}>
                  {' '}
                  Submit
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddPosts
