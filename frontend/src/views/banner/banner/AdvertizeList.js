import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CImage,
  CTableHeaderCell,
  CTableRow,
  CFormCheck,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import bannersService from 'src/service/bannersService'
import Notification from 'src/components/Notification'

const AdvertizeList = () => {
  const [advertizeTable, setAdvertizeTable] = useState([])
  const [displayNtf, setDisplayNtf] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const queryParams = new URLSearchParams(window.location.hash.split('dvertize-list')[1].toString())
  const defaultPage = queryParams.get('page') || 1
  const defaultLang = queryParams.get('lang') || 'en'
  const [page, setPage] = useState(parseInt(defaultPage))
  const [NumOfPages, setNumOfPages] = useState(0)
  const [lang, setLang] = useState(defaultLang)
  const [selectedAdvertize, setSelectedAdvertize] = useState([])
  const language_id = lang === 'ar' ? 2 : 1
  const navigate = useNavigate()

  function updateData() {
    bannersService.getAllBanners(lang, page).then((result) => {
      setNumOfPages(result.data.pagesAvailable)
      setAdvertizeTable(result.data.banners)
    })
    bannersService.getSelectedBanners(language_id).then((result) => {
      setSelectedAdvertize(result.data.selectedPosts)
    })
  }

  useEffect(() => {
    updateData()
    navigate(`/banners/advertize-list?lang=${lang}&page=${page}`)
  }, [page, lang])

  function deleteBanner(code) {
    console.log(code)
    bannersService.deleteBanners(code).then((result) => {
      if (result) {
        updateData()
      }
    })
  }

  const handleSelectAdvertize = (e, post) => {
    const selected = e.target.checked
    if (selected && selectedAdvertize.length < 1) {
      setSelectedAdvertize([...selectedAdvertize, post])
      let temp = advertizeTable
      temp = temp.map((item) => {
        if (item.id === post.id) {
          item.is_selected = '1'
        }
        return item
      })
      setAdvertizeTable(temp)
    } else if (!selected) {
      let temp2 = selectedAdvertize
      temp2 = temp2.filter((item) => item.id !== post.id)
      setSelectedAdvertize(temp2)
      let temp3 = advertizeTable
      temp3 = temp3.map((item) => {
        if (item.id === post.id) {
          item.is_selected = '0'
        }
        return item
      })
      setAdvertizeTable(temp3)
    } else {
      setErrMsg('You are selected the maximum number of Advertize posts')
      setDisplayNtf(true)
      const myInterval = setInterval(() => {
        setDisplayNtf(false)
        clearInterval(myInterval)
      }, 3000)
    }
  }

  const handleConfirmSelected = () => {
    bannersService.selectBanners(language_id, { selectedAdvertize }).then((result) => {
      setErrMsg(result.data.msg)
      setDisplayNtf(true)
      const myInterval = setInterval(() => {
        setDisplayNtf(false)
        clearInterval(myInterval)
      }, 3000)
    })
  }

  const handleCancelSelected = () => {
    bannersService.ClearSelectedBanners(language_id).then((result) => {
      setSelectedAdvertize([])
      let temp3 = advertizeTable
      temp3 = temp3.map((item) => {
        item.is_selected = '0'
        return item
      })
      setAdvertizeTable(temp3)
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
            <strong>Advertize</strong> <small>Page List</small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Select</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Order No</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '20%' }}>
                    Name
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ width: '10%' }}>Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {advertizeTable.map((ad, i) => (
                  <CTableRow key={i}>
                    <CTableDataCell scope="row">
                      <CFormCheck
                        id="select"
                        scope="row"
                        style={{ margin: '10px 0px 0px 10px' }}
                        onChange={(e) => handleSelectAdvertize(e, ad)}
                        checked={ad.is_selected === '1'}
                      />
                    </CTableDataCell>
                    <CTableHeaderCell scope="row">{i + (page - 1) * 50 + 1}</CTableHeaderCell>
                    <CTableDataCell>{ad.title}</CTableDataCell>
                    <CTableDataCell style={{columnWidth: "200px"}}>{ad.image_path}</CTableDataCell>
                    <CTableDataCell>{ad.advertize_type}</CTableDataCell>
                    <CTableDataCell>{ad.is_active == '1' ? 'Active' : 'In Active'}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        onClick={() => {
                          if(lang === 'ar'){
                            navigate('/banners/edit-advertize/' + ad.id+"?lang=ar")
                            } else {
                              navigate('/banners/edit-advertize/' + ad.id)

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
                          deleteBanner(ad.id)
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

export default AdvertizeList
