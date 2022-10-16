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
  CFormCheck,
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
    const [lang, setLang] = useState(1)


    const navigate = useNavigate()

    function updateData() {
      newsService.getAllNewsCategories(lang).then((result) => {
        setNewsTable(result.data.categories);
      });
    }
  
    useEffect(() => {
      updateData();
    }, [lang]);

    function deleteCategory(code) {
      console.log(code)
      newsService.deleteNewsCategory(code).then((result) => {
        if (result) {
          updateData()
        }
      })
    }

  return (
    <>
     <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-1 pt-0">Language:</legend>
        <CCol sm={10}>
          <CFormCheck
            type="radio"
            label="English"
            onClick={() => setLang(1)}
            checked={lang === 1}
            onChange={() => console.log('')}
          />
          <CFormCheck
            type="radio"
            label="Arabic"
            onClick={() => setLang(2)}
            checked={lang === 2}
            onChange={() => console.log('')}
          />
        </CCol>
      </fieldset>
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
                      if(lang === 2){
                      navigate("/news/edit-categories/"+news.id+"?lang=ar")
                        } else {
                      navigate("/news/edit-categories/"+news.id)
                        }
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
    </>
  )
}

export default NewsCategories
