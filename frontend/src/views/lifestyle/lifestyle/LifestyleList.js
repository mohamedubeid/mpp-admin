import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormCheck,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilImage } from '@coreui/icons'
import lifestyleService from 'src/service/lifestyleService'
import { useNavigate } from 'react-router-dom'
import Notification from 'src/components/Notification'

const LifestyleList = () => {
  const [lifestyleTable, setLifestyleTable] = useState([])
  const [displayNtf, setDisplayNtf] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const queryParams = new URLSearchParams(
    window.location.hash.split('lifestyle-list')[1].toString(),
  )
  const defaultPage = queryParams.get('page') || 1
  const defaultLang = queryParams.get('lang') || 'en'
  const [page, setPage] = useState(parseInt(defaultPage))
  const [NumOfPages, setNumOfPages] = useState(0)
  const [lang, setLang] = useState(defaultLang)
  const [selectedLifestyle, setSelectedLifestyle] = useState([])
  const language_id = lang === 'ar' ? 2 : 1
  const navigate = useNavigate()

  function updateData() {
    lifestyleService.getAllLifestyle(lang, page).then((result) => {
      setNumOfPages(result.data.pagesAvailable)
      setLifestyleTable(result.data.lifestyles)
    })
    lifestyleService.getSelectedLifestyle(language_id).then((result) => {
      setSelectedLifestyle(result.data.selectedPosts)
    })
  }

  useEffect(() => {
    updateData()
    navigate(`/lifestyle/lifestyle-list?lang=${lang}&page=${page}`)
  }, [page, lang])

  function deleteLifestyle(code) {
    console.log(code)
    lifestyleService.deleteLifestyle(code).then((result) => {
      if (result) {
        updateData()
      }
    })
  }

  const handleSelectLifestyle = (e, post) => {
    const selected = e.target.checked
    if (selected && selectedLifestyle.length < 4) {
      setSelectedLifestyle([...selectedLifestyle, post])
      let temp = lifestyleTable
      temp = temp.map((item) => {
        if (item.id === post.id) {
          item.is_selected = '1'
        }
        return item
      })
      setLifestyleTable(temp)
    } else if (!selected) {
      let temp2 = selectedLifestyle
      temp2 = temp2.filter((item) => item.id !== post.id)
      setSelectedLifestyle(temp2)
      let temp3 = lifestyleTable
      temp3 = temp3.map((item) => {
        if (item.id === post.id) {
          item.is_selected = '0'
        }
        return item
      })
      setLifestyleTable(temp3)
    } else {
      setErrMsg('You are selected the maximum number of Life Style posts')
      setDisplayNtf(true)
      const myInterval = setInterval(() => {
        setDisplayNtf(false)
        clearInterval(myInterval)
      }, 3000)
    }
  }

  const handleConfirmSelected = () => {
    lifestyleService.selectLifestyle(language_id, { selectedLifestyle }).then((result) => {
      setErrMsg(result.data.msg)
      setDisplayNtf(true)
      const myInterval = setInterval(() => {
        setDisplayNtf(false)
        clearInterval(myInterval)
      }, 3000)
    })
  }

  const handleCancelSelected = () => {
    lifestyleService.ClearSelectedLifestyle(language_id).then((result) => {
      setSelectedLifestyle([])
      let temp3 = lifestyleTable
      temp3 = temp3.map((item) => {
        item.is_selected = '0'
        return item
      })
      setLifestyleTable(temp3)
      setErrMsg(result.data.msg)
      setDisplayNtf(true)
      const myInterval = setInterval(() => {
        setDisplayNtf(false)
        clearInterval(myInterval)
      }, 3000)
    })
  }

  const handlePaginationItemClick = (pageNum) => {
    setPage(parseInt(pageNum))
    window.scrollTo(0, 0)
  }

  let Items = []
  for (let i = 1; i < NumOfPages + 1; i++) {
    Items[i - 1] = (
      <CPaginationItem
        key={i}
        style={{ cursor: 'pointer' }}
        onClick={() => handlePaginationItemClick(i)}
        active={parseInt(page) === i}
      >
        {i}
      </CPaginationItem>
    )
  }

  return (
    <>
      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-1 pt-0">Language:</legend>
        <CCol sm={10}>
          <CFormCheck
            type="radio"
            label="English"
            onClick={() => setLang('en')}
            checked={lang === 'en'}
            onChange={() => console.log('')}
          />
          <CFormCheck
            type="radio"
            label="Arabic"
            onClick={() => setLang('ar')}
            checked={lang === 'ar'}
            onChange={() => console.log('')}
          />
          <CButton
            className="col-form-label col-sm-2 mt-2 mb-2"
            color="primary"
            onClick={handleConfirmSelected}
          >
            Confirm Selected
          </CButton>
          {'  '}
          <CButton
            className="col-form-label col-sm-2 mt-2 mb-2"
            color="danger"
            onClick={handleCancelSelected}
          >
            Cancel Selected
          </CButton>
        </CCol>
      </fieldset>
      {displayNtf && <Notification msg={errMsg} />}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lifestyles</strong> <small>List</small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Select</CTableHeaderCell>
                  <CTableHeaderCell scope="col">No #</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '20%' }}>
                    Title
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Images</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {lifestyleTable.map((lifestyles, i) => (
                  <CTableRow key={i}>
                    <CTableDataCell scope="row">
                      <CFormCheck
                        id="select"
                        scope="row"
                        style={{ margin: '10px 0px 0px 10px' }}
                        onChange={(e) => handleSelectLifestyle(e, lifestyles)}
                        checked={lifestyles.is_selected === '1'}
                      />
                    </CTableDataCell>
                    <CTableHeaderCell scope="row">{i + (page - 1) * 50 + 1}</CTableHeaderCell>
                    <CTableDataCell>{lifestyles.title}</CTableDataCell>
                    <CTableDataCell>
                      {' '}
                      <CButton
                        color="link"
                        onClick={() => navigate('/lifestyle/post-images-list/' + lifestyles.id)}
                      >
                        <CIcon icon={cilImage} className="me-2" />
                        Image List
                      </CButton>
                    </CTableDataCell>{' '}
                    <CTableDataCell>{lifestyles.created_date_time}</CTableDataCell>
                    <CTableDataCell>
                      {lifestyles.is_active == '1' ? 'Active' : 'In Active'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        onClick={() => {
                          navigate('/lifestyle/edit-lifestyle/' + lifestyles.id)
                        }}
                        color={'primary'}
                        className="me-2"
                      >
                        <CIcon icon={cilPencil} className="me-2" />
                        Edit
                      </CButton>
                      <CButton
                        onClick={() => {
                          deleteLifestyle(lifestyles.id)
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
      <CPagination align="center" size="sm">
        <CPaginationItem
          aria-label="Previous"
          disabled={parseInt(page) === 1}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setPage(parseInt(page) - 1)
            window.scrollTo(0, 0)
          }}
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {Items}
        <CPaginationItem
          style={{ cursor: 'pointer' }}
          disabled={parseInt(page) === NumOfPages}
          onClick={() => {
            setPage(parseInt(page) + 1)
            window.scrollTo(0, 0)
          }}
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </>
  )
}

export default LifestyleList
