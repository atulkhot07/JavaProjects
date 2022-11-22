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
import usePagination from 'src/views/customHook/paginationHook'
// actions
import {
  getAllCustomer,
  getAccountPrimaryBankSearch,
  getAccountSecondaryBankSearch,
  getCustomerPrimaryBankSearch,
} from 'src/views/bankDemo/redux/action'

import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import {
  suscriberData,
  chooseAPIType,
  suscriberDataBankCustomer,
} from '../../configSearch/configSearch'
import { isPlainObject } from '@mui/utils'
import { isEmail } from '../../../bankDemo/utils'
import { getBankSuscriberData } from '../../../../actions/suscriberData'
import '../index.css'

const initialState = {
  acc_num: '',
  cust_id: '',
  rel_mang_em: '',
  subs: '',
  choose_api: 'ai',
  subs_name: '',
}
// const customerInitialState = {
//   cust_ac_no: '',
//   subs: '1',
//   choose_api: 'ai',
// }

const firstPoint = [
  {
    acc_num: 'Number',
    acc_opn_date: 'Open Date',
    acc_type: 'Type',
    acc_bal: 'Balance',
    acc_status: 'Status',
    acc_roi: 'Rate of Interest',
    acc_branch: 'Branch',
    acc_is_pri: 'Priority Account',
  },
  {
    cust_id: 'Customer ID',
    card_issued: 'Card Issued',
    card_number: 'Card Number',
  },
  {
    rel_mang_nm: 'Name',
    rel_mang_em: 'Email',
    rel_mang_ph: 'PhoneNo',
  },
]

const secondarySearch = [
  {
    acc_num: 'Number',
    acc_opn_date: 'Open Date',
    acc_type: 'Type',
    acc_bal: 'Balance',
    acc_status: 'Status',
    acc_roi: 'Rate of Interest',
    acc_branch: 'Branch',
    acc_is_pri: 'Priority Account',
  },
  {
    card_issued: 'Card Issued',
    card_number: 'Card Number',
  },
  {
    rel_mang_nm: 'Name',
    rel_mang_em: 'Email',
    rel_mang_ph: 'PhoneNo',
  },
]

const headCustSearch = [
  {
    cust_id: 'Customer ID',
    prename: 'Salutation',
    fname: 'First Name',
    lname: 'Last Name',

    // cust_name: 'Name',
    cust_dob: 'Date of Birth',
    cust_email: 'Email',
    cust_phone: 'Phone Number',
    cust_gender: 'Gender',
    cust_add: 'Address',
    cust_pan: 'PAN Number',
  },
]

const headName = [
  {
    des_name: 'Customer Account Details',
  },
  {
    des_name: 'Customer Card Details',
  },
  {
    des_name: 'Relationship Manager Details',
  },
]

const headSecondName = [
  {
    des_name: 'Customer Account Details',
  },
  {
    des_name: 'Customer Card Details',
  },
  {
    des_name: 'Relationship Manager Details',
  },
]

const headCustName = [
  {
    des_name: 'Customer Personal Details',
  },
]

export default function Customer() {
  const [formData, setFormData] = useState(initialState)
  const [validated, setValidated] = useState(false)
  const [custToggle, setCustToggle] = useState(false)

  const [secondoryToggle, setSecondoryToggle] = useState(false)
  const dispatch = useDispatch()
  const accountR = useSelector((state) => state.accountBank)
  const { accountData, statusMessage } = accountR
  const customerR = useSelector((state) => state.customerBank)
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

  const { customerData } = customerR

  let [accountValue, setAccountValue] = useState([])

  accountData.map((vv, ii) => {
    secondSearch.push(vv.acc_num)
  })

  React.useEffect(() => {
    dispatch(getBankSuscriberData())
    if (suscriberBankData.length > 0) {
      formData.subs = suscriberBankData[0].subscriberCode
    }
  }, [dispatch, suscriberBankData.length])

  if (suscriberBankData.length > 0) {
    suscriberBankData.map((v, i) => {
      if (formData.subs === v.subscriberCode) {
        formData.subs_name = v.userId
      }
    })
  }

  const handleCustomerSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()
    setValidated(true)

    // DISPATCH ACTION
    if (formData.acc_num === '' && formData.cust_id === '' && formData.rel_mang_em === '') {
      toast.error(
        'Please enter one of this fields. Account Number, Customer ID, Relationship manager Email.',
      )
      setAccountValue([])
      return
    } else {
      if (formData.cust_id || formData.rel_mang_em) {
        if (formData.rel_mang_em !== '') {
          if (!isEmail(formData.rel_mang_em)) {
            toast.error('Please enter valid email format')
          } else {
            setSecondoryToggle(true)
            setCustToggle(false)

            dispatch(getAccountSecondaryBankSearch(formData))
          }
        } else {
          setSecondoryToggle(true)
          setCustToggle(false)

          dispatch(getAccountSecondaryBankSearch(formData))
        }
      } else {
        if (formData.rel_mang_em !== '') {
          if (!isEmail(formData.rel_mang_em)) {
            toast.error('Please enter valid email format')
          } else {
            setSecondoryToggle(false)
            setCustToggle(false)
            setAccountValue([])
            dispatch(getAccountPrimaryBankSearch(formData))
          }
        } else {
          setSecondoryToggle(false)
          setCustToggle(false)
          setAccountValue([])
          dispatch(getAccountPrimaryBankSearch(formData))
        }
      }
      setFormData(initialState)
      setValidated(false)
    }
  }

  // React.useEffect(() => {
  //   if (accountData.length > 0) {
  //     for (let i = 0; i < accountData.length; i++) {
  //       dispatch(getCustomerPrimaryBankSearch(accountData[i].cust_id))
  //     }
  //   }
  // }, [dispatch, accountData.length])

  // console.log(customerData, 'cust')

  React.useEffect(() => {
    if (statusMessage !== 'Success') {
      setAccountValue([])
    }
  }, [statusMessage])
  const handleCustomerFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // console.log(accountData, 'accdata')
  // console.log(accountValue, 'accval')
  // console.log(secondSearch, 'secomdsearch')
  const paginationHandler = (e, p) => {
    // console.log(p, 'p')
    setPage(p)
  }
  return (
    <>
      <CRow className="main_row_bank_search">
        <CCol xs={12}>
          <CCard className="card_class mb-2 px-2 py-1">
            <CCardHeader style={{ fontWeight: 'bold', fontSize: '1.2rem', padding: '0px' }}>
              {/* <strong>Create</strong> <small>Gutters</small> */}
              Account Search
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
              className="row g-2 needs-validation"
              onSubmit={handleCustomerSubmit}
              noValidate
              validated={validated}
              style={{ marginTop: '15px' }}
            >
              <CCol width={8.3333 * 2.4}>
                <CFormLabel htmlFor="acc_num">Acccount Number</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
                  name="acc_num"
                  type="text"
                  id="acc_num"
                  value={formData.acc_num}
                />
              </CCol>
              <CCol width={8.3333 * 2.4}>
                <CFormLabel htmlFor="cust_id">Customer ID</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
                  name="cust_id"
                  type="text"
                  id="cust_id"
                  // required
                  value={formData.cust_id.replace(/[^0-9]/g, '')}
                  disabled={formData.rel_mang_em}
                />
                {/* {validated && formData.cust_id === '' && (
                  <CFormFeedback invalid>Please provide a Customer ID.</CFormFeedback>
                )} */}
              </CCol>

              <CCol width={8.3333 * 2.4}>
                <CFormLabel htmlFor="rel_mang_em">Relationship Manager Email</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
                  name="rel_mang_em"
                  type="email"
                  id="rel_mang_em"
                  value={formData.rel_mang_em}
                  disabled={formData.cust_id}
                />
              </CCol>

              <CCol width={8.3333 * 2.4}>
                <CFormLabel htmlFor="subs">Subscriber</CFormLabel>
                <CFormSelect
                  size="md"
                  className="mb-2"
                  aria-label="Small select example"
                  name="subs"
                  id="subs"
                  onChange={handleCustomerFormData}
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

              {/* <CCol width={8.3333 * 2.4}>
                <CFormLabel htmlFor="choose_api">Choose API type</CFormLabel>

                <CFormSelect
                  size="md"
                  className="mb-2"
                  aria-label="select api type"
                  name="choose_api"
                  id="choose_api"
                  onChange={handleCustomerFormData}
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
                md={2}
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <CButton type="submit" style={{ marginTop: '1.2rem', fontSize: '0.9rem' }}>
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
            {secondoryToggle === true && (
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
                    <th>Accounts(s) Found</th>

                    {_data.currentData().map((v, i) => (
                      <td
                        onClick={() => {
                          setAccountValue(accountData[(page - 1 )*perPage + i])
                          dispatch(
                            getCustomerPrimaryBankSearch({
                              cust_id: accountData[i].cust_id,
                              subs: formData.subs,
                            }),
                          )
                          setCustToggle(true)
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
            {customerData.length > 0 && custToggle === true && (
              <div className="main_header_table_div" style={{ width: '30%', height: '270px' }}>
                {headCustSearch.map((value, ind) => {
                  return (
                    <>
                      <div
                        className="main_table_div col-4 "
                        style={{ marginBottom: '10px', width: '100%' }}
                      >
                        <table>
                          <tr>
                            <th
                              colSpan="2"
                              style={{ textAlign: 'center', backgroundColor: ' #C3FDB8' }}
                            >
                              {headCustName[ind].des_name}
                            </th>
                          </tr>
                          {Object.keys(value).map((vals, i) => {
                            return (
                              <>
                                <tr>
                                  <th>{value[vals]}</th>

                                  {Object.keys(customerData[0]).map((v, i) => {
                                    if (v === vals) {
                                      return <td key={i}> {customerData[0][v]} </td>
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
            {accountValue.acc_num && custToggle === true && (
              <div className="main_header_table_div" style={{ width: '70%' }}>
                {secondarySearch.map((value, ind) => {
                  return (
                    <>
                      <div className="main_table_div col-4 " style={{ marginBottom: '10px' }}>
                        <table>
                          <tr>
                            <th
                              colSpan="2"
                              style={{ textAlign: 'center', backgroundColor: ' #C3FDB8' }}
                            >
                              {headSecondName[ind].des_name}
                            </th>
                          </tr>
                          {Object.keys(value).map((vals, i) => {
                            return (
                              <>
                                <tr>
                                  <th>{value[vals]}</th>

                                  {accountValue &&
                                    Object.keys(accountValue).map((v, i) => {
                                      if (v === vals) {
                                        return <td key={i}> {accountValue[v]} </td>
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
            {accountData.length === 1 && secondoryToggle === false && (
              <div className="main_header_table_div">
                {firstPoint.map((value, ind) => {
                  return (
                    <>
                      <div className="main_table_div col-4 " style={{ marginBottom: '10px' }}>
                        <table>
                          <tr>
                            <th
                              colSpan="2"
                              style={{ textAlign: 'center', backgroundColor: ' #C3FDB8' }}
                            >
                              {headName[ind].des_name}
                            </th>
                          </tr>
                          {Object.keys(value).map((vals, i) => {
                            return (
                              <>
                                <tr>
                                  <th>{value[vals]}</th>

                                  {accountData[0] &&
                                    Object.keys(accountData[0]).map((v, i) => {
                                      if (v === vals) {
                                        return <td key={i}> {accountData[0][v]} </td>
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
        ) : null}
      </CRow>
    </>
  )
}
