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
import watchesService from 'src/service/watchesService'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const EditPosts = () => {
  const [categories, setCategories] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [bannerImage, setBannerImage] = useState([])
  const [image, setImage] = useState("")
  const [writerName, setWriterName] = useState('')
  const [writerPosition, setWriterPosition] = useState('')
  const [writerImage, setWriterImage] = useState([])
  const [image2, setImage2] = useState("")
  const [metaTitle, setMetaTitle] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [iconOfTheWeek, setIconOfTheWeek] = useState("0")
  const [isActive, setIsActive] = useState("0")
  const location = useLocation()
  const language = location.search
  const fullParam = language.slice(6)
  const langURL = fullParam || 'en'
  const [lang, setLang] = useState(1)
  const { quill, quillRef } = useQuill();

  const navigate = useNavigate()
  const params = useParams()

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  function handleEditPost(event) {
    event.preventDefault()
    const formData = new FormData();
		// formData.append('categories', categories);
    formData.append('banner_image', bannerImage);
		formData.append('title', title);
		formData.append('slug', slug);  
		formData.append('writter_name', writerName);
		formData.append('writter_position', writerPosition);
		formData.append('writter_image', writerImage);
		formData.append('meta_title', metaTitle);
		formData.append('meta_tags', metaKeywords);
		formData.append('meta_description', metaDescription);
		formData.append('language_id', lang);
		formData.append('description', description);
		formData.append('icon_of_the_week', iconOfTheWeek);
		formData.append('is_active', isActive);
    watchesService.editWatchPost(params.id, formData).then(
      (result) => {
        console.log(result)
        navigate("/watches/posts")
      }
    ).catch((err) => console.log(err))
  }

  useEffect(() => {
    watchesService.getWatchPost(params.id).then((result) => {
      if(result.data.post.title) setTitle(result.data.post.title)
      if(result.data.post.classified_slug) setSlug(result.data.post.classified_slug)
      if(result.data.post.description) setDescription(result.data.post.description)
      if(result.data.post.banner_image) setImage(result.data.post.banner_image)
      if(result.data.post.writtername) setWriterName(result.data.post.writtername)
      if(result.data.post.writter_possition) setWriterPosition(result.data.post.writter_possition)
      if(result.data.post.writter_img) setImage2(result.data.post.writter_img)
      if(result.data.post.meta_title) setMetaTitle(result.data.post.meta_title)
      if(result.data.post.meta_keywords) setMetaKeywords(result.data.post.meta_keywords)
      if(result.data.post.meta_desc)  setMetaDescription(result.data.post.meta_desc)
      if(result.data.post.is_weekicon)  setIconOfTheWeek(result.data.post.is_weekicon)
      if(result.data.post.is_active)  setIsActive(result.data.post.is_active)
      quillRef.current.firstChild.innerHTML = result.data.post.description
    });
  }, []);

  function updateParentsData() {
    watchesService.getAllWatchCategories().then((result) => {
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
                  onChange={(e) => setBannerImage(e.target.files[0])}
                />
                <CFormFeedback >Current Image: {image}</CFormFeedback>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Writer</strong> <small>Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm validated={true} className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Writer Name</CFormLabel>
                <CFormInput
                invalid required
                  value={writerName}
                  type="text"
                  id="inputEmail4"
                  onChange={(e) => setWriterName(e.target.value)}
                />
              <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Writer Position</CFormLabel>
                <CFormInput
                invalid required
                  value={writerPosition}
                  type="text"
                  id="inputPassword4"
                  onChange={(e) => setWriterPosition(e.target.value)}
                />
              <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Writer Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="formFile"
                  onChange={(e) => setWriterImage(e.target.files[0])}
                />
                <CFormFeedback >Current Image: {image2}</CFormFeedback>
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
                invalid required
                  value={metaTitle}
                  id="metaTitle"
                  rows="3"
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
              <CFormFeedback invalid>This field is required!</CFormFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                invalid required
                 value={metaKeywords}
                  id="metaKeywords"
                  rows="3"
                  onChange={(e) => setMetaKeywords(e.target.value)}
                ></CFormTextarea>
              <CFormFeedback invalid>This field is required!</CFormFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Description</CFormLabel>
                <CFormTextarea
                 value={metaDescription}
                  id="metaDescription"
                  rows="3"
                  onChange={(e) => setMetaDescription(e.target.value)}
                ></CFormTextarea>
              </div>
              <fieldset className="row mb-3">
                <h6>Status</h6>
                <legend className="col-form-label col-sm-2 pt-0">Icon of th week:</legend>
                <CCol sm={10}>
                  <CFormCheck
                    type="radio"
                    name="iconoftheweek"
                    id="IconOfTheWeek"
                    value="Yes"
                    label="Yes"
                    defaultChecked={iconOfTheWeek === "1"}
                    onChange={() => setIconOfTheWeek("1")}
                  />
                  <CFormCheck
                    type="radio"
                    name="iconoftheweek"
                    id="IconOfTheWeek"
                    value="No"
                    label="No"
                    defaultChecked={iconOfTheWeek === "0"}
                    onChange={() => setIconOfTheWeek("0")}
                  />
                </CCol>
              </fieldset>
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
              <CButton type="submit" onClick={handleEditPost}>
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
