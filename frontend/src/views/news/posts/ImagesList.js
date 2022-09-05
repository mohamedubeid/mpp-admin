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
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'
import { useNavigate, useParams } from 'react-router-dom'
import newsService from 'src/service/newsService'

const ImagesList = () => {
  const [imagesTable, setImagesTable] = useState([])

  const params = useParams()
  const navigate = useNavigate()

  function updateData() {
    newsService.getNewsImagesList(params.id).then((result) => {
      console.log(result.data.images)
      setImagesTable(result.data.images)
    })
  }

  useEffect(() => {
    updateData()
  }, [])

  function deleteImage(code) {
    console.log(code)
    newsService.deleteImage(code).then((result) => {
      if (result) {
        updateData()
      }
    })
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Image</strong> <small>Posts List</small>
          <br></br>
          <br></br>
          <CButton
            onClick={() => navigate("/news/post-images-add/"+params.id)}
            color={'primary'}
          >
          <CIcon icon={cilPlus} className="me-2" />
            Add Image
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No #</CTableHeaderCell>
                <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                <CTableHeaderCell scope="col">Image Caption</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {imagesTable.map((image, i) => (
                <CTableRow key={i}>
                  <CTableHeaderCell scope="row">{image.id}</CTableHeaderCell>
                  <CTableDataCell>{image.classified_image}</CTableDataCell>
                  <CTableDataCell>{image.caption}</CTableDataCell>
                  <CTableDataCell>{image.is_active}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        deleteImage(image.id)
                      }}
                      color={'danger'}
                    >
                      Delete
                      <CIcon icon={cilTrash} className="me-2" />
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

export default ImagesList
