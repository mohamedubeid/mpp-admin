import React, { useState, useEffect } from 'react'
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
import SettingsService from 'src/service/settingsService'
import { useNavigate, useParams } from 'react-router-dom'

const EditSetting = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')

  const navigate = useNavigate()
  const params = useParams()

  function handleEditSetting() {
    const data = {
      setting_title: title,
      setting_value: value,
      language_id: 1,
    }
    SettingsService.editSetting(params.id, data).then(
      (result) => {
      navigate("/settings/setting-list")
      }
    )
  }

  useEffect(() => {
    SettingsService.getSetting(params.id).then((result) => {
      if(result.data.setting.default_title) setTitle(result.data.setting.default_title)
      if(result.data.setting.value) setValue(result.data.setting.value)
    });
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit</strong> <small>Setting Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Setting Title</CFormLabel>
                <CFormInput value={title} type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Setting Value</CFormLabel>
                <CFormInput value={value} type="text" id="value" onChange={(e) => setValue(e.target.value)} />
              </CCol>
              <CCol sm={10}>
                <CButton type="submit" onClick={handleEditSetting}>
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

export default EditSetting
