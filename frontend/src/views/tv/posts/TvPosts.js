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
import tvService from 'src/service/tvService'

const TvPosts = () => {

    const [tvVideosTable, setTvVideosTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      tvService.getAllTvVideos().then((result) => {
        setTvVideosTable(result.data.videos);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function deleteVideo(code) {
      console.log(code)
      tvService.deleteTvPost(code).then((result) => {
        if (result) {
          updateData()
        }
    })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>TV</strong> <small>Videos List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No #</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {tvVideosTable.map((tv, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{tv.id}</CTableHeaderCell>
                <CTableDataCell>{tv.title}</CTableDataCell>
                <CTableDataCell>{tv.created_date_time}</CTableDataCell>
                <CTableDataCell>{tv.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                <CButton 
                    onClick={() => {
                      navigate("/tv/edit-videos/"+tv.id)
                    }}
                    color={'primary'}
                    className="me-2">
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteVideo(tv.id)
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

export default TvPosts
