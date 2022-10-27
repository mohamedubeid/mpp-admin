import React, { useState, useEffect } from 'react'
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
  CFormFeedback,
  CSpinner
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import celebritiesService from 'src/service/celebritiesService';
import { useNavigate } from 'react-router-dom';

const AddCategories = () => {
  const [parentList, setParentList] = useState([])
  const [parent, setParent] = useState('')
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

  const navigate = useNavigate()

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  function handleAddCategory(e) {
    e.preventDefault()
    setLoading(true)
    const data = {
      parent_page: parent,
      title: title,
      slug: slug,
      description: description,
      meta_title: metaTitle,
      meta_keywords: metaKeywords,
      meta_description: metaDescription,
      is_active: isActive,
      language_id: lang
    }
    celebritiesService.postCelebritiesCategory(data).then((result) => {
      if(result) navigate("/celebrity/categories-list")
    }).catch((err) => { 
      alert(err+"\n 1- Please fill out all required fields \n 2- Make sure that Slug is unique")
      setLoading(false)
    })
  }

  function updateParentsData() {
    celebritiesService.getAllCelebritiesCategories(lang).then((result) => {
      //setParentList(result.data.cmspages)
      const listt  = []
      listt.push("0 None")
      const dataa = result.data.categories
      console.log(dataa)
      for(const key in dataa){
        listt.push(dataa[key].id+" "+dataa[key].title)
      }
      console.log(listt)
      setParentList(listt)
    })
  }

  useEffect(() => {
    updateParentsData()
  }, [])
  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add</strong> <small>Category Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true} className="row g-3">
            <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Parent Page</CFormLabel>
                <CFormSelect 
                onChange={(e) => setParent(e.target.value)}
                options={parentList} 
                aria-label="Default select example">      
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput
                  type="text"
                  invalid required
                  id="inputTitle"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput invalid required type="text" id="inputSlug" onChange={(e) => setSlug(e.target.value)} />
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
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Title</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => setMetaKeywords(e.target.value)}
                ></CFormTextarea>
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
