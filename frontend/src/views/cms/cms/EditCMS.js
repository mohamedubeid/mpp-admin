import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  const { quill, quillRef } = useQuill();

  const params = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  function handleEditCMS() {
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
      language_id: "1",
      is_active: isActive,
    }
    cmsService.editCMS(params.id, data).then(
      (result) => {
        console.log(result)
        navigate("/cms/cms-list")
      }
    )
  }

  useEffect(async () => {
    await cmsService.getCMSPage(params.id).then((result) => {
      if(result.data.cmspage.parent_id && result.data.cmspage.title) setParent(result.data.cmspage.parent_id + " " + result.data.cmspage.title)
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
    cmsService.getAllCMS().then((result) => {
      const listt  = []
      listt.pust("0 None")
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
            <CForm className="row g-3">
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Parent Page</CFormLabel>
                <CFormSelect 
                onChange={(e) => setParent(e.target.value)}
                options={parentList} 
                aria-label="Default select example"
                defaultValue={parent}>
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput type="text" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput type="text" value={slug} id="slug" onChange={(e) => setSlug(e.target.value)} />
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
                <legend className="col-form-label col-sm-2 pt-0">Is Active:</legend>
                <CCol sm={10}>
                  <CFormCheck
                    type="radio"
                    name="is active"
                    id="IsActive"
                    value="inactive"
                    label="In Active"
                    onChange={() => setIsActive("0")}
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
              <CButton type="submit" onClick={handleEditCMS}>
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

export default EditCMS
