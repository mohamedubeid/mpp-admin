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
import watchesService from 'src/service/watchesService'
import { useNavigate, useParams } from 'react-router-dom'
import eventsService from 'src/service/eventsService'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const EditPosts = () => {
  const [categories, setCategories] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [writerName, setWriterName] = useState('')
  const [writerPosition, setWriterPosition] = useState('')
  const [writerImage, setWriterImage] = useState(null)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [iconOfTheWeek, setIconOfTheWeek] = useState("0")
  const [isActive, setIsActive] = useState("0")
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

  function handleEditPost() {
    const formData = new FormData();
		formData.append('categories', categories);
		formData.append('image', bannerImage);
		formData.append('title', title);
		formData.append('slug', slug);
		formData.append('writter_name', writerName);
		formData.append('writter_position', writerPosition);
		formData.append('writter_image', writerImage);
		formData.append('meta_title', metaTitle);
		formData.append('meta_tags', metaKeywords);
		formData.append('meta_description', metaDescription);
		formData.append('language_id', 1);
		formData.append('description', description);
		formData.append('icon_of_the_week', description);
		formData.append('is_active', description);
    eventsService.editEvents(params.id, formData).then(
      (result) => {
        console.log(result)
        navigate("/watches/posts")
      }
    )
  }

  useEffect(() => {
    watchesService.getWatchPost(params.id).then((result) => {
      if(result.data.post.title) setTitle(result.data.post.title)
      if(result.data.post.classified_slug) setSlug(result.data.post.classified_slug)
      if(result.data.post.description) setDescription(result.data.post.description)
      if(result.data.post.banner_image) setBannerImage(result.data.post.banner_image)
      if(result.data.post.writtername) setWriterName(result.data.post.writtername)
      if(result.data.post.writter_possition) setWriterPosition(result.data.post.writter_possition)
      if(result.data.post.writter_img) setWriterImage(result.data.post.writter_img)
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
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput value={title} type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput value={slug} type="text" id="slug" onChange={(e) => setSlug(e.target.value)} />
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
              </div>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Writer</strong> <small>Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Writer Name</CFormLabel>
                <CFormInput
                  value={writerName}
                  type="text"
                  id="inputEmail4"
                  onChange={(e) => setWriterName(e.target.value)}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Writer Position</CFormLabel>
                <CFormInput
                  value={writerPosition}
                  type="text"
                  id="inputPassword4"
                  onChange={(e) => setWriterPosition(e.target.value)}
                />
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Writer Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="formFile"
                  onChange={(e) => setWriterImage(e.target.files[0])}
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
                  value={metaTitle}
                  id="metaTitle"
                  rows="3"
                  onChange={(e) => setMetaTitle(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Keywords</CFormLabel>
                <CFormTextarea
                 value={metaKeywords}
                  id="metaKeywords"
                  rows="3"
                  onChange={(e) => setMetaKeywords(e.target.value)}
                ></CFormTextarea>
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
                    name="icon of the week"
                    id="IconOfTheWeek"
                    value="Yes"
                    label="Yes"
                    onChange={() => setIconOfTheWeek("1")}
                    defaultChecked
                  />
                  <CFormCheck
                    type="radio"
                    name="icon of the week"
                    id="IconOfTheWeek"
                    value="No"
                    label="No"
                    onChange={() => setIconOfTheWeek("0")}
                    defaultChecked
                  />
                </CCol>
              </fieldset>
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
