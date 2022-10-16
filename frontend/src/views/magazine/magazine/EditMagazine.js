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
import magazinesService from 'src/service/magazinesService'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const EditMagazine = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [bannerImage, setBannerImage] = useState([])
  const [image, setImage] = useState("")
  const [eventDate, setEventDate] = useState('')
  const [magazineURL, setMagazineURL] = useState('')
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

  function handleEditMagazine(event) {
    event.preventDefault();
    const formData = new FormData();
		formData.append('banner_image', bannerImage);
		formData.append('title', title);
		formData.append('slug', slug);
		formData.append('description', description);
    formData.append('event_date', eventDate)
    formData.append('magazine_url', magazineURL)
		formData.append('meta_title', metaTitle);
		formData.append('meta_tags', metaKeywords);
		formData.append('meta_desc', metaDescription);
		formData.append('is_active', isActive);
		formData.append('language_id', lang);  
    // const data = {
    //   title: title,
    //   classified_slug: slug,
    //   description: description,
    //   event_data: eventDate,
    //   banner_image: bannerImage,
    //   meta_title: metaTitle,
    //   meta_keywords: metaKeywords,
    //   meta_desc: metaDescription,
    //   language_id: 1,
    //   isActive: isActive,
    // }
    magazinesService.editMagazines(params.id, formData).then(
      (result) => {
        console.log(result)
        navigate("/magazine/magazine-list")
      }
    )
  }

  useEffect(() => {
    magazinesService.getMagazines(params.id).then((result) => {
      if(result.data.magazine.title) setTitle(result.data.magazine.title)
      if(result.data.magazine.classified_slug) setSlug(result.data.magazine.classified_slug)
      if(result.data.magazine.description) setDescription(result.data.magazine.description)
      if(result.data.magazine.event_date) setDescription(result.data.magazine.event_date)
      if(result.data.magazine.banner_image) setImage(result.data.magazine.banner_image)
      if(result.data.magazine.meta_title) setMetaTitle(result.data.magazine.meta_title)
      if(result.data.magazine.meta_keywords) setMetaKeywords(result.data.magazine.meta_keywords)
      if(result.data.magazine.event_date) setEventDate(result.data.magazine.event_date)
      if(result.data.magazine.magazine_url) setMagazineURL(result.data.magazine.magazine_url)
      if(result.data.magazine.meta_desc)  setMetaDescription(result.data.magazine.meta_desc)
      if(result.data.magazine.is_active)  setIsActive(result.data.magazine.is_active)
      quillRef.current.firstChild.innerHTML = result.data.magazine.description
    });
  }, []);

  useEffect(()=>{
    console.log(isActive)
  },[isActive])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit</strong> <small>Magazine Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true} className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput value={title} type="text" id="title" onChange={(e) => setTitle(e.target.value)} 
                 invalid
                 required />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput value={slug} type="text" id="slug" onChange={(e) => setSlug(e.target.value)} 
                 invalid
                 required/>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Event Date</CFormLabel>
                <CFormInput
                  type="text"
                  id="slug"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Magazine URL</CFormLabel>
                <CFormInput
                  type="text"
                  id="slug"
                  value={magazineURL}
                  onChange={(e) => setMagazineURL(e.target.value)}
                  invalid
                  required
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <div>
                  <div ref={quillRef} />
                </div>
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
                  invalid
                  required
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                  id="metaKeywords"
                  rows="3"
                  invalid
                  required
                  value={metaKeywords}
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
              <CButton type="submit" onClick={handleEditMagazine}>
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

export default EditMagazine
