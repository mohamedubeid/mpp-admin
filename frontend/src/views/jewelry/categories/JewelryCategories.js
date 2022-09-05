import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
CTable,
  CButton,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { DocsCallout, DocsExample } from 'src/components'
import jewelryService from 'src/service/jewelryService'

const JewelryCategories = () => {

    const [jewelryTable, setJewelryTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      jewelryService.getAllJewelryCategories().then((result) => {
        setJewelryTable(result.data.categories);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function deleteCategory(code) {
      console.log(code)
      jewelryService.deleteJewelryCategory(code).then((result) => {
        if (result) {
          updateData()
        }
      })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Jewelry</strong> <small>Category List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Order No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Slug</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {jewelryTable.map((jewelry, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{jewelry.id}</CTableHeaderCell>
                <CTableDataCell>{jewelry.title}</CTableDataCell>
                <CTableDataCell>{jewelry.url_slug}</CTableDataCell>
                <CTableDataCell>{jewelry.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                    <CButton 
                    onClick={() => {
                      navigate("/jewelry/edit-categories/"+jewelry.id)
                    }}
                    className="me-2"
                    color={'primary'}>
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteCategory(jewelry.id)
                      }}
                      color={"danger"}
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

export default JewelryCategories
