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
  CTableDataCell,
  CTableHead,
  CButton,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { DocsCallout, DocsExample } from 'src/components'
import settingsService from 'src/service/settingsService'
import { useNavigate } from 'react-router-dom'

const SettingList = () => {

    const [settingsTable, setSettingsTable] = useState([])

    const navigate = useNavigate()

    function updateData() {
      settingsService.getAllSetting().then((result) => {
        console.log(result.data)
        setSettingsTable(result.data.settings);
      });
    }
  
    useEffect(() => {
      updateData();
    }, []);

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Setting</strong> <small>List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>No #</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Name</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Value</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Status</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "20%"}}>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
           {settingsTable.map((settings, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell scope="row">{settings.id}</CTableHeaderCell>
                <CTableDataCell>{settings.default_title}</CTableDataCell>
                <CTableDataCell>{settings.value}</CTableDataCell>
                <CTableDataCell>{settings.is_active == "1" ? "Active": "In Active"}</CTableDataCell>
                <CTableDataCell>
                    <CButton 
                    onClick={() => {
                      navigate("/settings/edit-setting/"+settings.id)
                    }}
                    color={'primary'}
                    className="me-2">
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
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

export default SettingList
