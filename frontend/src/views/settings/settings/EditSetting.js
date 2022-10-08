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
  CFormFeedback,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import SettingsService from 'src/service/settingsService'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const EditSetting = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const location = useLocation()
  const language = location.search
  const fullParam = language.slice(6)
  const langURL = fullParam || 'en'
  const [lang, setLang] = useState(langURL)

  const navigate = useNavigate()
  const params = useParams()

  function handleEditSetting() {
    const data = {
      setting_title: title,
      setting_value: value,
      language_id: lang,
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
            <CForm validated={true} className="row g-3">
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Setting Title</CFormLabel>
                <CFormInput value={title} type="text" id="title" onChange={(e) => setTitle(e.target.value)} invalid required />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Setting Value</CFormLabel>
                <CFormInput value={value} type="text" id="value" onChange={(e) => setValue(e.target.value)} invalid required />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol sm={10}>
              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Language:</legend>
                <CCol sm={10}>
                  <CFormCheck
                    type="radio"
                    name="lang"
                    id="IsActive"
                    label="English"
                    onChange={() => setLang(1)}
                    defaultChecked={lang === 'en'}
                  />
                  <CFormCheck
                    type="radio"
                    name="lang"
                    id="IsActive"
                    label="Arabic"
                    onChange={() => setLang(2)}
                    defaultChecked={lang === "ar"}
                  />
                </CCol>
              </fieldset>
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
