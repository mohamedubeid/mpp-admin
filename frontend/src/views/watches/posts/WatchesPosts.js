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
import watchesService from 'src/service/watchesService'
import { useNavigate } from 'react-router-dom'

const WatchesPosts = () => {
  const [watchesTable, setWatchesTable] = useState([])

  const navigate = useNavigate()

  function updateData() {
    watchesService.getAllWatchPosts().then((result) => {
      setWatchesTable(result.data.posts)
    })
  }

  useEffect(() => {
    updateData()
  }, [])

  function deleteWatch(code) {
    console.log(code)
    watchesService.deleteWatchPost(code).then((result) => {
      if (result) {
        updateData()
      }
    })
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Watches</strong> <small>Posts List</small>
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
              {watchesTable.map((watches, i) => (
                <CTableRow key={i}>
                  <CTableHeaderCell scope="row">{watches.id}</CTableHeaderCell>
                  <CTableDataCell>{watches.title}</CTableDataCell>
                  <CTableDataCell>
                    {' '}
                    <CButton
                      color="link"
                      onClick={() => navigate('/watches/post-images-list/' + watches.id)}
                    >
                      <CIcon icon={cilImage} className="me-2" />
                      Image List
                    </CButton>
                  </CTableDataCell>{' '}
                  <CTableDataCell>{watches.created_date_time}</CTableDataCell>
                  <CTableDataCell>
                    {watches.is_active == '1' ? 'Active' : 'In Active'}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        navigate('/watches/edit-posts/' + watches.id)
                      }}
                      className="me-2"
                      color={'primary'}
                    >
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        deleteWatch(watches.id)
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

export default WatchesPosts
