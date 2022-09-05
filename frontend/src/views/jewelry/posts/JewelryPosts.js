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
  CFormCheck,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilImage } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import jewelryService from 'src/service/jewelryService'
import Notification from 'src/components/Notification'

const JewelryPosts = () => {
  const [jewelryTable, setJewelryTable] = useState([])
  const [displayNtf, setDisplayNtf] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const queryParams = new URLSearchParams(window.location.hash.split('posts')[1].toString())
  const defaultPage = queryParams.get('page') || 1
  const defaultLang = queryParams.get('lang') || 'en'
  const [page, setPage] = useState(parseInt(defaultPage))
  const [NumOfPages, setNumOfPages] = useState(0)
  const [lang, setLang] = useState(defaultLang)
  const navigate = useNavigate()

  function updateData() {
    jewelryService.getAllJewelryPosts(lang, page).then((result) => {
      setNumOfPages(result.data.pagesAvailable)
      setJewelryTable(result.data.posts)
    })
  }

  useEffect(() => {
    updateData()
    navigate(`/jewelry/posts?lang=${lang}&page=${page}`)
  }, [page, lang])

  function deleteJewelry(code) {
    console.log(code)
    jewelryService.deleteJewelryPost(code).then((result) => {
      if (result) {
        updateData()
      }
    })
  }

  async function selectJewelry(e, id) {
    const selected = e.target.checked
    jewelryService
      .selectPost(id, { selected, lang })
      .then(() => {
        let temp = jewelryTable
        temp = temp.map((item) => {
          if (item.id === id) {
            item.is_selected = selected ? '1' : '0'
          }
          return item
        })
        setJewelryTable(temp)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrMsg(error.response.data.msg)
          setDisplayNtf(true)
          const myInterval = setInterval(() => {
            setDisplayNtf(false)
            clearInterval(myInterval)
          }, 2500)
        }
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
      <div>
        <CFormCheck
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          label="English"
          defaultChecked
          onClick={() => setLang('en')}
          checked={lang === 'en'}
        />
        <CFormCheck
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          label="Arabic"
          onClick={() => setLang('ar')}
          checked={lang === 'ar'}
        />
      </div>
      {displayNtf && <Notification msg={errMsg} />}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Jewelry</strong> <small>Posts List</small>
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
                {jewelryTable.map((jewelry, i) => (
                  <CTableRow key={i}>
                    <CTableDataCell scope="row">
                      <CFormCheck
                        id="select"
                        scope="row"
                        style={{ margin: '10px 0px 0px 10px' }}
                        onChange={(e) => selectJewelry(e, jewelry.id)}
                        checked={jewelry.is_selected === '1'}
                      />
                    </CTableDataCell>
                    <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                    <CTableDataCell>{jewelry.title}</CTableDataCell>
                    <CTableDataCell>
                      {' '}
                      <CButton
                        color="link"
                        onClick={() => navigate('/jewelry/post-images-list/' + jewelry.id)}
                      >
                        <CIcon icon={cilImage} className="me-2" />
                        Image List
                      </CButton>
                    </CTableDataCell>{' '}
                    <CTableDataCell>{jewelry.created_date_time}</CTableDataCell>
                    <CTableDataCell>
                      {jewelry.is_active == '1' ? 'Active' : 'In Active'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        onClick={() => {
                          navigate('/jewelry/edit-posts/' + jewelry.id)
                        }}
                        className="me-2"
                        color={'primary'}
                      >
                        <CIcon icon={cilPencil} className="me-2" />
                        Edit
                      </CButton>
                      <CButton
                        onClick={() => {
                          deleteJewelry(jewelry.id)
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

export default JewelryPosts
