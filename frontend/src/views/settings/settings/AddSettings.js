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
  CFormFeedback,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState } from 'react'
import SettingsService from 'src/service/settingsService'
import { useNavigate } from 'react-router-dom'

const AddPosts = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [lang, setLang] = useState(1)

  const navigate = useNavigate()
  
  function handleAddSetting(event) {
    event.preventDefault();
    const data = {
      setting_title: title,
      setting_value: value,
      language_id: lang,
    }
    SettingsService.postSetting(data).then((result) => {
      if(result) navigate("/settings/setting-list")
    }).catch((err) => alert(err+"\n please fill out all fields"))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add</strong> <small>Setting Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true} className="row g-3">
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Setting Title</CFormLabel>
                <CFormInput type="text" id="title" onChange={(e) => setTitle(e.target.value)} invalid required />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Setting Value</CFormLabel>
                <CFormInput type="text" id="value" onChange={(e) => setValue(e.target.value)} invalid required/>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Language:</legend>
                <CCol sm={10}>
                  <CFormCheck
                    type="radio"
                    name="lang"
                    id="IsActive"
                    value="eng"
                    label="English"
                    onChange={() => setLang(1)}
                    defaultChecked
                  />
                  <CFormCheck
                    type="radio"
                    name="lang"
                    id="IsActive"
                    value="ar"
                    label="Arabic"
                    onChange={() => setLang(0)}
                  />
                </CCol>
              </fieldset>
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
