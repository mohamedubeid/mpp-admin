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
import cmsService from 'src/service/cmsService'
import { useNavigate } from 'react-router-dom'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';


const AddCMS = () => {
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
  const { quill, quillRef } = useQuill();

  const navigate = useNavigate()

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  function handleAddCMS() {
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
      language_id: 1,
      is_active: isActive,
    }

    cmsService.postCMS(data).then((result) => {
      if(result) navigate("/cms/cms-list")
    })
  }
  
  function updateParentsData() {
    cmsService.getAllCMS().then((result) => {
      //setParentList(result.data.cmspages)
      const listt  = []
      listt.push("0 None")
      const dataa = result.data.cmspages
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
            <strong>Add</strong> <small>CMS Page Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
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
                <CFormInput type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setSlug(e.target.value)} />
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputPassword4">Short Description</CFormLabel>
                <CFormInput
                  type="text"
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
              <CButton type="submit" onClick={handleAddCMS}>
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

export default AddCMS
