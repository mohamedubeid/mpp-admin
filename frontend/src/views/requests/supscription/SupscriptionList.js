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

const SupscriptionList = () => {

    const [supscriptionTable, setSupscriptionTable] = useState([])

    function updateData() {
      requestsService.getAllNewsletters().then((result) => {
        setSupscriptionTable(result.data.subscribers);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function handleDeleteSupscription(code) {
      requestsService.deleteNewsletter(code).then((result) => {
        if (result) {
          updateData()
        }
    })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>newsletter</strong> <small> List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No #</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Company Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">City</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                <CTableHeaderCell scope="col">IP Address</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {supscriptionTable.map((newsletter, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{newsletter.id}</CTableHeaderCell>
                <CTableDataCell>{newsletter.fname}</CTableDataCell>
                <CTableDataCell>{newsletter.email}</CTableDataCell>
                <CTableDataCell>{newsletter.company_name}</CTableDataCell>
                <CTableDataCell>{newsletter.city}</CTableDataCell>
                <CTableDataCell>{newsletter.country_name}</CTableDataCell>
                <CTableDataCell>{newsletter.created_date_time}</CTableDataCell>
                <CTableDataCell>{newsletter.created_ip}</CTableDataCell>
                <CTableDataCell>
                    <CButton
                      onClick={() => {
                        handleDeleteSupscription(newsletter.id)
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

export default SupscriptionList
