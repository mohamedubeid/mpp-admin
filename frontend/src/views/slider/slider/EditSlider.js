import React, {useState, useEffect} from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'
import slidersService from 'src/service/sliderService'

const EditSlider = () => {
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [isActive, setIsActive] = useState("0")

  const navigate = useNavigate()
  const params = useParams()

  function handleEditSlider() {
    const data = {
      title: title,
      short_description: shortDescription,
      link: link,
      description: description,
      banner_image: bannerImage,
      language_id: 1,
      isActive: isActive,
    }
    slidersService.editSliders(params.id, data).then(
      (result) => {
        console.log(result)
        navigate("/slider/slider-list")
      }
    )
  }

  useEffect(() => {
    slidersService.getSliders(params.id).then((result) => {
      if(result.data.slider.title) setTitle(result.data.slider.title)
      if(result.data.slider.short_description) setShortDescription(result.data.slider.classified_slug)
      if(result.data.slider.description) setDescription(result.data.slider.description)
      if(result.data.slider.link) setLink(result.data.slider.link)
      if(result.data.slider.banner_image) setBannerImage(result.data.slider.banner_image)
    });
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit</strong> <small>Post Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput value={title} type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
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
              <CButton type="submit" onClick={handleEditSlider}>
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

export default EditSlider
