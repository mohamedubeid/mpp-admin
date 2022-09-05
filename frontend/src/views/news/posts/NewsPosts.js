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
import newsService from 'src/service/newsService'

const NewsPosts = () => {

    const [newsTable, setNewsTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      newsService.getAllNewsPosts().then((result) => {
        setNewsTable(result.data.posts);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function deleteNewsPost(code) {
      console.log(code)
      newsService.deleteNewsPost(code).then((result) => {
        if (result) {
          updateData()
        }
    })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>News</strong> <small>Posts List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No #</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Image List</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {newsTable.map((news, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{news.id}</CTableHeaderCell>
                <CTableDataCell>{news.title}</CTableDataCell>
                <CTableDataCell>{news.created_date_time}</CTableDataCell>
                <CTableDataCell> <CButton 
                color="link"
                onClick={() => navigate("/news/post-Images-list/"+news.id)}>
                      <CIcon icon={cilImage} className="me-2" />
                      Image List
                    </CButton></CTableDataCell>
                <CTableDataCell>{news.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                <CButton 
                    onClick={() => {
                      navigate("/news/edit-news/"+news.id)
                    }}
                    color={'primary'}
                    className="me-2">
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteNewsPost(news.id)
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

export default NewsPosts
