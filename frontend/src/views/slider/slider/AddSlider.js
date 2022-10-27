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
  CFormFeedback,
  CInputGroupText,
  CFormTextarea,
  CRow,
  CSpinner
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
  const [lang, setLang] = useState(1)
  const [isActive, setIsActive] = useState("0")

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleAddSlider(event) {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData();
		formData.append('banner_image', bannerImage);
		formData.append('title', title);
		formData.append('link', link);
		formData.append('description', description);
		formData.append('short_description', shortDescription);
		formData.append('language_id', lang);
		formData.append('is_active', isActive);
    //  const data = {
    //   title: title,
    //   short_description: shortDescription,
    //   link: link,
    //   description: description,
    //   banner_image: bannerImage,
    //   language_id: 1,
    //   isActive: isActive,
    // }
    slidersService.postSliders(formData).then((result) => {
      if(result) navigate("/slider/slider-list")
      console.log(result.data.error)
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
            <strong>Add</strong> <small>Slider Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true} className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput type="text" id="title" onChange={(e) => setTitle(e.target.value)} invalid required/>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
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
                  invalid
                  required
                  onChange={(e) => setBannerImage(e.target.files[0])}
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
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
              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Language:</legend>
                <CCol sm={10}>
                  <CFormCheck
                    type="radio"
                    name="lang"
                    id="lang"
                    value="eng"
                    label="English"
                    onChange={() => setLang(1)}
                    defaultChecked
                  />
                  <CFormCheck
                    type="radio"
                    name="lang"
                    id="lang"
                    value="ar"
                    label="Arabic"
                    onChange={() => setLang(2)}
                  />
                </CCol>
              </fieldset>
              <CButton type="submit" onClick={handleAddSlider}>
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

export default AddSlider
