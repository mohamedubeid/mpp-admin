import React, {useEffect, useState} from 'react'
import { useParams, useNavigate,useLocation } from 'react-router-dom'
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
import cmsService from 'src/service/cmsService'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const EditCMS = () => {
  const [parentList, setParentList] = useState([])
  const [parent, setParent] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')
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

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if(langURL === 'ar'){
      setLang(2);
    } 
    if(lang === 'en'){
      setLang(1);
    }
  },[])
  
  const params = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  function handleEditCMS(e) {
    e.preventDefault()
    setLoading(true)
    const parent_page = parent.substring(0, parent.indexOf(" "));
    const data = {
      parent_page: parent_page, 
      title: title,
      slug: slug,
      short_description: shortDescription,
      description: description,
      meta_title: metaTitle,
      meta_keywords: metaKeywords,
      meta_description: metaDescription,
      language_id: lang,
      is_active: isActive,
    }
    cmsService.editCMS(params.id, data).then(
      (result) => {
        console.log(result)
        navigate("/cms/cms-list")
      }
    ).catch((err) => {
      alert(err+"\n 1- Please fill out all required fields")
      setLoading(false)
    })
  }

  useEffect(async () => {
    await cmsService.getCMSPage(params.id).then((result) => {
      if(result.data.cmspage.parent_id && result.data.cmspage.title) setParent("id: "+result.data.cmspage.parent_id + "  title:  " + result.data.cmspage.title)
      if(result.data.cmspage.title) setTitle(result.data.cmspage.title)
      if(result.data.cmspage.cms_slug) setSlug(result.data.cmspage.cms_slug)
      if(result.data.cmspage.small_description) setShortDescription(result.data.cmspage.small_description)
      if(result.data.cmspage.description) setDescription(result.data.cmspage.description)
      if(result.data.cmspage.meta_title) setMetaTitle(result.data.cmspage.meta_title)
      if(result.data.cmspage.meta_keywords) setMetaKeywords(result.data.cmspage.meta_keywords)
      if(result.data.cmspage.meta_desc)  setMetaDescription(result.data.cmspage.meta_desc)
      if(result.data.cmspage.is_active)  setIsActive(result.data.cmspage.is_active)
      quillRef.current.firstChild.innerHTML = result.data.cmspage.description
    });
  }, []);

  function updateParentsData() {
    
    cmsService.getAllCMS(lang).then((result) => {
      const listt  = []
      listt.push("0 None")
      const dataa = result.data.cmspages
      for(const key in dataa){
        listt.push(dataa[key].id+" "+dataa[key].title)
      }
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
            <strong>Edit</strong> <small>CMS Page Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true} className="row g-3">
            <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Selected Parent Page: {parent}</CFormLabel>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput type="text" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput type="text" value={slug} id="slug" disabled onChange={(e) => setSlug(e.target.value)} />
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputPassword4">Short Description</CFormLabel>
                <CFormInput
                  type="text"
                  value={shortDescription} 
                  id="description"
                  onChange={(e) => setShortDescription(e.target.value)}
                />
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
                  id="metaTitle"
                  value={metaTitle}
                  rows="3"
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                  id="metaKeywords"
                  value={metaKeywords}
                  rows="3"
                  onChange={(e) => setMetaKeywords(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Description</CFormLabel>
                <CFormTextarea
                  id="metaDescription"
                  value={metaDescription}
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
              <CButton type="submit" onClick={handleEditCMS}>
                {' '}
                Submit
              </CButton>
              <br></br>
              {loading ? <CSpinner color="primary"/> : <></>}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditCMS
