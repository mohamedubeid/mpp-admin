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
import watchesService from 'src/service/watchesService'

const WatchesCategories = () => {
  const [watchesTable, setWatchesTable] = useState([])
  const [lang, setLang] = useState(1)


  const navigate = useNavigate()

  function updateData() {
    watchesService.getAllWatchCategories(lang).then((result) => {
      setWatchesTable(result.data.categories)
    })
  }

  useEffect(() => {
    updateData()
  }, [lang])

  function deleteCategory(code) {
    console.log(code)
    watchesService.deleteWatchCategory(code).then((result) => {
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
          <strong>Watches</strong> <small>Category List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Order No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ width: '20%' }}>
                  Title
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Slug</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {watchesTable.map((watches, i) => (
                <CTableRow key={i}>
                  <CTableHeaderCell scope="row">{watches.id}</CTableHeaderCell>
                  <CTableDataCell>{watches.title}</CTableDataCell>
                  <CTableDataCell>{watches.url_slug}</CTableDataCell>
                  <CTableDataCell>
                    {watches.is_active == '1' ? 'Active' : 'In Active'}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        if(lang === 2){
                          navigate('/watches/edit-categories/' + watches.id+"?lang=ar")
                          } else {
                            navigate('/watches/edit-categories/' + watches.id)
                          }
                
                      }}
                      className="me-2"
                      color={'primary'}
                    >
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteCategory(watches.id)
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
    </>
  )
}

export default WatchesCategories
