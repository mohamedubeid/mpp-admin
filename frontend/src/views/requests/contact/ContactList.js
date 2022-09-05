import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import requestsService from 'src/service/requestsService'

const ContactList = () => {

    const [contactTable, setContactTable] = useState([])

    function updateData() {
      requestsService.getAllContact().then((result) => {
        setContactTable(result.data.contact_requests);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function handleDeleteContact(code) {
      requestsService.deleteContact(code).then((result) => {
        if (result) {
          updateData()
        }
    })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Contact</strong> <small> List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow >
                <CTableHeaderCell scope="col">No #</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                <CTableHeaderCell scope="col">IP Address</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {contactTable.map((contacts, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{contacts.id}</CTableHeaderCell>
                <CTableDataCell>{contacts.name}</CTableDataCell>
                <CTableDataCell>{contacts.email}</CTableDataCell>
                <CTableDataCell>{contacts.comments}</CTableDataCell>
                <CTableDataCell>{contacts.created_date_time}</CTableDataCell>
                <CTableDataCell>{contacts.created_ip}</CTableDataCell>
                <CTableDataCell>
                    <CButton
                      onClick={() => {
                        handleDeleteContact(contacts.id)
                      }}
                      color={'danger'}
                    >
                      Delete
                      <CIcon icon={cilTrash} className="me-2" />
                    </CButton>
                  </CTableDataCell>
              </CTableRow>
           ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default ContactList
