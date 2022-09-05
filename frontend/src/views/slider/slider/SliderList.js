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
import { cilPencil, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import slidersService from 'src/service/sliderService'

const SliderList = () => {

    const [sliderTable, setSliderTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      slidersService.getAllSliders().then((result) => {
        setSliderTable(result.data.sliders);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

    function handleDeleteSlider(code) {
      console.log(code)
      slidersService.deleteSliders(code).then((result) => {
        if (result) {
          updateData()
        }
    })
    }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Slider</strong> <small> List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No #</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {sliderTable.map((slider, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{slider.id}</CTableHeaderCell>
                <CTableDataCell>{slider.title}</CTableDataCell>
                <CTableDataCell>{slider.created_date_time}</CTableDataCell>
                <CTableDataCell>{slider.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                <CButton 
                    onClick={() => {
                      navigate("/slider/edit-slider/"+slider.id)
                    }}
                    color={'primary'}
                    className="me-2">
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                    <CButton
                      onClick={() => {
                        handleDeleteSlider(slider.id)
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

export default SliderList
