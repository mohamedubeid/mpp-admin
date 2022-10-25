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
  CFormFeedback
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import photoshootService from 'src/service/photoshootService'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const EditPhotoshoot = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [image, setImage] = useState("")
  const [eventDate, setEventDate] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [isActive, setIsActive] = useState("0")
  const location = useLocation()
  const language = location.search
  const fullParam = language.slice(6)
  const langURL = fullParam || 'en'
  const [lang, setLang] = useState(1)
  const { quill, quillRef } = useQuill();

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

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  function handleEditPhotoshoot(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('banner_image', bannerImage)
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('description', description)
    formData.append('event_date', eventDate)
    formData.append('city', city)
    formData.append('meta_title', metaTitle)
    formData.append('meta_tags', metaKeywords)
    formData.append('meta_description', metaDescription)
    formData.append('is_active', isActive)
    formData.append('language_id', lang)

    photoshootService.editPhotoshoots(params.id, formData).then(
      (result) => {
        console.log(result)
        navigate("/photoshoot/photoshoot-list")
      }
    )
  }

  useEffect(() => {
    photoshootService.getPhotoshoots(params.id).then((result) => {
      console.log(result.data.photoshoot)
      if(result.data.photoshoot.title) setTitle(result.data.photoshoot.title)
      if(result.data.photoshoot.classified_slug) setSlug(result.data.photoshoot.classified_slug)
      if(result.data.photoshoot.description) setDescription(result.data.photoshoot.description)
      if(result.data.photoshoot.event_date) setEventDate(result.data.photoshoot.event_date)
      if(result.data.photoshoot.banner_image) setImage(result.data.photoshoot.banner_image)
      if(result.data.photoshoot.meta_title) setMetaTitle(result.data.photoshoot.meta_title)
      if(result.data.photoshoot.meta_keywords) setMetaKeywords(result.data.photoshoot.meta_keywords)
      if(result.data.photoshoot.meta_desc)  setMetaDescription(result.data.photoshoot.meta_desc)
      if(result.data.photoshoot.is_active)  setIsActive(result.data.photoshoot.is_active)
      quillRef.current.firstChild.innerHTML = result.data.photoshoot.description
    });
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit</strong> <small>Photoshoot Details</small>
          </CCardHeader>
          <CCardBody>
          <CForm validated={true} className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput value={title} invalid required type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput value={slug} invalid required type="text" id="slug" onChange={(e) => setSlug(e.target.value)} />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <div>
                  <div ref={quillRef} />
                </div>
              </div>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">City Name</CFormLabel>
                <CFormInput value={city} type="text" id="slug" onChange={(e) => setCity(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Event Date</CFormLabel>
                <CFormInput value={eventDate} type="date" id="slug" onChange={(e) => setEventDate(e.target.value)} />
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Banner Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="formFile"
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
            <strong>SEO</strong> <small>Details</small>
          </CCardHeader>
          <CCardBody>
          <CForm validated={true}>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Title</CFormLabel>
                <CFormTextarea
                  id="metaTitle"
                  rows="3"
                  value={metaTitle}
                  invalid required
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
                  <CFormFeedback invalid>This field is required!</CFormFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                  id="metaKeywords"
                  rows="3"
                  value={metaKeywords}
                  invalid required
                  onChange={(e) => setMetaKeywords(e.target.value)}
                ></CFormTextarea>
                  <CFormFeedback invalid>This field is required!</CFormFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Description</CFormLabel>
                <CFormTextarea
                  id="metaDescription"
                  rows="3"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                ></CFormTextarea>
              </div>
              <fieldset className="row mb-3">
                <h6>Status</h6>
                <legend className="col-form-label col-sm-2 pt-0">Is Active:</legend>
                <CCol sm={10}>
                  <CFormCheck
                    type="radio"
                    name="isactive"
                    id="IsActive"
                    value="inactive"
                    label="In Active"
                    onChange={() => setIsActive('0')}
                    defaultChecked
                  />
                  <CFormCheck
                    type="radio"
                    name="isactive"
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
              <CButton type="submit" onClick={handleEditPhotoshoot}>
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

export default EditPhotoshoot
