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
import { cilPencil, cilTrash, cilImage } from '@coreui/icons'
import eventsService from 'src/service/eventsService'
import { useNavigate } from 'react-router-dom'

const EventsList = () => {

    const [eventsTable, seteventsTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      eventsService.getAllEvents().then((result) => {
        seteventsTable(result.data.events);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function deleteEvent(code) {
      console.log(code)
      eventsService.deleteEvents(code).then((result) => {
        if (result) {
          updateData()
        }
    })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Events</strong> <small>Posts List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No #</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "10px"}}>Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Images</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {eventsTable.map((events, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{events.id}</CTableHeaderCell>
                <CTableDataCell>{events.title}</CTableDataCell>
                <CTableDataCell> <CButton 
                color="link"
                onClick={() => navigate("/events/post-Images-list/"+events.id)}>
                      <CIcon icon={cilImage} className="me-2" />
                      Image List
                    </CButton></CTableDataCell>                 <CTableDataCell>{events.created_date_time}</CTableDataCell>
                <CTableDataCell>{events.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                <CButton 
                    onClick={() => {
                      navigate("/events/edit-events/"+events.id)
                    }}
                    className="me-2"
                    color={'primary'}>
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteEvent(events.id)
                      }}
                      color={'danger'}
                    >
                       <CIcon icon={cilTrash} className="me-2" />
                      Delete
                      
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

export default EventsList
