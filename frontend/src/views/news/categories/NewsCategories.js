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
import newsService from 'src/service/newsService'

const NewsCategories = () => {

    const [newsTable, setNewsTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      newsService.getAllNewsCategories().then((result) => {
        setNewsTable(result.data.categories);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function deleteCategory(code) {
      console.log(code)
      newsService.deleteNewsCategory(code).then((result) => {
        if (result) {
          updateData()
        }
      })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>News</strong> <small>Category List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Order No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Title</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Slug</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Status</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {newsTable.map((news, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{news.id}</CTableHeaderCell>
                <CTableDataCell>{news.title}</CTableDataCell>
                <CTableDataCell>{news.url_slug}</CTableDataCell>
                <CTableDataCell>{news.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                    <CButton 
                    onClick={() => {
                      navigate("/news/edit-categories/"+news.id)
                    }}
                    color={'primary'}
                    className="me-2">
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteCategory(news.id)
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

export default NewsCategories
