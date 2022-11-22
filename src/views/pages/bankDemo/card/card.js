import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTable,
  CRow,
  CFormSelect,
  CFormFeedback,
  CFormCheck,
} from '@coreui/react'

import { useSelector, useDispatch } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'

// actions
import {
  getAllCustomer,
  getCardSecondaryBankSearch,
  getCardPrimaryBankSearch,
} from 'src/views/bankDemo/redux/action'
import { getBankSuscriberData } from '../../../../actions/suscriberData'

import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import {
  suscriberData,
  chooseAPIType,
  suscriberDataBankCustomer,
} from '../../configSearch/configSearch'
import '../index.css'
import usePagination from 'src/views/customHook/paginationHook'

const initialState = {
  card_num: '',
  cust_id: '',
  subs: '',
  choose_api: 'ai',
  subs_name: '',
}
// const customerInitialState = {
//   cust_ac_no: '',
//   subs: '1',
//   choose_api: 'ai',
// }

const headerNameList = [
  {
    card_num: 'Card Number',
    card_type: 'Card Type',
    card_limit: 'Limit',
    card_is_pri: 'Primary Card',
    card_network: 'Network',
    crd_issd_dt: 'Issue Date',
    card_exp_dt: 'Expiry Date',
    card_sts: 'Status',
    acc_num: 'Account number',
    // rel_mang_nm: 'Relationship Manager Name',
    // rel_mang_em: 'Relationship Manager Email',
    // rel_mang_ph: 'Relationship Manager PhoneNo',
  },
  {
    cust_id: 'Customer ID',
    crd_curr_bal: 'Balance',
  },
]

const headNameList = [
  {
    des_name: 'Customer Card Details',
  },
  {
    des_name: 'Customer Details',
  },
]

export default function Card() {
  const [formData, setFormData] = useState(initialState)
  const [validated, setValidated] = useState(false)
  const [secondoryToggle, setSecondoryToggle] = useState(false)

  // const [formCustomerData, setCustomerFormData] = useState(customerInitialState)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const cardR = useSelector((state) => state.cardBank)
  const { cardData, statusMessage } = cardR
  const susBankData = useSelector((state) => state.susciberData)
  const { suscriberBankData } = susBankData
  const [page, setPage] = useState(1)
  let perPage = 7
  let sampleArray = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]
  // console.log(suscriberData, 'suscriberData')

  let secondSearch = []
  const _data = usePagination(secondSearch, perPage, page)

  let [cardValue, setCardValue] = useState([])

  cardData.map((vv, ii) => {
    secondSearch.push(vv.card_num)
  })
  React.useEffect(() => {
    dispatch(getBankSuscriberData())
    if (suscriberBankData.length > 0) {
      formData.subs = suscriberBankData[0].subscriberCode
    }
  }, [dispatch, suscriberBankData.length])

  if (suscriberBankData.length > 0) {
    // console.log(formData.subs, 'subs')
    suscriberBankData.map((v, i) => {
      if (formData.subs === v.subscriberCode) {
        formData.subs_name = v.userId
      }
    })
  }

  const handleCardSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()
    setValidated(true)

    // if (formCustomerData.cust_ac_no === '') {
    //   toast.error('Please enter Customer Account Number.')
    // }

    // DISPATCH ACTION
    if (formData.cust_id === '' && formData.card_num === '') {
      toast.error('Please enter one of this fields.Customer ID, Card Number.')
      setCardValue([])
      return
    } else {
      if (formData.cust_id) {
        setSecondoryToggle(true)
        dispatch(getCardSecondaryBankSearch(formData))
      } else {
        setSecondoryToggle(false)
        setCardValue([])
        dispatch(getCardPrimaryBankSearch(formData))
      }
      setFormData(initialState)
      setValidated(false)
    }
  }

  // const handleFormData = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }
  const handleCardFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  React.useEffect(() => {
    if (statusMessage !== 'Success') {
      setCardValue([])
    }
  }, [statusMessage])

  // console.log(cardR, 'crddata')
  // console.log(cardValue, 'crdval')
  // console.log(secondoryToggle, 'secondoryToggle')
  const paginationHandler = (e, p) => {
    // console.log(p, 'p')
    setPage(p)
  }

  return (
    <>
      <CRow className="main_row_bank_search">
        <CCol xs={12}>
          <CCard className="card_class mb-1 px-2 py-1">
            <CCardHeader style={{ fontWeight: 'bold', fontSize: '1.2rem', padding: '0px' }}>
              {/* <strong>Create</strong> <small>Gutters</small> */}
              Card Search
            </CCardHeader>

            {/* <CRow>
                <CCol md={6} style={{ fontSize: '13px' }}>
                  <CFormCheck
                    type="radio"
                    value={'on'}
                    size="10px"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    label="Search By Customer Account No."
                    onChange={(e) => setRadioToggleBtn('on')}
                    defaultChecked
                  />
                </CCol>

                <CCol md={6} style={{ fontSize: '13px' }}>
                  <CFormCheck
                    type="radio"
                    value={'off'}
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    label="Search By Secondary Attribute"
                    onChange={(e) => setRadioToggleBtn('off')}
                  />
                </CCol>
              </CRow> */}

            <CForm
              className="row g-3 needs-validation"
              onSubmit={handleCardSubmit}
              noValidate
              validated={validated}
              style={{ marginTop: '1px' }}
            >
              <CCol md={3}>
                <CFormLabel htmlFor="card_num">Card Number</CFormLabel>
                <CFormInput
                  onChange={handleCardFormData}
                  name="card_num"
                  type="text"
                  id="card_num"
                  value={formData.card_num}
                  //   disabled={formData.cust_phone || formData.cust_pan}
                />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="cust_id">Customer ID</CFormLabel>
                <CFormInput
                  onChange={handleCardFormData}
                  name="cust_id"
                  type="text"
                  id="cust_id"
                  // required
                  value={formData.cust_id.replace(/[^0-9]/g, '')}
                />
                {/* {validated && formData.cust_id === '' && (
                  <CFormFeedback invalid>Please provide a Customer ID.</CFormFeedback>
                )} */}
              </CCol>

              <CCol md={3}>
                <CFormLabel htmlFor="subs">Subscriber</CFormLabel>
                <CFormSelect
                  size="md"
                  className="mb-3"
                  aria-label="Small select example"
                  name="subs"
                  id="subs"
                  onChange={handleCardFormData}
                  value={formData.subs}
                >
                  {suscriberBankData.map((item) => {
                    return (
                      <>
                        <option value={item.subscriberCode}>{item.userId}</option>
                      </>
                    )
                  })}
                </CFormSelect>
              </CCol>

              {/* <CCol md={3}>
                <CFormLabel htmlFor="choose_api">Choose API type</CFormLabel>

                <CFormSelect
                  size="md"
                  className="mb-3"
                  aria-label="select api type"
                  name="choose_api"
                  id="choose_api"
                  onChange={handleCardFormData}
                >
                  {chooseAPIType.map((item) => {
                    return (
                      <>
                        <option value={item.value}>{item.name}</option>
                      </>
                    )
                  })}
                </CFormSelect>
              
              </CCol> */}
              <CCol
                md={3}
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <CButton type="submit" style={{ marginTop: '.8rem', fontSize: '0.9rem' }}>
                  Search
                </CButton>
              </CCol>
            </CForm>

            {/* </CCardBody> */}
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        {/* <Stack>
          <Pagination
            count={Math.ceil(sampleArray.length / 9)}
            variant="text"
            showFirstButton
            showLastButton
            onChange={paginationHandler}
          />
        </Stack>
        {_data.currentData().map((val, i) => {
          return (
            <>
              <h3>{val}</h3>
            </>
          )
        })} */}
        {statusMessage === 'Success' ? (
          <CCol xs={12} className="tabelGrid px-0 py-1">
            {secondoryToggle === true && secondSearch.length > 0 && (
              <>
                <Stack>
                  <Pagination
                    count={Math.ceil(sampleArray.length / 7)}
                    variant="text"
                    showFirstButton
                    showLastButton
                    onChange={paginationHandler}
                  />
                </Stack>
                {_data.currentData().map((val, i) => {
                  return (
                    <>
                      <h3>{val}</h3>
                    </>
                  )
                })}
                <table className="tables_above_div">
                  <tr style={{ display: 'flex' }}>
                    <th>Customer(s) Found</th>

                    {_data.currentData().map((v, i) => (
                      <td
                        onClick={() => {
                          setCardValue(cardData[(page - 1 )*perPage + i])
                        }}
                        style={{
                          cursor: 'pointer',
                          borderRight: 'solid black 1px',
                          color: 'blue',
                        }}
                        key={v}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                </table>
              </>
            )}
            {cardValue.card_num && secondoryToggle === true && (
              <div className="main_header_table_div">
                {headerNameList.map((value, ind) => {
                  return (
                    <>
                      <div className="main_table_div col-4 " style={{ marginBottom: '10px' }}>
                        <table>
                          <tr>
                            <th
                              colSpan="2"
                              style={{ textAlign: 'center', backgroundColor: ' #C3FDB8' }}
                            >
                              {headNameList[ind].des_name}
                            </th>
                          </tr>
                          {Object.keys(value).map((vals, i) => {
                            return (
                              <>
                                <tr>
                                  <th>{value[vals]}</th>

                                  {cardValue &&
                                    Object.keys(cardValue).map((v, i) => {
                                      if (v === vals) {
                                        return <td key={i}> {cardValue[v]} </td>
                                        /* console.log(v, 'vins') */
                                      }
                                    })}
                                </tr>
                              </>
                            )
                          })}
                        </table>
                      </div>
                    </>
                  )
                })}
              </div>
            )}
            {cardData.length === 1 && secondoryToggle === false && (
              <div className="main_header_table_div">
                {headerNameList.map((value, ind) => {
                  return (
                    <>
                      <div className="main_table_div col-4 " style={{ marginBottom: '10px' }}>
                        <table>
                          <tr>
                            <th
                              colSpan="2"
                              style={{ textAlign: 'center', backgroundColor: ' #C3FDB8' }}
                            >
                              {headNameList[ind].des_name}
                            </th>
                          </tr>
                          {Object.keys(value).map((vals, i) => {
                            return (
                              <>
                                <tr>
                                  <th>{value[vals]}</th>

                                  {cardData[0] &&
                                    Object.keys(cardData[0]).map((v, i) => {
                                      if (v === vals) {
                                        return <td key={i}> {cardData[0][v]} </td>
                                      }
                                    })}
                                </tr>
                              </>
                            )
                          })}
                        </table>
                      </div>
                    </>
                  )
                })}
              </div>
            )}
          </CCol>
        ) : statusMessage === 'No Data Found' ? (
          <CCol xs={12} className="tabelGrid px-0 py-1">
            <h5>No Data Found</h5>
          </CCol>
        ) : statusMessage === 'Method not allowed' ? (
          <CCol xs={12} className="tabelGrid px-0 py-1">
            <h5>Something went wrong</h5>
          </CCol>
        ) : null}
      </CRow>
    </>
  )
}
