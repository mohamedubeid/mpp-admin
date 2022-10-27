import React, { useState } from 'react'
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

import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import jewelryService from 'src/service/jewelryService';

const AddCategories = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [isActive, setIsActive] = useState("0")
  const [lang, setLang] = useState(1)
  const { quill, quillRef } = useQuill();

  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  const navigate = useNavigate()

  function handleAddCategory(event) {
    event.preventDefault()
    setLoading(true)
    const data = {
      title: title,
      slug: slug,
      description: description,
      meta_title: metaTitle,
      meta_keywords: metaKeywords,
      meta_description: metaDescription,
      is_active: isActive,
      language_id: lang
    }
    jewelryService.postJewelryCategory(data).then((result) => {
      console.log(result.data)
      if(result) navigate("/jewelry/categories")
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
            <strong>Add</strong> <small>Category Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true} className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="inputTitle"
                  onChange={(e) => setTitle(e.target.value)}
                  invalid
                  required
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput type="text" id="inputSlug" onChange={(e) => setSlug(e.target.value)} invalid required/>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <div>
                  <div ref={quillRef} />
                </div>
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
                  id="exampleFormControlTextarea1"
                  rows="3"
                  invalid required
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows="3"
                  invalid required
                  onChange={(e) => setMetaKeywords(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Description</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => setMetaDescription(e.target.value)}
                ></CFormTextarea>
              </div>
              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Is Active:</legend>
                <CCol sm={10}>
                  <CFormCheck
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="option1"
                    label="In Active"
                    onChange={() => setIsActive("0")}
                    defaultChecked
                  />
                  <CFormCheck
                    type="radio"
                    name="gridRadios"
                    id="gridRadios2"
                    value="option2"
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
              <CButton type="submit" onClick={handleAddCategory}>
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

export default AddCategories
