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
import newsService from 'src/service/newsService'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const EditPosts = () => {
  const [categories, setCategories] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')
  const [additionalDescription, setAdditionalDescription] = useState('')
  const [date, setDate] = useState('')
  const [bannerImage, setBannerImage] = useState([])
  const [image, setImage] = useState("")
  const [metaTitle, setMetaTitle] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [isActive, setIsActive] = useState("0")
  const location = useLocation()
  const language = location.search
  const fullParam = language.slice(6)
  const langURL = fullParam || 'en'
  const [lang, setLang] = useState(1)
  const { quill, quillRef } = useQuill();

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

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  function handleAddPost(e) {
    e.preventDefault()
    let category = []
    selectedCategories.map((e) => {
      let id = e.id;
      category.push(id)
    })
    const formData = new FormData();
    category.forEach((cate) => formData.append("categories", cate))
    formData.append("title", title)
    formData.append("slug", slug)
    formData.append("short_description", shortDescription)
    formData.append("description", description)
    formData.append("additional_description", additionalDescription)
    formData.append("banner_image", bannerImage)
    formData.append("date", date)
    formData.append("meta_title", metaTitle)
    formData.append("meta_tags", metaKeywords)
    formData.append("meta_description", metaDescription)
    formData.append("sort_order", sortOrder)
    formData.append("language_id", lang)
    formData.append("is_active", isActive)

    newsService.editNewsPost(params.id, formData).then(
      (result) => {
        console.log(result)
        navigate("/news/news")
      }
    ).catch((err)=>{alert(err)})
  }

  useEffect(() => {
    newsService.getNewsPost(params.id).then((result) => {
      if(result.data.post.title) setTitle(result.data.post.title)
      if(result.data.post.classified_slug) setSlug(result.data.post.classified_slug)
      if(result.data.post.small_description) setShortDescription(result.data.post.small_description)
      if(result.data.post.description) setDescription(result.data.post.description)
      if(result.data.post.extra_description) setAdditionalDescription(result.data.post.extra_description)
      if(result.data.post.target_date) setDate(result.data.post.target_date)
      if(result.data.post.banner_image) setImage(result.data.post.banner_image)
      if(result.data.post.meta_title) setMetaTitle(result.data.post.meta_title)
      if(result.data.post.meta_keywords) setMetaKeywords(result.data.post.meta_keywords)
      if(result.data.post.meta_desc)  setMetaDescription(result.data.post.meta_desc)
      if(result.data.post.sort_order)  setSortOrder(result.data.post.sort_order)
      if(result.data.post.is_active)  setIsActive(result.data.post.is_active)
      quillRef.current.firstChild.innerHTML = result.data.post.description
    });
  }, []);

  function updateParentsData() {
    newsService.getNewsCategoryList(params.id).then((result) => {
        setSelectedCategories(result.data.categories)
    })
    newsService.getAllNewsCategories().then((result) => {
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
            <CCol md={6}>
              <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
              <CFormInput invalid required value={title} type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
              <CFormInput disabled value={slug} type="text" id="slug" onChange={(e) => setSlug(e.target.value)} />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Short Description</CFormLabel>
              <CFormInput value={shortDescription} type="text" id="slug" onChange={(e) => setShortDescription(e.target.value)} />
            </CCol>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
              <div>
                <div ref={quillRef} />
              </div>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Additional Description</CFormLabel>
              <CFormTextarea
                id="descriptionTextArea"
                rows="3"
                value={additionalDescription}
                onChange={(e) => setAdditionalDescription(e.target.value)}
              ></CFormTextarea>
            </div>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Date</CFormLabel>
              <CFormInput value={date} type="text" id="slug" onChange={(e) => setDate(e.target.value)} />
            </CCol>
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">Banner Image</CFormLabel>
              <CFormInput
                type="file"
                id="formFile"
                invalid required
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
                rows="3"
                invalid required
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              ></CFormTextarea>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
              <CFormTextarea
                id="metaKeywords"
                rows="3"
                invalid required
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
              ></CFormTextarea>
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
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Sort Order</CFormLabel>
              <CFormInput invalid required value={sortOrder} type="text" id="slug" onChange={(e) => setSortOrder(e.target.value)} />
            </CCol>
            <br></br>
            <CButton type="submit" onClick={handleAddPost}>
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
