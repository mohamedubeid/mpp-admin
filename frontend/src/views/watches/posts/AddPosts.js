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
  CFormFeedback,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import Multiselect from "multiselect-react-dropdown";
import watchesService from 'src/service/watchesService'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const AddPosts = () => {
  const [categories, setCategories] = useState([])
  const [allCategories, setAllCategories] = useState([])
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
  const [lang, setLang] = useState(1)

  const { quill, quillRef } = useQuill();

  const navigate = useNavigate()

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);
   
  function handleAddPost(event) {
    event.preventDefault()
    let category = []
    categories.map((e) => {
      category.push(e.substring(0, e.indexOf(" ")))
    })
    const formData = new FormData();
		// formData.append('categories', JSON.stringify(category));
    category.forEach((cate) => formData.append("categories", cate))
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
    // const data = {
    //   categories: categories,
    //   title: title,
    //   slug: slug,
    //   description: description,
    //   banner_image: bannerImage,
    //   writter_name: writerName,
    //   writter_position: writerPosition,
    //   writter_image: writerImage,
    //   meta_title: metaTitle,
    //   meta_tags: metaKeywords,
    //   meta_description: metaDescription,
    //   language_id: 1,
    //   icon_of_the_week: iconOfTheWeek,
    //   is_active: isActive,
    // }
    console.log(formData)
    watchesService.postWatchPost(formData).then((result) => {
      if(result) navigate("/watches/posts")
    }).catch((err) => alert(err))
  }

  function updateParentsData() {
    watchesService.getAllWatchCategories(lang).then((result) => {
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
                <CFormInput type="text" id="title" onChange={(e) => setTitle(e.target.value)} invalid required/>
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setSlug(e.target.value)} invalid required/>
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
                  invalid required
                  onChange={(e) => setBannerImage(e.target.files[0])}
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
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
                  type="text"
                  id="inputEmail4"
                  invalid required
                  onChange={(e) => setWriterName(e.target.value)}
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Writer Position</CFormLabel>
                <CFormInput
                  type="text"
                  id="inputPassword4"
                  invalid required
                  onChange={(e) => setWriterPosition(e.target.value)}
                />
                <CFormFeedback invalid>This field is required!</CFormFeedback>
              </CCol>
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Writer Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="formFile"
                  invalid required
                  onChange={(e) => setWriterImage(e.target.files[0])}
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
                  rows="3"
                  invalid required
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

export default AddPosts
