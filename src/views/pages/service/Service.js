import React, { useState, useEffect } from 'react'
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
  CFormCheck,
  CFormFeedback,
} from '@coreui/react'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import usePagination from 'src/views/customHook/paginationHook'

import { useSelector, useDispatch } from 'react-redux'

// actions
import { getAllService, getServiceSearch, getServiceFormSearch } from 'src/actions/service'

//
import './service.css'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
// import { suscriberData, chooseAPIType } from '../configSearch/configSearch'
import { getSuscriberData, postSuscriberData } from '../../../actions/suscriberData'

const initialState = {
  imei: '',
  imsi: '',
  vcid: '',
  cust_ac_no: '',
  android_id: '',
  subs: '',
  choose_api: 'ai',
  si: '',
  subs_name: '',
}
// const serviceInitialState = {
//   si: '',
//   subs: '1',
//   choose_api: 'ai',
// }

export default function Service() {
  const [formData, setFormData] = useState(initialState)
  // const [serviceformData, setServiceFormData] = useState(initialState)
  const [show, setShow] = useState(false)
  const [radioToggleBtn, setRadioToggleBtn] = useState('on')
  const [subData, setSubData] = useState({
    sub_id: '',
    sub_data: '',
    lob: '',
  })
  const [page, setPage] = useState(1)
  const [secondoryToggle, setSecondoryToggle] = useState(false)
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  let [serviceValue, setServiceValue] = useState([])
  const serviceR = useSelector((state) => state.serviceR)
  const subsData = useSelector((state) => state.susciberData)
  const { serviceData, statusMessage } = serviceR
  const { suscriberData } = subsData
  let secondSearch = []
  let perPage = 7

  // console.log(sampleArray.length, 'serr')
  const _data = usePagination(secondSearch, perPage, page)
  // console.log(_data.currentData(), 'data')
  const headerNameList = [
    {
      si: 'Service',
      si_lob: 'Line of Business',
      cust_ac_no: 'Customer Account Number',
      source_systm: 'Source System',
      si_act_date: 'Activation Date',
      si_deact_date: 'De-activation Date',
      firstcall_date: 'First Call Date',
      si_create_date: 'Create Date',
      si_sts: 'SI Status',
      barr_reason: 'Barring Reason',
      curr_stts: 'Current Status',
      vipflag: 'VIP',
      dnd: 'Do Not Disturb',
    },

    {
      sim_no: 'Sim Number',
      sim_type: 'SIM Type',
      sim_slot_pref: 'Sim Slot Preference',
      stbid: 'STB ID',
      stb_type: 'STB Type',
      dev_chng_dt: 'Device Change Date',
    },
    {
      ol_gamer: 'Online Gamer',
      ol_shopper: 'Online Shopper',
      ol_music_strm: 'Online Music Streamer',
      ol_vdo_strm: 'Online Video Streamer',
      credit_score: 'Credit Card User',
      ndnc: 'NDNC',
      intl_trvlr: 'International Traveller',
    },
    {
      pckg: 'Package',
      pck_chg_dt: 'Package Change Date',
      crdt_limit: 'Credit Limit',
      data_usg_gb: 'Data Limit',
      ir_region: 'International Roaming Region',
      ir_act: 'International Roaming Activation Date',
      r_bndle: 'International Roaming Bundle',
    },
    {
      circle: 'Circle',
      type_lte: 'Type LTE',
      volteflag: 'Volte',
      hndst_4g: 'Network Type',
      vcid: 'VC ID',
    },
    {
      ekycready: 'E KYC',
    },
    {
      imsi: 'IMSI',
      imei: 'IMEI',
      android_id: 'Andriod ID',
    },
  ]

  const headName = [
    {
      des_name: 'Service Information',
    },
    {
      des_name: 'Device Details',
    },
    {
      des_name: 'Customer Behavioral Details',
    },
    {
      des_name: 'Subscriber Package Details',
    },
    {
      des_name: 'Subscriber Identity',
    },
    {
      des_name: 'Subscriber Preferences',
    },

    {
      des_name: 'Network Details',
    },
  ]

  serviceData.map((vv, ii) => {
    secondSearch.push(vv.si)
  })
  const newServiceData = serviceData.map((item) => ({
    id: item.si,
    ...item,
  }))

  React.useEffect(() => {
    dispatch(getSuscriberData())
    if (suscriberData.length > 0) {
      formData.subs = suscriberData[0].subscriberCode
    }
  }, [dispatch, suscriberData.length])

  const handleServiceFormSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()
    setValidated(true)

    // DISPATCH ACTION
    // dispatch(getServiceFormSearch(formData))
    if (
      formData.si === '' &&
      formData.imei === '' &&
      formData.imsi === '' &&
      formData.vcid === '' &&
      formData.android_id === '' &&
      formData.cust_ac_no === ''
    ) {
      toast.error('Please enter one of these fields. Service Instance,IMEI,IMSI,VCID,Android ID')
      setServiceValue([])
      return
    } else {
      if (formData.si) {
        setServiceValue([])
        setSecondoryToggle(false)
        dispatch(getServiceSearch(formData))
        setFormData(initialState)
      } else {
        // if (formData.imsi !== '' && formData.imei === '') {
        //   if (formData.imsi.length < 15) {
        //     toast.error('Please enter 15 Digit IMEI Number')
        //   }
        // } else if (formData.imei !== '' && formData.imsi === '') {
        //   if (formData.imei.length < 15) {
        //     toast.error('Please enter 15 Digit IMSI Number')
        //   }
        // } else {
        //   dispatch(getServiceFormSearch(formData))
        //   setFormData(initialState)
        //   return
        // }
        setSecondoryToggle(true)
        dispatch(getServiceFormSearch(formData))
        setFormData(initialState)
      }
    }
  }

  const handleShowCol = () => {
    setShow(!show)
  }

  // const handleFormData = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  const handleServiceFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (suscriberData.length > 0) {
    // console.log(formData.subs, 'subs')
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

  // useEffect(() => {
  //   dispatch(getAllService(formData))
  // }, [dispatch, formData])

  const paginationHandler = (e, p) => {
    console.log(e.target.childNodes, 'p')
    setPage(p)
  }
  let val = 'val'
  return (
    <>
      <CRow className="main_row_cust_form_search">
        <CCol xs={12}>
          <CCard className="card_class mb-2 px-2 py-1">
            <CCardHeader style={{ fontWeight: 'bold', fontSize: '1.2rem', padding: '0px' }}>
              {/* <strong>Create</strong> <small>Gutters</small> */}
              Service Search
            </CCardHeader>

            {/* <CRow>
                <CCol md={4} style={{ fontSize: '13px' }}>
                  <CFormCheck
                    type="radio"
                    value={'on'}
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    label="Search By SI"
                    onChange={(e) => setRadioToggleBtn('on')}
                    defaultChecked
                  />
                </CCol>

                <CCol md={8} style={{ fontSize: '13px' }}>
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
              style={{ marginTop: '1px' }}
              onSubmit={handleServiceFormSubmit}
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
            >
              <CCol md={2}>
                <CFormLabel htmlFor="si">Service Instance (SI)</CFormLabel>
                <CFormInput
                  onChange={handleServiceFormData}
                  name="si"
                  type="text"
                  id="si"
                  value={formData.si}
                  required={
                    formData.android_id && formData.vcid && formData.imei && formData.imsi
                      ? true
                      : false
                  }
                />
                {formData.android_id && formData.vcid && formData.imei && formData.imsi ? (
                  <CFormFeedback invalid>Please provide a Service Instance.</CFormFeedback>
                ) : null}
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="cust_ac_no">Customer Account Number</CFormLabel>
                <CFormInput
                  onChange={handleServiceFormData}
                  name="cust_ac_no"
                  type="text"
                  id="cust_ac_no"
                  // maxLength={15}
                  value={formData.cust_ac_no.replace(/[^0-9]/g, '')}
                  disabled={formData.imsi || formData.imei || formData.vcid || formData.android_id}
                />
              </CCol>

              <CCol md={2}>
                <CFormLabel htmlFor="imei">IMEI</CFormLabel>
                <CFormInput
                  onChange={handleServiceFormData}
                  name="imei"
                  type="text"
                  id="imei"
                  maxLength={15}
                  value={formData.imei.replace(/[^0-9]/g, '')}
                  disabled={
                    formData.imsi || formData.vcid || formData.android_id || formData.cust_ac_no
                  }
                />
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="imsi">IMSI</CFormLabel>
                <CFormInput
                  onChange={handleServiceFormData}
                  name="imsi"
                  type="text"
                  id="imsi"
                  maxLength={15}
                  value={
                    formData.imei || formData.vcid || formData.android_id
                      ? ''
                      : formData.imsi.replace(/[^0-9]/g, '')
                  }
                  disabled={
                    formData.imei || formData.vcid || formData.android_id || formData.cust_ac_no
                  }
                />
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="vcid">VCID</CFormLabel>
                <CFormInput
                  onChange={handleServiceFormData}
                  name="vcid"
                  type="text"
                  id="vcid"
                  value={formData.vcid}
                  disabled={
                    formData.imei || formData.imsi || formData.android_id || formData.cust_ac_no
                  }
                />
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="aid">Android ID</CFormLabel>
                <CFormInput
                  onChange={handleServiceFormData}
                  name="android_id"
                  type="text"
                  id="android_id"
                  value={formData.android_id}
                  disabled={formData.imei || formData.imsi || formData.vcid || formData.cust_ac_no}
                />
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="subs">Subscriber</CFormLabel>
                <CFormSelect
                  size="md"
                  className="mb-3"
                  aria-label="Small select example"
                  name="subs"
                  id="subs"
                  onChange={handleServiceFormData}
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
                <CFormLabel htmlFor="choose_api_cus">Choose API type</CFormLabel>
                <CFormSelect
                  size="md"
                  className="mb-3"
                  aria-label="select api"
                  name="choose_api"
                  id="choose_api"
                  onChange={handleServiceFormData}
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
                xs={2}
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
            page={page}
            value={val}
            showLastButton
            onChange={paginationHandler}
          />
        </Stack>
        <ul style={{ display: 'flex' }}>
          {_data.currentData().map((val, i) => {
            return (
              <>
                <li style={{ marginRight: '33px' }}>{val}</li>
              </>
            )
          })}
        </ul> */}
        {/* sampleArray */}
        {statusMessage === 'Success' ? (
          <>
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

                  <table className="tables_above_div">
                    <tr style={{ display: 'flex' }}>
                      <th>Service(s) Found</th>

                      {_data.currentData().map((v, i) => (
                        <td
                          onClick={() => {
                            setServiceValue(serviceData[(page - 1) * perPage + i])
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
              {serviceValue.si && secondoryToggle === true && (
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

                                    {serviceValue &&
                                      Object.keys(serviceValue).map((v, i) => {
                                        if (v === vals) {
                                          return <td key={i}> {serviceValue[v]} </td>
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
              {serviceData.length === 1 && secondoryToggle === false && (
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

                                    {serviceData[0] &&
                                      Object.keys(serviceData[0]).map((v, i) => {
                                        if (v === vals) {
                                          return <td key={i}> {serviceData[0][v]} </td>
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
          </>
        ) : statusMessage === 'No Data Found' ? (
          <CCol xs={12} className="tabelGrid px-0 py-1">
            <h5>No Data Found</h5>
          </CCol>
        ) : null}
      </CRow>

      {/* <div className="d-flex justify-content-end">
        <button onClick={handleShowCol} className="btn btn-primary mb-2 ">
          {!show ? 'Show Col' : 'Hide Col'}
        </button>
      </div> */}
      {/* <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}> */}
      {/* <CTable bordered responsive="md">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Service</CTableHeaderCell>
              <CTableHeaderCell scope="col">Service Line Of Business</CTableHeaderCell>
              <CTableHeaderCell scope="col">Customer Account Number</CTableHeaderCell>
              <CTableHeaderCell scope="col">Source System</CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Service Activation Date
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Service Deactivation Date
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                First Call Date
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Service Create Date
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Type LTE
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Service STS
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Circle
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Barred Reason
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Curr Stts
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                E Kyc Ready
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Volte Flag
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Vip Flag
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Dnd
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                IMSI
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                IMEI
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Dev Change Date
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Sim Number
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Sim Type
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Sim Slot
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Handset 4g
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                R Bundle
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Ir Region
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Ir Act
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Stbid
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Stb Type
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Vc Id
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Package Change Date
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Package
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Andriod Id
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Credit Limit
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Data Usage in Gb
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Band Cnty
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                Voice Cnty
              </CTableHeaderCell>
              <CTableHeaderCell className={!show ? 'hide' : ''} scope="col">
                DTF 100 Cnt
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {serviceData.length < 1 ? (
              <div>No Data To Show</div>
            ) : Object.entries(...serviceData).length === 0 ? (
              <div>No Data To Show</div>
            ) : (
              serviceData?.map((data, index) => (
                <CTableRow key={data.id}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{data.si || 'NA'}</CTableDataCell>
                  <CTableDataCell>{data.si_lob || 'NA'}</CTableDataCell>
                  <CTableDataCell>{data.cust_ac_no || 'NA'}</CTableDataCell>
                  <CTableDataCell>{data.source_systm || 'NA'}</CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.si_act_date || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.si_deact_date || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.firstcall_date || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.si_create_date || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.type_lte || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.si_sts || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.circle || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.barr_reason || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.curr_stts || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.ekycready || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.volteflag || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.vipflag || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.dnd || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.imsi || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.imei || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.dev_chng_dt || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.sim_no || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.sim_type || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.sim_slot_pref || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.hndst_4g || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.r_bndle || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.ir_region || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.ir_act || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.stbid || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.stb_type || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.vcid || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.pck_chg_dt || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.pckg || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.android_id || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.crdt_limit || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.data_usg_gb || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.bnd_cnty || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.voice_cnty || 'NA'}
                  </CTableDataCell>
                  <CTableDataCell className={!show ? 'hide' : ''}>
                    {data.dtfup_100_cnt || 'NA'}
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable> */}
      {/* </div> */}
    </>
  )
}
