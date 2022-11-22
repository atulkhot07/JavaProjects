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
import { isEmail } from '../../../bankDemo/utils'
import BoxCard from '../index'
import '../index.css'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
// actions
import {
  getAllCustomer,
  getCustomerSecondaryBankSearch,
  getCustomerPrimaryBankSearch,
} from 'src/views/bankDemo/redux/action'

import { useEffect } from 'react'
import { toast } from 'react-toastify'
import usePagination from 'src/views/customHook/paginationHook'

import {
  suscriberData,
  chooseAPIType,
  suscriberDataBankCustomer,
} from '../../configSearch/configSearch'

import { getBankSuscriberData } from '../../../../actions/suscriberData'
import './index.scss'

import { ReadMoreTwoTone } from '@mui/icons-material'

const initialState = {
  cust_email: '',
  cust_id: '',
  cust_phone: '',
  cust_pan: '',
  subs: '',
  choose_api: 'ai',
  subs_name: '',
}

const headerNameList = [
  {
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
    // cust_act_dt: 'Date of Activation',
    // rel_mang_nm: 'Relationship Manager Name',
    // rel_mang_em: 'Relationship Manager Email',
    // rel_mang_ph: 'Relationship Manager PhoneNo',
  },
  {
    cust_id: 'Customer ID',
    cust_cat: 'Category',
    cust_act_dt: 'Date of Activation',
  },
  {
    cust_kyc: 'KYC Done',
    cust_kyc_dt: 'KYC Date',
    cust_fatca: 'FATCA Done',
    cust_ftc_dt: 'FATCA Date',
  },
]

const headName = [
  {
    des_name: 'Customer Personal Details',
  },
  {
    des_name: 'Customer Information',
  },
  {
    des_name: 'Customer Verification details',
  },
]

export default function Customer() {
  const [formData, setFormData] = useState(initialState)
  const [validated, setValidated] = useState(false)
  const [toggle, setToggle] = useState(null)
  const [secondoryToggle, setSecondoryToggle] = useState(false)
  const [manageToggele, setManageToggele] = useState(false)

  const dispatch = useDispatch()
  const customerR = useSelector((state) => state.customerBank)
  const susBankData = useSelector((state) => state.susciberData)

  const { customerData, statusMessage } = customerR

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

  let [customerValue, setCusstomerValue] = useState([])

  customerData.map((vv, ii) => {
    secondSearch.push(vv.cust_id)
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
  const handleCustomerSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()
    setValidated(true)

    // DISPATCH ACTION

    if (
      formData.cust_id === '' &&
      formData.cust_email === '' &&
      formData.cust_phone === '' &&
      formData.cust_pan === ''
    ) {
      toast.error(
        'Please enter one of this fields.Customer ID, Email, Registered Telephone Number, PAN number.',
      )

      setCusstomerValue([])

      return
    } else {
      if (formData.cust_email || formData.cust_phone || formData.cust_pan) {
        if (formData.cust_email !== '') {
          if (!isEmail(formData.cust_email)) {
            toast.error('Please provide valid email format')
          } else {
            setSecondoryToggle(true)
            setManageToggele(false)
            dispatch(getCustomerSecondaryBankSearch(formData))
          }
        } else {
          setSecondoryToggle(true)
          setManageToggele(false)
          dispatch(getCustomerSecondaryBankSearch(formData))
        }
      } else {
        if (formData.cust_email !== '') {
          if (!isEmail(formData.cust_email)) {
            toast.error('Please provide valid email format')
          } else {
            setSecondoryToggle(false)
            setManageToggele(true)
            setCusstomerValue([])
            dispatch(getCustomerPrimaryBankSearch(formData))
          }
        } else {
          setSecondoryToggle(false)
          setManageToggele(true)
          setCusstomerValue([])
          dispatch(getCustomerPrimaryBankSearch(formData))
        }
      }
      setFormData(initialState)
      setValidated(false)
    }
  }

  const handleCustomerFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const paginationHandler = (e, p) => {
    // console.log(p, 'p')
    setPage(p)
  }

  // console.log(customerValue, 'customerValue')
  // console.log(customerData, 'customerData')
  // console.log(customerR, 'custR')

  React.useEffect(() => {
    if (statusMessage !== 'Success') {
      setCusstomerValue([])
    }
  }, [statusMessage])

  // console.log(manageToggele, 'mng')

  return (
    <>
      <CRow className="main_row_bank_search">
        <CCol xs={12}>
          <CCard className="card_class mb-2 px-2 py-1">
            <CCardHeader style={{ fontWeight: 'bold', fontSize: '1.2rem', padding: '0px' }}>
              {/* <strong>Create</strong> <small>Gutters</small> */}
              Customer Search
            </CCardHeader>

            <CForm
              className="row g-3 needs-validation"
              onSubmit={handleCustomerSubmit}
              noValidate
              validated={validated}
              style={{ marginTop: '1px' }}
            >
              <CCol md={2} className="cust_input_class">
                <CFormLabel htmlFor="cust_id">Customer ID</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
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

              <CCol md={2} className="cust_input_class">
                <CFormLabel htmlFor="cust_email">Email</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
                  name="cust_email"
                  type="email"
                  id="cust_email"
                  value={formData.cust_email}
                  disabled={formData.cust_phone || formData.cust_pan}
                />
              </CCol>
              <CCol md={3} className="cust_input_class">
                <CFormLabel htmlFor="cust_phone">Registered Telephone Number</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
                  name="cust_phone"
                  type="text"
                  id="cust_phone"
                  value={formData.cust_phone}
                  disabled={formData.cust_email || formData.cust_pan}
                />
              </CCol>
              <CCol md={2} className="cust_input_class">
                <CFormLabel htmlFor="cust_pan">PAN Number</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
                  name="cust_pan"
                  type="text"
                  value={formData.cust_pan}
                  id="cust_pan"
                  disabled={formData.cust_email || formData.cust_phone}
                />
              </CCol>
              <CCol md={2} className="cust_input_class">
                <CFormLabel htmlFor="subs">Subscriber</CFormLabel>
                <CFormSelect
                  size="md"
                  className="mb-3"
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

              {/* <CCol md={3}>
                <CFormLabel htmlFor="choose_api">Choose API type</CFormLabel>

                <CFormSelect
                  size="md"
                  className="mb-3"
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
                md={1}
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CButton style={{ marginTop: '0.7rem', fontSize: '0.9rem' }} type="submit">
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
                {/* {_data.currentData().map((val, i) => {
                  return (
                    <>
                      <h3>{val}</h3>
                    </>
                  )
                })} */}
                <table className="tables_above_div">
                  <tr style={{ display: 'flex' }}>
                    <th>Customer(s) Found</th>

                    {_data.currentData().map((v, i) => (
                      <td
                        onClick={() => {
                          setCusstomerValue(customerData[(page - 1) * perPage + i])
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
            {customerValue.cust_id && secondoryToggle === true && (
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
                              {headName[ind].des_name}
                            </th>
                          </tr>
                          {Object.keys(value).map((vals, i) => {
                            return (
                              <>
                                <tr>
                                  <th>{value[vals]}</th>

                                  {customerValue &&
                                    Object.keys(customerValue).map((v, i) => {
                                      if (v === vals) {
                                        return <td key={i}> {customerValue[v]} </td>
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
            {customerData.length === 1 && secondoryToggle === false && manageToggele === true && (
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
                              {headName[ind].des_name}
                            </th>
                          </tr>
                          {Object.keys(value).map((vals, i) => {
                            return (
                              <>
                                <tr>
                                  <th>{value[vals]}</th>

                                  {customerData[0] &&
                                    Object.keys(customerData[0]).map((v, i) => {
                                      if (v === vals) {
                                        return <td key={i}> {customerData[0][v]} </td>
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
