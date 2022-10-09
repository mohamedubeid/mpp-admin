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
  CFormFeedback,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import slidersService from 'src/service/sliderService'

const EditSlider = () => {
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [image, setImage] = useState("")
  const location = useLocation()
  const language = location.search
  const fullParam = language.slice(6)
  const langURL = fullParam || 'en'
  const [lang, setLang] = useState(langURL)
  const [isActive, setIsActive] = useState("0")

  const navigate = useNavigate()
  const params = useParams()

  function handleEditSlider(event) {
    event.preventDefault();
    if(lang === 'ar'){
      setLang(2);
    } 
    if(lang === 'en'){
      setLang(1);
    }
    
    const formData = new FormData();
		formData.append('banner_image', bannerImage);
		formData.append('title', title);
		formData.append('link', link);
		formData.append('description', description);
		formData.append('short_description', shortDescription);
		formData.append('language_id', lang);
		formData.append('is_active', isActive);

    slidersService.editSliders(params.id, formData).then(
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
      if(result.data.slider.banner_image) setImage(result.data.slider.banner_image)
      if(result.data.slider.is_active)  setIsActive(result.data.slider.is_active)
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
            <CForm validated={true} className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput value={title} type="text" id="title" onChange={(e) => setTitle(e.target.value)} invalid required/>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Short Description</CFormLabel>
                <CFormInput type="text" value={shortDescription} id="shortDescription" onChange={(e) => setShortDescription(e.target.value)} />
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <CFormTextarea
                  id="descriptionTextArea"
                  rows="3"
                  value={description}
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
                <CFormFeedback >Current Image: {image}</CFormFeedback>
              </div>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Link</CFormLabel>
                <CFormInput type="text" id="shortDescription" value={link} onChange={(e) => setLink(e.target.value)} />
              </CCol>
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
                    name="isactive"
                    id="IsActive"
                    label="In Active"
                    defaultChecked={isActive === "0"}
                    onChange={() => setIsActive("0")}
                  />
                  <CFormCheck
                    type="radio"
                    name="isactive"
                    id="IsActive"
                    label="Active"
                    defaultChecked={isActive === "1"}
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
                    defaultChecked={lang === 'en'}
                  />
                  <CFormCheck
                    type="radio"
                    name="lang"
                    id="lang"
                    value="ar"
                    label="Arabic"
                    onChange={() => setLang(2)}
                    defaultChecked={lang === "ar"}
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
