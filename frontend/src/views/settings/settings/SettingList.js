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
  CFormCheck,
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
    const [lang, setLang] = useState(1)
    

    const navigate = useNavigate()

    function updateData() {
      settingsService.getAllSetting(lang).then((result) => {
        console.log(result.data)
        setSettingsTable(result.data.settings);
      });
    }
  
    useEffect(() => {
      updateData();
    }, [lang]);

  return (
    <>
     <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-1 pt-0">Language:</legend>
        <CCol sm={10}>
          <CFormCheck
            type="radio"
            label="English"
            name="lang"
            defaultChecked
            onClick={() => setLang(1)}
            onChange={() => console.log('')}
          />
          <CFormCheck
            type="radio"
            label="Arabic"
            name="lang"
            onClick={() => setLang(2)}
            onChange={() => console.log('')}
          />
        </CCol>
      </fieldset>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Setting</strong> <small>List</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={{width: "15%"}}>No #</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "15%"}}>Name</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "15%"}}>Value</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width: "15%"}}>Status</CTableHeaderCell>
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
                      if(lang === 2){
                      navigate("/settings/edit-setting/"+settings.id+"?lang=ar")
                      } else {
                      navigate("/settings/edit-setting/"+settings.id)
                      }
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
    </>
  )
}

export default SettingList
