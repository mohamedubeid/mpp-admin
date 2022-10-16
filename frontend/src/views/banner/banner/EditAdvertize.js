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
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import bannersService from 'src/service/bannersService'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const EditAdvertize = () => {
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [image, setImage] = useState("")
  const [type, setType] = useState("Header")
  const [isActive, setIsActive] = useState("0")
  const location = useLocation()
  const language = location.search
  const fullParam = language.slice(6)
  const langURL = fullParam || 'en'
  const [lang, setLang] = useState(1)

  useEffect(() => {
    if(langURL === 'ar'){
      setLang(2);
    } 
    if(lang === 'en'){
      setLang(1);
    }
  },[])

  const navigate = useNavigate()
  const params = useParams()

  function handleAddAdvertize(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('banner_image', bannerImage)
    formData.append('title', title)
    formData.append('advertize_url', link)
    formData.append('type', type)
    formData.append('is_active', isActive)
    formData.append('language_id', lang)
    console.log(type)
    bannersService.editBanners(params.id, formData)
    .then((result) => {
      if (result) navigate('/banners/advertize-list')
    })
    .catch((err) => alert(err + '\n please fill out all fields'))
  }
  
  useEffect(() => {
    bannersService.getBanners(params.id).then((result) => {
      if(result.data.banner.title) setTitle(result.data.banner.title)
      if(result.data.banner.advertize_url) setLink(result.data.banner.advertize_url)
      if(result.data.banner.type) setType(result.data.banner.type)
      if(result.data.banner.is_active) setIsActive(result.data.banner.is_active)
      if(result.data.banner.image_path) setImage(result.data.banner.image_path)
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
                <CFormInput invalid required type="text" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Type</CFormLabel>
                <CFormSelect 
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
                  value={link}
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
              <CFormFeedback >Current Image: {image}</CFormFeedback>
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
                    id="IsActive"
                    value="eng"
                    label="English"
                    onChange={() => setLang(1)}
                    defaultChecked={langURL === 'en'}
                  />
                  <CFormCheck
                    type="radio"
                    name="lang"
                    id="IsActive"
                    value="ar"
                    label="Arabic"
                    onChange={() => setLang(2)}
                    defaultChecked={langURL === 'ar'}
                  />
                </CCol>
              </fieldset>
              <CButton type="submit" onClick={handleAddAdvertize}>
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

export default EditAdvertize
