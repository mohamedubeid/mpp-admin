import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import lifestyleService from 'src/service/lifestyleService'

const AddImage = () => {
  const [caption, setCaption] = useState('')
  const [bannerImage, setBannerImage] = useState()
  const [isActive, setIsActive] = useState("0")

  const navigate = useNavigate()
  const params = useParams()

  function handleAddImage() {
    const formData = new FormData();
		formData.append('image', bannerImage);
		formData.append('caption', caption);
		formData.append('is_active', isActive);
		formData.append('language_id', 1);
    lifestyleService.postImage(params.id, formData).then((result) => {
      if(result) navigate("/lifestyle/post-Images-list/"+params.id)
    })
  }
    
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add</strong> <small>Image Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Caption</CFormLabel>
                <CFormInput type="text" id="title" onChange={(e) => setCaption(e.target.value)} />
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Banner Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="formFile"
                  onChange={(e) => setBannerImage(e.target.files[0])}
                />
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Is Active</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <fieldset className="row mb-3">
                <CCol sm={10}>
                  <CFormCheck
                    type="radio"
                    name="is active"
                    id="IsActive"
                    value="inactive"
                    label="In Active"
                    onChange={() => setIsActive("0")}
                    defaultChecked
                  />
                  <CFormCheck
                    type="radio"
                    name="is active"
                    id="IsActive"
                    value="active"
                    label="Active"
                    onChange={() => setIsActive("1")}
                  />
                </CCol>
              </fieldset>
              <CButton type="submit" onClick={handleAddImage}>
                Submit
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddImage
