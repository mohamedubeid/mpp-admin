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
import magazinesService from 'src/service/magazinesService'

const MagazineList = () => {

    const [magazineTable, setMagazineTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      magazinesService.getAllMagazines().then((result) => {
        setMagazineTable(result.data.magazines);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function handleDeleteMagazine(code) {
      console.log(code)
      magazinesService.deleteMagazines(code).then((result) => {
        if (result) {
          updateData()
        }
    })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Magazine</strong> <small> List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No #</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="me-2">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Images</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {magazineTable.map((magazine, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{magazine.id}</CTableHeaderCell>
                <CTableDataCell>{magazine.title}</CTableDataCell>
                <CTableDataCell> <CButton 
                color="link"
                onClick={() => navigate("/magazine/post-images-list/"+magazine.id)}>
                      <CIcon icon={cilImage} className="me-2" />
                      Image List
                    </CButton></CTableDataCell>                  <CTableDataCell>{magazine.created_date_time}</CTableDataCell>
                <CTableDataCell>{magazine.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                <CButton 
                    onClick={() => {
                      navigate("/magazine/edit-magazine/"+magazine.id)
                    }}
                    color={'primary'}
                    className="me-2">
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        handleDeleteMagazine(magazine.id)
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

export default MagazineList
