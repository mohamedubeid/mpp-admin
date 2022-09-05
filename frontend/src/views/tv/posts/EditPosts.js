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
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useNavigate, useParams } from 'react-router-dom'
import tvService from 'src/service/tvService'

const EditPosts = () => {
  const [categories, setCategories] = useState('')
  const [title, setTitle] = useState('')
  const [video, setVideo] = useState(null)
  const [slug, setSlug] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [isActive, setIsActive] = useState("0")


  const navigate = useNavigate()
  const params = useParams()

  function handleEditVideo() {
    const data = {
      categories: categories,
      title: title,
      video_file: video,
      slug: slug,
      banner_image: bannerImage,
      meta_title: metaTitle,
      meta_tags: metaKeywords,
      meta_description: metaDescription,
      language_id: 1,
      is_active: isActive,
    }

    tvService.editTvPost(params.id, data).then(
      (result) => {
        console.log(result)
        navigate("/tv/videos")
      }
    )
  }

  useEffect(() => {
    tvService.getTvVideo(params.id).then((result) => {
      if(result.data.cmspage.title) setTitle(result.data.cmspage.title)
      if(result.data.cmspage.classified_slug) setSlug(result.data.cmspage.classified_slug)
      if(result.data.cmspage.videoname) setVideo(result.data.cmspage.videoname)
      if(result.data.cmspage.banner_image) setBannerImage(result.data.cmspage.banner_image)
      if(result.data.cmspage.meta_title) setMetaTitle(result.data.cmspage.meta_title)
      if(result.data.cmspage.meta_keywords) setMetaKeywords(result.data.cmspage.meta_keywords)
      if(result.data.cmspage.meta_desc)  setMetaDescription(result.data.cmspage.meta_desc)
      if(result.data.cmspage.is_active)  setIsActive(result.data.cmspage.is_active)
    });
  }, []);

  function updateParentsData() {
    tvService.getAllTvCategories().then((result) => {
      const list  = []
      const data = result.data.categories
      for(const key in data){
        list.push(data[key].title)
      }
      setCategories(list)
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
            <strong>Edit</strong> <small>Post Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput value={title} type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Video</CFormLabel>
                <CFormInput
                  type="file"
                  id="formFile"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </div>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setSlug(e.target.value)} />
              </CCol>
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
              <CButton type="submit" onClick={handleEditVideo}>
                Submit
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditPosts
