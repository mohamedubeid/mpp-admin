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
  CFormFeedback,
  CFormTextarea,
  CRow,
  CSpinner
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState } from 'react'
import bannersService from 'src/service/bannersService'
import { useNavigate } from 'react-router-dom'

const AddAdvertize = () => {
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [type, setType] = useState("Header")
  const [isActive, setIsActive] = useState("0")
  const [lang, setLang] = useState(1)

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleAddAdvertize(event) {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('banner_image', bannerImage)
    formData.append('title', title)
    formData.append('advertize_url', link)
    formData.append('type', type)
    formData.append('is_active', isActive)
    formData.append('language_id', lang)
   
    bannersService.postBanners(formData)
    .then((result) => {
      if (result) navigate('/banners/advertize-list')
    }).catch((err) => { 
      alert(err+"\n 1- Please fill out all required fields \n 2- Make sure that Slug is unique")
      setLoading(false)
    })
  }
  

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add</strong> <small>Post Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true} className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput invalid required type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Type</CFormLabel>
                <CFormSelect 
                value={type}
                onChange={(e) => setType(e.target.value)}
                invalid required
                options={["Header", "Footer", "Popup Banner", "Home page Banner"]} 
                aria-label="Default select example">      
                </CFormSelect>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputPassword4">Advertize Link</CFormLabel>
                <CFormInput
                  type="text"
                  invalid required
                  id="description"
                  onChange={(e) => setLink(e.target.value)}
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Banner Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="formFile"
                  invalid required
                  onChange={(e) => setBannerImage(e.target.files[0])}
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Status</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm>
            <fieldset className="row mb-3">
                <h6>Status</h6>
                <legend className="col-form-label col-sm-2 pt-0">Is Active:</legend>
                <CCol sm={10}>
                  <CFormCheck
                    type="radio"
                    name="is active"
                    id="IsActive"
                    value="inactive"
                    label="In Active"
                    onChange={() => setIsActive('0')}
                    defaultChecked
                  />
                  <CFormCheck
                    type="radio"
                    name="is active"
                    id="IsActive"
                    value="active"
                    label="Active"
                    onChange={() => setIsActive('1')}
                  />
                </CCol>
              </fieldset>
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
                    onChange={() => setLang(2)}
                  />
                </CCol>
              </fieldset>
              <CButton type="submit" onClick={handleAddAdvertize}>
                {' '}
                Submit
              </CButton>
              <br></br>
              <br></br>
              {loading ? <CSpinner color="primary"/> : <></>}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddAdvertize
