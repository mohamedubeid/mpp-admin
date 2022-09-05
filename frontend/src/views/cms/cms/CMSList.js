import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCol,
  CRow,
  CTable,
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
import cmsService from 'src/service/cmsService'

const CMSList = () => {
  const [CMSTable, setCMSTable] = useState([])

  const navigate = useNavigate()

  function updateData() {
    cmsService.getAllCMS().then((result) => {
      setCMSTable(result.data.cmspages)
    })
  }

  useEffect(() => {
    updateData()
  }, [])

  function deleteCMS(code) {
    console.log(code)
    cmsService.deleteCMS(code).then((result) => {
      if (result) {
        updateData()
      }
    })
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>CMS</strong> <small>Page List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Order No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Slug</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sub CMS Page</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {CMSTable.map((cms, i) => (
                <CTableRow key={i}>
                  <CTableHeaderCell scope="row">{cms.id}</CTableHeaderCell>
                  <CTableDataCell>{cms.title}</CTableDataCell>
                  <CTableDataCell>{cms.cms_slug}</CTableDataCell>
                  <CTableDataCell> </CTableDataCell>
                  <CTableDataCell>{cms.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                  <CTableDataCell>
                    <CButton 
                    onClick={() => {
                      navigate("/cms/edit-cms/"+cms.id)
                    }}
                    className="me-2"
                    color={'primary'}>
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteCMS(cms.id)
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

export default CMSList
