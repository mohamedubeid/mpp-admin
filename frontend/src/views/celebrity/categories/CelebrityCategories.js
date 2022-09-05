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
import celebritiesService from 'src/service/celebritiesService'

const CelebrityCategories = () => {

    const [celebritiesTable, setCelebritiesTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      celebritiesService.getAllCelebritiesCategories().then((result) => {
        setCelebritiesTable(result.data.categories);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function deleteCategory(code) {
      console.log(code)
      celebritiesService.deleteCategory(code).then((result) => {
        if (result) {
          updateData()
        }
      })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Celebrities</strong> <small>Category List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Order No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Slug</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sub Categories</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {celebritiesTable.map((celebrity, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{celebrity.id}</CTableHeaderCell>
                <CTableDataCell>{celebrity.title}</CTableDataCell>
                <CTableDataCell>{celebrity.url_slug}</CTableDataCell>
                <CTableDataCell></CTableDataCell>
                <CTableDataCell>{celebrity.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                    <CButton 
                    onClick={() => {
                      navigate("/celebrity/edit-categories/"+celebrity.id)
                    }}
                    color={'primary'}
                    className="me-2">
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteCategory(celebrity.id)
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

export default CelebrityCategories
