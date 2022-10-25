import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import tvService from 'src/service/tvService'
import Multiselect from "multiselect-react-dropdown";

const AddPosts = () => {
  const [categories, setCategories] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [title, setTitle] = useState('')
  const [video, setVideo] = useState(null)
  const [slug, setSlug] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [isActive, setIsActive] = useState("0")
  const [lang, setLang] = useState(1)

  const navigate = useNavigate()
   
  function handleAddVideo(e) {
    e.preventDefault()
    let category = []
    categories.map((e) => {
      category.push(e.substring(0, e.indexOf(" ")))
    })
    const formData = new FormData();
    category.forEach((cate) => formData.append("categories[]", cate))
    formData.append("title", title)
    formData.append("slug", slug)
    formData.append("banner_image", bannerImage)
    formData.append("video_file", video)
    formData.append("meta_title", metaTitle)
    formData.append("meta_tags", metaKeywords)
    formData.append("meta_description", metaDescription)
    formData.append("language_id", lang)
    formData.append("is_active", isActive)

    tvService.postTvPost(formData).then((result) => {
      if(result) navigate("/tv/videos")
    }).catch((err) => alert(err))
  }


  function updateParentsData() {
    tvService.getAllTvCategories(lang).then((result) => {
      //setParentList(result.data.cmspages)
      const listt  = []
      listt.push("0 None")
      const dataa = result.data.categories
      for(const key in dataa){
        listt.push(dataa[key].id+" "+dataa[key].title)
      }
      console.log(listt)
      setAllCategories(listt)
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
            <strong>Add</strong> <small>Post Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true} className="row g-3">
            <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Select Category</CFormLabel>
                <Multiselect
              showArrow={true } 
              closeOnSelect={true}
              isObject={false}
              onKeyPressFn={function noRefCheck(){}}
              onRemove={function noRefCheck(){}}
              onSearch={function noRefCheck(){}}
              onSelect={function handleChange(e){
                setCategories(e);
              }}
              options={allCategories}
              value={categories}
              placeholder="Select Categories Here"
              emptyRecordMsg="No options avaliable"
              />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput invalid required type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Video</CFormLabel>
                <CFormInput
                  type="file"
                  invalid required
                  id="formFile"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </div>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput invalid required type="text" id="slug" onChange={(e) => setSlug(e.target.value)} />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Banner Image</CFormLabel>
                <CFormInput
                  type="file"
                  invalid required
                  id="formFile"
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
                  invalid required
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                  id="metaKeywords"
                  invalid required
                  rows="3"
                  onChange={(e) => setMetaKeywords(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
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
              <CButton type="submit" onClick={handleAddVideo}>
                Submit
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddPosts
