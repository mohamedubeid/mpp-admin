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
import lifestyleService from 'src/service/lifestyleService'
import { useNavigate } from 'react-router-dom'

const LifestyleList = () => {

    const [lifestyleTable, setLifestyleTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      lifestyleService.getAllLifestyle().then((result) => {
        setLifestyleTable(result.data.lifestyles);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function deleteLifestyle(code) {
      console.log(code)
      lifestyleService.deleteLifestyle(code).then((result) => {
        if (result) {
          updateData()
        }
    })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Lifestyles</strong> <small>List</small>
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
           {lifestyleTable.map((lifestyles, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{lifestyles.id}</CTableHeaderCell>
                <CTableDataCell>{lifestyles.title}</CTableDataCell>
                <CTableDataCell> <CButton 
                color="link"
                onClick={() => navigate("/lifestyle/post-images-list/"+lifestyles.id)}>
                      <CIcon icon={cilImage} className="me-2" />
                      Image List
                    </CButton></CTableDataCell>                  <CTableDataCell>{lifestyles.created_date_time}</CTableDataCell>
                <CTableDataCell>{lifestyles.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                <CButton 
                    onClick={() => {
                      navigate("/lifestyle/edit-lifestyle/"+lifestyles.id)
                    }}
                    color={'primary'}
                    className="me-2"
                    >
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteLifestyle(lifestyles.id)
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

export default LifestyleList
