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
import { useNavigate } from 'react-router-dom'
import celebritiesService from 'src/service/celebritiesService'

const CelebrityPosts = () => {

    const [celebrityTable, setCelebrityTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      celebritiesService.getAllCelebritiesPosts().then((result) => {
        setCelebrityTable(result.data.posts);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function deleteCelebrity(code) {
      console.log(code)
      celebritiesService.deleteCelebritiesPost(code).then((result) => {
        if (result) {
          updateData()
        }
    })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Celebrity</strong> <small>Posts List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No #</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Images</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {celebrityTable.map((celebrity, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{celebrity.id}</CTableHeaderCell>
                <CTableDataCell>{celebrity.title}</CTableDataCell>
                <CTableDataCell> <CButton 
                color="link"
                onClick={() => navigate("/celebrity/post-images-list/"+celebrity.id)}>
                      <CIcon icon={cilImage} className="me-2" />
                      Image List
                    </CButton></CTableDataCell>                 <CTableDataCell>{celebrity.created_date_time}</CTableDataCell>
                <CTableDataCell>{celebrity.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                <CButton 
                    onClick={() => {
                      navigate("/celebrity/edit-celebrities/"+celebrity.id)
                    }}
                    color={'primary'}
                    className="me-2"
                    >
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteCelebrity(celebrity.id)
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

export default CelebrityPosts
