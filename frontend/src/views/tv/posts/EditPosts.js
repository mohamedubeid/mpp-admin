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
  CFormFeedback
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import tvService from 'src/service/tvService'

const EditPosts = () => {
  const [categories, setCategories] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [title, setTitle] = useState('')
  const [video, setVideo] = useState(null)
  const [image, setImage] = useState("")
  const [vid, setVid] = useState("")
  const [slug, setSlug] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [isActive, setIsActive] = useState("0")
  const location = useLocation()
  const language = location.search
  const fullParam = language.slice(6)
  const langURL = fullParam || 'en'
  const [lang, setLang] = useState(1)

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

  function handleEditVideo(e) {
    e.preventDefault()
    let category = []
    selectedCategories.map((e) => {
      let id = e.id;
      category.push(id)
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

    tvService.editTvPost(params.id, formData).then((result) => {
      if(result) navigate("/tv/videos")
    }).catch((err) => alert(err))
  }

  useEffect(() => {
    tvService.getTvVideo(params.id).then((result) => {
      if(result.data.video.title) setTitle(result.data.video.title)
      if(result.data.video.classified_slug) setSlug(result.data.video.classified_slug)
      if(result.data.video.videoname) setVid(result.data.video.videoname)
      if(result.data.video.banner_image) setImage(result.data.video.banner_image)
      if(result.data.video.meta_title) setMetaTitle(result.data.video.meta_title)
      if(result.data.video.meta_keywords) setMetaKeywords(result.data.video.meta_keywords)
      if(result.data.video.meta_desc)  setMetaDescription(result.data.video.meta_desc)
      if(result.data.video.is_active)  setIsActive(result.data.video.is_active)
    });
  }, []);

  function updateParentsData() {
    tvService.getTvCategoryList(params.id).then((result) => {
        setSelectedCategories(result.data.categories)
    })
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
            <CForm validated={true} className="row g-3">
            <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">Categories</CFormLabel>
                <CFormFeedback>{selectedCategories.map((e) => ("ID: " + e.id + " TITLE: " + e.title + " - "))}</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput invalid required value={title} type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Video</CFormLabel>
                <CFormInput
                  type="file"
                  id="formFile"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
                <CFormFeedback >Current Videos: {vid}</CFormFeedback>
              </div>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput disabled type="text" value={slug} id="slug" onChange={(e) => setSlug(e.target.value)} />
              </CCol>
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
                  value={metaTitle}
                  rows="3"
                  invalid required
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback >This field is required !</CFormFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                  id="metaKeywords"
                  rows="3"
                  value={metaKeywords}
                  invalid required
                  onChange={(e) => setMetaKeywords(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback >This field is required !</CFormFeedback>
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
