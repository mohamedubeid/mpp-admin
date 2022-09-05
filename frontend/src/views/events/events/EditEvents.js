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
import eventsService from 'src/service/eventsService'
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const EditEvents = () => {
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
  const params = useParams()

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

  function handleEditEvent() {
    const formData = new FormData();
		formData.append('image', bannerImage);
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
		formData.append('is_active', description);
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
    eventsService.editEvents(params.id, formData).then(
      (result) => {
        console.log(result)
        navigate("/events/events-list")
      }
    )
  }

  useEffect(() => {
    eventsService.getEvents(params.id).then((result) => {
      console.log(result.data.event)
      if(result.data.event.title) setTitle(result.data.event.title)
      if(result.data.event.classified_slug) setSlug(result.data.event.classified_slug)
      if(result.data.event.telephone) setTelephone(result.data.event.telephone)
      if(result.data.event.event_date) setEventDate(result.data.event.event_date)
      if(result.data.event.venue) setVenue(result.data.event.venue)
      if(result.data.event.organizer) setOrganizer(result.data.event.organizer)
      if(result.data.event.event_fax) setEventFax(result.data.event.event_fax)
      if(result.data.event.event_email) setEventEmail(result.data.event.event_email)
      if(result.data.event.website) setWebsite(result.data.event.website)
      if(result.data.event.description) setDescription(result.data.event.description)
      if(result.data.event.banner_image) setBannerImage(result.data.event.banner_image)
      if(result.data.event.meta_title) setMetaTitle(result.data.event.meta_title)
      if(result.data.event.meta_tags) setMetaKeywords(result.data.event.meta_tags)
      if(result.data.event.meta_desc)  setMetaDescription(result.data.event.meta_desc)
      if(result.data.event.is_active)  setIsActive(result.data.event.is_active)
      quillRef.current.firstChild.innerHTML = result.data.event.description
    });
  }, []);

  return (
    <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Edit</strong> <small>Event Details</small>
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
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Telephone Number</CFormLabel>
              <CFormInput value={telephone} type="text" id="slug" onChange={(e) => setTelephone(e.target.value)} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Event Date</CFormLabel>
              <CFormInput value={eventDate} type="text" id="slug" onChange={(e) => setEventDate(e.target.value)} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Venue</CFormLabel>
              <CFormInput value={venue} type="text" id="slug" onChange={(e) => setVenue(e.target.value)} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Organizer</CFormLabel>
              <CFormInput value={organizer} type="text" id="slug" onChange={(e) => setOrganizer(e.target.value)} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Event Fax</CFormLabel>
              <CFormInput value={eventFax} type="text" id="slug" onChange={(e) => setEventFax(e.target.value)} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPassword4">Event Email</CFormLabel>
              <CFormInput value={eventEmail} type="text" id="slug" onChange={(e) => setEventEmail(e.target.value)} />
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
                value={metaTitle}
                rows="3"
                onChange={(e) => setMetaTitle(e.target.value)}
              ></CFormTextarea>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Meta Tags</CFormLabel>
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
            <CButton type="submit" onClick={handleEditEvent}>
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  )
}

export default EditEvents
