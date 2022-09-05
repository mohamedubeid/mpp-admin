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
import photoshootService from 'src/service/photoshootService'

const PhotoshootList = () => {

    const [photoshootTable, setPhotoshootTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      photoshootService.getAllPhotoshoots().then((result) => {
        setPhotoshootTable(result.data.photoshoots);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function handleDeletePhotoshoot(code) {
      console.log(code)
      photoshootService.deletePhotoshoots(code).then((result) => {
        if (result) {
          updateData()
        }
    })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Photoshoot</strong> <small> List</small>
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
           {photoshootTable.map((photoshoot, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{photoshoot.id}</CTableHeaderCell>
                <CTableDataCell>{photoshoot.title}</CTableDataCell>
                <CTableDataCell> <CButton 
                color="link"
                onClick={() => navigate("/photoshoot/post-images-list/"+photoshoot.id)}>
                      <CIcon icon={cilImage} className="me-2" />
                      Image List
                    </CButton></CTableDataCell>                  <CTableDataCell>{photoshoot.created_date_time}</CTableDataCell>
                <CTableDataCell>{photoshoot.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                <CButton 
                    onClick={() => {
                      navigate("/photoshoot/edit-photoshoot/"+photoshoot.id)
                    }}
                    color={'primary'}
                    className="me-2">
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        handleDeletePhotoshoot(photoshoot.id)
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

export default PhotoshootList
