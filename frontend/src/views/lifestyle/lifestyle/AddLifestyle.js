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
  CFormFeedback,
  CRow,
  CSpinner
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState } from 'react'
import lifestyleService from 'src/service/lifestyleService'
import { useNavigate } from 'react-router-dom'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const AddLifestyle = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [isActive, setIsActive] = useState("0")
  const [lang, setLang] = useState(1)
  const { quill, quillRef } = useQuill();

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  function handleAddLifestyle(event) {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData();
		formData.append('banner_image', bannerImage);
		formData.append('title', title);
		formData.append('slug', slug);
		formData.append('description', description);
		formData.append('meta_title', metaTitle);
		formData.append('meta_tags', metaKeywords);
		formData.append('meta_description', metaDescription);
		formData.append('is_active', isActive);
		formData.append('language_id', lang);
    // const data = {
    //   title: title,
    //   slug: slug,
    //   description: description,
    //   banner_image: bannerImage,
    //   meta_title: metaTitle,
    //   meta_keywords: metaKeywords,
    //   meta_desc: metaDescription,
    //   isActive: isActive,
    // }
    lifestyleService.postLifestyle(formData).then((result) => {
      if(result) navigate("/lifestyle/lifestyle-list")
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
                <CFormInput type="text" id="title" onChange={(e) => setTitle(e.target.value)} invalid required/>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setSlug(e.target.value)} invalid required/>
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
                  invalid
                  required
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
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                  id="metaKeywords"
                  rows="3"
                  invalid
                  required
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
              <CButton type="submit" onClick={handleAddLifestyle}>
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

export default AddLifestyle
