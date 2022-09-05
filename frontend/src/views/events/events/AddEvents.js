import React, { useState } from 'react'
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
} from '@coreui/react'
import { DocsExample } from 'src/components'
import eventsService from 'src/service/eventsService'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const AddEvents = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [telephone, setTelephone] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [venue, setVenue] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [eventFax, setEventFax] = useState('')
  const [eventEmail, setEventEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
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
   
  function handleAddEvent() {
    // const data = {
    //   title: title,
    //   slug: slug,
    //   telephone_number: telephone,
    //   event_date: eventDate,
    //   venue: venue,
    //   organizer: organizer,
    //   event_fax: eventFax,
    //   event_email: eventEmail,
    //   website: website,
    //   description: description,
    //   banner_image: bannerImage,
    //   meta_title: metaTitle,
    //   meta_tags: metaKeywords,
    //   meta_description: metaDescription,
    //   language_id: "1",
    //   is_active: isActive,
    // }
    const formData = new FormData();
		formData.append('banner_image', bannerImage);
		formData.append('title', title);
		formData.append('slug', slug);
		formData.append('telephone_number', telephone);
		formData.append('event_date', eventDate);
		formData.append('venue', venue);
		formData.append('organizer', organizer);
		formData.append('event_fax', eventFax);
		formData.append('event_email', eventEmail);
		formData.append('website', website);
		formData.append('meta_title', metaTitle);
		formData.append('meta_tags', metaKeywords);
		formData.append('meta_description', metaDescription);
		formData.append('language_id', 1);
		formData.append('description', description);
		formData.append('is_active', isActive);
    eventsService.postEvents(formData).then((result) => {
      if(result) navigate("/events/events-list")
    })
  }
    
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add</strong> <small>Event Details</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Title</CFormLabel>
                <CFormInput type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Slug</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setSlug(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Telephone Number</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setTelephone(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Event Date</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setEventDate(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Venue</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setVenue(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Organizer</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setOrganizer(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Event Fax</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setEventFax(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Event Email</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setEventEmail(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">Website</CFormLabel>
                <CFormInput type="text" id="slug" onChange={(e) => setWebsite(e.target.value)} />
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
                <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Tags</CFormLabel>
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
              <CButton type="submit" onClick={handleAddEvent}>
                Submit
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEvents
