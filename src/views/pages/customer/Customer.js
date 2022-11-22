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
import { getAllCustomer, getCustomerFormSearch, getCustomerSearch } from 'src/actions/customer'

import './customer.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { chooseAPIType } from '../configSearch/configSearch'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { dataJson } from '../configSearch/configSub.json'
import { getSuscriberData, postSuscriberData } from '../../../actions/suscriberData'

const initialState = {
  email: '',
  rtn: '',
  pan: '',
  subs: '',
  choose_api: 'ai',
  cust_ac_no: '',
  subs_name: '',
}
// const customerInitialState = {
//   cust_ac_no: '',
//   subs: '1',
//   choose_api: 'ai',
// }

const headerNameList = [
  {
    prename: 'Salutation',
    fname: 'First Name',
    mname: 'Middle Name',
    lname: 'Last Name',
    nationality: 'Nationality',
    email: 'Email Address',
    gender: 'Gender',
    rtn: 'Contact Number',
    dob: 'Date Of Birth',
    pan: 'PAN Number',
    res_addrss: 'Residential Address',
    cors_addrss: 'Correspondence Address',
  },
  {
    cust_ac_no: 'Account Number',
    cust_create_dt: 'Creation Date',
    cust_act_dt: 'Activation Date',
    cust_deact_dt: 'De-activation Date',
    cust_stts: 'Status',
    cust_class: 'Class',
    cust_seg: 'Segment',
    cust_cat: 'Category',
  },
  {
    org_name: 'Organization Name',
    org_type: 'Organization Type',
    cust_type: 'Customer Type',
    is_b2b_acc: 'B2B Customer',
    parent_ac_no: 'Parent Account Number',
    root_ac_no: 'Root Account Number',
  },
  {
    cust_ivr_lang: 'IVR Language',
    pref_comm_lang: 'Communication Language',
    pref_comm_ch: 'Communication Channel',
  },
]

const headName = [
  {
    des_name: 'Customer Personal Details',
  },
  {
    des_name: 'Account Details',
  },
  {
    des_name: 'B2B Customer Information',
  },
  {
    des_name: 'Customer Communication Preference',
  },
]

export default function Customer() {
  const [formData, setFormData] = useState(initialState)

  const [subData, setSubData] = useState({
    sub_id: '',
    sub_data: '',
    lob: '',
  })
  const [validated, setValidated] = useState(false)
  const [radioToggleBtn, setRadioToggleBtn] = useState('on')
  const [secondoryToggle, setSecondoryToggle] = useState(false)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const customerR = useSelector((state) => state.customerR)
  const subsData = useSelector((state) => state.susciberData)
  const { customerData, statusMessage } = customerR
  const { suscriberData } = subsData
  let secondSearch = []
  let [customerValue, setCustomerValue] = useState([])
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
  const _data = usePagination(secondSearch, perPage, page)
  customerData.map((vv, ii) => {
    secondSearch.push(vv.cust_ac_no)
  })
  React.useEffect(() => {
    dispatch(getSuscriberData())
    if (suscriberData.length > 0) {
      formData.subs = suscriberData[0].subscriberCode
    }
  }, [dispatch, suscriberData.length])

  const handleCustomerSubmit = (event) => {
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
    if (
      formData.cust_ac_no === '' &&
      formData.email === '' &&
      formData.rtn === '' &&
      formData.pan === ''
    ) {
      toast.error(
        'Please enter one of this fields.Customer Acccount Number, Email, Registered Telephone Number, PAN number.',
      )
      setCustomerValue([])
      return
    } else {
      if (formData.cust_ac_no) {
        setSecondoryToggle(false)
        setCustomerValue([])
        dispatch(getCustomerSearch(formData))
      } else {
        setSecondoryToggle(true)
        dispatch(getCustomerFormSearch(formData))
      }

      setFormData(initialState)
      setValidated(false)
    }
  }

  React.useEffect(() => {
    if (statusMessage !== 'Success') {
      setCustomerValue([])
    }
  }, [statusMessage])

  // const handleFormData = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }
  const handleCustomerFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  if (suscriberData.length > 0) {
    suscriberData.map((v, i) => {
      if (formData.subs === v.subscriberCode) {
        formData.subs_name = v.userId
      }
    })
  }
  // console.log(formData.subs_name, 'ss')
  const handleSuscriberFormData = (e) => {
    setSubData((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
        sub_id: suscriberData.length + 10,
        lob: 'telco',
      }
    })
  }

  const subHandler = () => {
    if (subData.sub_data) {
      dispatch(postSuscriberData(subData))
      dispatch(getSuscriberData())
      setSubData({
        sub_data: '',
        consumer: '',
        lob: '',
      })
    } else {
      setSubData('')
      toast.error('Please Enter Role')
    }
  }

  const paginationHandler = (e, p) => {
    // console.log(p, 'p')
    setPage(p)
  }

  // useEffect(() => {
  //   dispatch(getAllCustomer(formData))
  // }, [dispatch, formData])
  return (
    <>
      <CRow className="main_row_cust_form_search">
        <CCol xs={12}>
          <CCard className="card_class mb-2 px-2 py-1">
            <CCardHeader style={{ fontWeight: 'bold', fontSize: '1.2rem', padding: '0px' }}>
              {/* <strong>Create</strong> <small>Gutters</small> */}
              Customer Search
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
              style={{ marginTop: '1px' }}
            >
              <CCol md={3}>
                <CFormLabel htmlFor="cust_ac_no">Customer Acccount Number</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
                  name="cust_ac_no"
                  type="text"
                  id="can"
                  required
                  value={formData.cust_ac_no.replace(/[^0-9]/g, '')}
                />
                {validated && formData.cust_ac_no === '' && (
                  <CFormFeedback invalid>Please provide a Customer Account Number.</CFormFeedback>
                )}
              </CCol>

              <CCol width={8.33 * 1.5}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
                  name="email"
                  type="email"
                  id="emailc"
                  value={formData.email}
                  disabled={formData.rtn || formData.pan}
                />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="rtn">Registered Telephone Number</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
                  name="rtn"
                  type="text"
                  id="rtn"
                  value={formData.rtn}
                  disabled={formData.email || formData.pan}
                />
              </CCol>
              <CCol width={8.33 * 1.5}>
                <CFormLabel htmlFor="pan">PAN Number</CFormLabel>
                <CFormInput
                  onChange={handleCustomerFormData}
                  name="pan"
                  type="text"
                  value={formData.pan}
                  id="pan"
                  disabled={formData.email || formData.rtn}
                />
              </CCol>
              <CCol width={8.33 * 1.5}>
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
                  {suscriberData.map((item) => {
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
                  justifyContent: 'flex-start',
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
        {/* <CCol
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: '.4rem',
          }}
        >
          <CCol md={3}>
         
            <CFormInput
              onChange={handleSuscriberFormData}
              name="sub_data"
              type="text"
              id="sub_data"
              placeholder="Add Subscriber"
              value={subData.sub_data}
            />
          </CCol>
          <CCol
            md={1}
            style={{
              textAlign: 'center',
              display: 'flex',

              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <CButton style={{ marginLeft: '0.7rem', fontSize: '0.9rem' }} onClick={subHandler}>
              Add
            </CButton>
          </CCol>
        </CCol> */}
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
                    count={Math.ceil(secondSearch.length / 7)}
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
                          setCustomerValue(customerData[(page - 1 )*perPage + i])
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
            {customerValue.cust_ac_no && secondoryToggle === true && (
              <div className="main_header_table_div">
                {headerNameList.map((value, ind) => {
                  return (
                    <>
                      <div className="main_table_div" style={{ marginBottom: '10px' }}>
                        <table>
                          <tr>
                            <th
                              colSpan="2"
                              style={{
                                textAlign: 'center',
                                backgroundColor: '#2b65ec',
                                color: 'white',
                              }}
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
            {customerData.length === 1 && secondoryToggle === false && (
              <div className="main_header_table_div">
                {headerNameList.map((value, ind) => {
                  return (
                    <>
                      <div className="main_table_div col-4 " style={{ marginBottom: '10px' }}>
                        <table>
                          <tr>
                            <th
                              colSpan="2"
                              style={{
                                textAlign: 'center',
                                backgroundColor: '#2b65ec',
                                color: 'white',
                              }}
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
