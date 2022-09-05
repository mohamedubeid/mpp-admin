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
import celebritiesService from 'src/service/celebritiesService'
import Notification from 'src/components/Notification'

const CelebrityPosts = () => {
  const [celebrityTable, setCelebrityTable] = useState([])
  const [displayNtf, setDisplayNtf] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const queryParams = new URLSearchParams(
    window.location.hash.split('celebrities-list')[1].toString(),
  )
  const defaultPage = queryParams.get('page') || 1
  const defaultLang = queryParams.get('lang') || 'en'

  const [page, setPage] = useState(parseInt(defaultPage))
  const [NumOfPages, setNumOfPages] = useState(0)
  const [lang, setLang] = useState(defaultLang)
  const navigate = useNavigate()

  function updateData() {
    celebritiesService.getAllCelebritiesPosts(lang, page).then((result) => {
      setNumOfPages(result.data.pagesAvailable)
      setCelebrityTable(result.data.posts)
    })
  }

  useEffect(() => {
    updateData()
    navigate(`/celebrity/celebrities-list?lang=${lang}&page=${page}`)
  }, [page, lang])

  function deleteCelebrity(code) {
    console.log(code)
    celebritiesService.deleteCelebritiesPost(code).then((result) => {
      if (result) {
        updateData()
      }
    })
  }

  async function selectCelebrity(e, id) {
    const selected = e.target.checked
    celebritiesService
      .selectPost(id, { selected, lang })
      .then(() => {
        let temp = celebrityTable
        temp = temp.map((item) => {
          if (item.id === id) {
            item.is_selected = selected ? '1' : '0'
          }
          return item
        })
        setCelebrityTable(temp)
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
            <strong>Celebrity</strong> <small>Posts List</small>
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
                {celebrityTable.map((celebrity, i) => (
                  <CTableRow key={i}>
                    <CTableDataCell scope="row">
                      <CFormCheck
                        id="select"
                        scope="row"
                        style={{ margin: '10px 0px 0px 10px' }}
                        onChange={(e) => selectCelebrity(e, celebrity.id)}
                        checked={celebrity.is_selected === '1'}
                      />
                    </CTableDataCell>
                    <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                    <CTableDataCell>{celebrity.title}</CTableDataCell>
                    <CTableDataCell>
                      {' '}
                      <CButton
                        color="link"
                        onClick={() => navigate('/celebrity/post-images-list/' + celebrity.id)}
                      >
                        <CIcon icon={cilImage} className="me-2" />
                        Image List
                      </CButton>
                    </CTableDataCell>{' '}
                    <CTableDataCell>{celebrity.created_date_time}</CTableDataCell>
                    <CTableDataCell>
                      {celebrity.is_active == '1' ? 'Active' : 'In Active'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        onClick={() => {
                          navigate('/celebrity/edit-celebrities/' + celebrity.id)
                        }}
                        color={'primary'}
                        className="me-2"
                      >
                        <CIcon icon={cilPencil} className="me-2" />
                        Edit
                      </CButton>
                      <CButton
                        onClick={() => {
                          deleteCelebrity(celebrity.id)
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

export default CelebrityPosts
