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
import magazinesService from 'src/service/magazinesService'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const EditMagazine = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [eventDate, setEventDate] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [isActive, setIsActive] = useState("0")
  const { quill, quillRef } = useQuill();

  const navigate = useNavigate()
  const params = useParams()

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  function handleEditMagazine() {
    const formData = new FormData();
		formData.append('banner_image', bannerImage);
		formData.append('title', title);
		formData.append('slug', slug);
		formData.append('description', description);
		formData.append('meta_title', metaTitle);
		formData.append('meta_keywords', metaKeywords);
		formData.append('meta_desc', metaDescription);
		formData.append('is_active', isActive);
		formData.append('language_id', 1);  
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
      if(result.data.magazine.banner_image) setBannerImage(result.data.magazine.banner_image)
      if(result.data.magazine.meta_title) setMetaTitle(result.data.magazine.meta_title)
      if(result.data.magazine.meta_keywords) setMetaKeywords(result.data.magazine.meta_keywords)
      if(result.data.magazine.meta_desc)  setMetaDescription(result.data.magazine.meta_desc)
      if(result.data.magazine.is_active)  setIsActive(result.data.magazine.is_active)
      quillRef.current.firstChild.innerHTML = result.data.magazine.description
    });
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit</strong> <small>Magazine Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput value={title} type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput value={slug} type="text" id="slug" onChange={(e) => setSlug(e.target.value)} />
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
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Title</CFormLabel>
                <CFormTextarea
                  id="metaTitle"
                  rows="3"
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                  id="metaKeywords"
                  rows="3"
                  onChange={(e) => setMetaKeywords(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Description</CFormLabel>
                <CFormTextarea
                  id="metaDescription"
                  rows="3"
                  onChange={(e) => setMetaDescription(e.target.value)}
                ></CFormTextarea>
              </div>
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
