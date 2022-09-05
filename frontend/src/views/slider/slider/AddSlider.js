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
import { useNavigate } from 'react-router-dom'
import slidersService from 'src/service/sliderService'


const AddSlider = () => {
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [isActive, setIsActive] = useState("0")

  const navigate = useNavigate()

  function handleAddSlider() {
     const data = {
      title: title,
      short_description: shortDescription,
      link: link,
      description: description,
      banner_image: bannerImage,
      language_id: 1,
      isActive: isActive,
    }
    slidersService.postSliders(data).then((result) => {
      if(result) navigate("/slider/slider-list")
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add</strong> <small>Slider Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Short Description</CFormLabel>
                <CFormInput type="text" id="shortDescription" onChange={(e) => setShortDescription(e.target.value)} />
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <CFormTextarea
                  id="descriptionTextArea"
                  rows="3"
                  onChange={(e) => setDescription(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Banner Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="formFile"
                  onChange={(e) => setBannerImage(e.target.files[0])}
                />
              </div>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Link</CFormLabel>
                <CFormInput type="text" id="shortDescription" onChange={(e) => setLink(e.target.value)} />
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Status</strong> <small>Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <fieldset className="row mb-3">
                <h6></h6>
                <legend className="col-form-label col-sm-2 pt-0">Is Active:</legend>
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
              <CButton type="submit" onClick={handleAddSlider}>
                {' '}
                Submit
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddSlider
