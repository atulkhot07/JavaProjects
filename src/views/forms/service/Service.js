import React, { useState } from 'react'
import moment from 'moment'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormFeedback,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

import { useDispatch, useSelector } from 'react-redux'

// action
import { createService } from 'src/actions/service'
import airtel from './../../../assets/images/Airtel-Icon-.jpg'

import './service.css'
import { toast } from 'react-toastify'
import {
  lineOfBusiness,
  typeLTE,
  circle,
  eKyc,
  simType,
  networkType,
  internationalRoamingRegion,
  STBType,
} from '../configForm/serviceFormConfig'

const initialState = {
  si: '',
  si_lob: 'Prepaid',
  cust_ac_no: '',
  // source_systm: '',
  si_act_date: moment().format('YYYY-MM-DD'),
  si_deact_date: moment().add('days', 365).format('YYYY-MM-DD'),
  firstcall_date: '',
  si_create_date: moment().format('YYYY-MM-DD'),
  type_lte: 'Yes',
  si_sts: 'Active',
  circle: 'Maharashtra',
  barr_reason: '',
  // curr_stts: '',
  ekycready: 'Yes',
  volteflag: '',
  vipflag: '',
  dnd: '',
  imsi: '810010001000100',
  imei: '812001001001001',
  dev_chng_dt: moment().format('YYYY-MM-DD'),
  sim_no: '',
  sim_type: 'Nano',
  sim_slot_pref: '',
  hndst_4g: '4G',
  ir_bndle: '',
  ir_region: 'None',
  ir_act: '',
  stbid: '',
  stb_type: 'Internet',
  vcid: '',
  pck_chg_dt: moment().add(1, 'day').format('YYYY-MM-DD'),
  pckg: '',
  android_id: '',
  device_id: '',
  crdt_limit: '',
  data_usg_gb: '',
  operation_type: 'I',
  // bnd_cnty: '',
  // data_cnty: '',
  // voice_cnty: '',
  // dtfup_100_cnt: '',
}

// console.log(Object.keys(initialState).length)

const Service = () => {
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  var formatedDate = moment().format('YYYY-MM-DD')
  const nextDay = moment().add(1, 'day').format('YYYY-MM-DD')
  var nextyr_date = moment().add('days', 365).format('YYYY-MM-DD')

  // var new_date = moment().add('days', 365).format('YYYY-MM-DD')
  // console.log('new_date', new_date)
  const handleSubmit = (event) => {
    // const form = event.currentTarget
    // console.log('FORM', form.checkValidity())
    // if (form.checkValidity() === false) {
    // }
    // event.preventDefault()
    // event.stopPropagation()
    // // setValidated(true)
    // console.log(formData)
    // console.log('RANNN')
    // npx json-server --watch db.json --port 8000
    const form = event.currentTarget
    // console.log('FORM', form.checkValidity())
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()
    setValidated(true)
    // console.log('Service-formData', formData)
    if (
      formData.si &&
      // formData.si_lob &&
      formData.cust_ac_no
      // formData.imei.length === 15 &&
      // formData.imsi.length === 15
    ) {
      if (formData.si_lob === 'DTH') {
        formData.imei = ''
        formData.imsi = ''
        formData.type_lte = ''
        formData.dev_chng_dt = ''
        formData.sim_type = ''
        formData.hndst_4g = ''
        formData.ir_region = ''
        formData.ir_act = ''
        dispatch(createService(formData))
        setVisible(true)
        return
      } else if (formData.si_lob === 'Telemedia') {
        formData.imei = ''
        formData.imsi = ''
        formData.type_lte = ''
        formData.dev_chng_dt = ''
        formData.sim_type = ''
        formData.hndst_4g = ''
        formData.ir_region = ''
        formData.ir_act = ''
        dispatch(createService(formData))
        setVisible(true)
        return
      } else if (formData.si_lob === 'Prepaid' || formData.si_lob === 'Postpaid') {
        if (formData.imei.length > 0 || formData.imsi.length > 0) {
          if (
            (formData.imei.length === 15 && formData.imsi.length === 0) ||
            (formData.imei.length === 0 && formData.imsi.length === 15) ||
            (formData.imei.length === 15 && formData.imsi.length === 15)
          ) {
            formData.stb_type = ''
            formData.pck_chg_dt = ''
            formData.dev_chng_dt = ''
            dispatch(createService(formData))
            setVisible(true)
          } else {
            toast.error('Please Enter 15 Digit IMEI/IMSI  Number')
          }
        } else {
          formData.stb_type = ''
          formData.pck_chg_dt = ''
          formData.dev_chng_dt = ''
          dispatch(createService(formData))
          setVisible(true)
        }
      }
      // else if (formData.si_lob === 'Postpaid') {
      //   if (formData.imei.length !== 15 && formData.imsi.length !== 15) {
      //     toast.error('Please fill requred field')
      //   } else {
      //     formData.stb_type = ''
      //     formData.pck_chg_dt = ''
      //     formData.dev_chng_dt = ''
      //     dispatch(createService(formData))
      //     setVisible(true)
      //     return
      //   }
      // }
      // formData.si_deact_date = moment(formData.si_deact_date).format('DD-MM-YYYY')
      // formData.pck_chg_dt = moment(formData.pck_chg_dt).format('DD-MM-YYYY')
      // formData.dev_chng_dt = moment(formData.dev_chng_dt).format('DD-MM-YYYY')
      // formData.si_create_date = moment(formData.si_create_date).format('DD-MM-YYYY')
      // formData.si_act_date = moment(formData.si_act_date).format('DD-MM-YYYY')
      // formData.firstcall_date = moment(formData.firstcall_date).format('DD-MM-YYYY')
    } else {
      toast.error('Please fill requred field')
    }
  }

  // React.useEffect(() => {
  //   if (formData.si_lob === 'Prepaid') {
  //     formData.imei = '812001001001001'
  //     formData.imsi = '810010001000100'
  //   }
  // }, [formData])

  const handleFormData = (e) => {
    // console.log(e.target.value)
    // console.log(e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <>
      <CModal alignment="center" visible={false} onClose={() => setVisible(false)}>
        <div
          style={{
            height: '150px',
          }}
        >
          <CModalHeader onClose={() => setVisible(false)}>
            {/* <CModalTitle>Modal title</CModalTitle> */}
          </CModalHeader>
          <div className="text-center">
            <CModalBody>The Form Data has been saved successfully</CModalBody>
          </div>
          {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter> */}
        </div>
      </CModal>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            {/* <CCardHeader>
              
              Create Service
            </CCardHeader> */}
            <div className="row">
              {/* <div className="col">
                <img className="header-icon" src={airtel} alt="" />
              </div> */}
              <div
                className="col d-flex text-center align-items-center justify-content-center py-2"
                style={{ flexDirection: 'column' }}
              >
                <h1>Talk Talk Telco Demo</h1>
                <h2>Create Service</h2>
              </div>
              {/* <div className="col text-end">
                <img className="header-icon" src={airtel} alt="" />
              </div> */}
            </div>
            <CCardBody>
              <DocsExample href="">
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="si">
                      Service <b style={{ color: 'red' }}>*</b>
                    </CFormLabel>
                    <CFormInput onChange={handleFormData} name="si" type="text" id="si" required />
                    <CFormFeedback invalid>Please provide a Service.</CFormFeedback>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="si_lob">Line Of Business</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="si_lob"
                      id="si_lob"
                      onChange={handleFormData}
                    >
                      {lineOfBusiness.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Please provide a Service Line Of Business.
                    </CFormFeedback>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_ac_no">
                      Customer Account Number <b style={{ color: 'red' }}>*</b>
                    </CFormLabel>
                    <CFormInput
                      onChange={handleFormData}
                      name="cust_ac_no"
                      id="cust_ac_no"
                      required
                      value={
                        formData &&
                        formData.cust_ac_no &&
                        formData.cust_ac_no.replace(/[^0-9]/g, '')
                      }
                    />
                    <CFormFeedback invalid>Please provide a Customer Account Number.</CFormFeedback>
                  </CCol>

                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="si_act_date">Service Activation Date</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="si_act_date"
                      id="si_act_date"
                      type="date"
                      defaultValue={formatedDate}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="si_deact_date">Service Deactivation Date</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="si_deact_date"
                      id="si_deact_date"
                      type="date"
                      defaultValue={nextyr_date}
                    />
                  </CCol>
                  <CCol hidden lg={3} md={6}>
                    <CFormLabel htmlFor="firstcall_date">First Call Date</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="firstcall_date"
                      id="firstcall_date"
                      type="date"
                      // defaultValue={formatedDate}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="si_create_date">Service Create Date</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="si_create_date"
                      id="si_create_date"
                      type="date"
                      defaultValue={formatedDate}
                    />
                  </CCol>
                  <CCol hidden={formData.si_lob === 'DTH' ? true : false} lg={3} md={6}>
                    <CFormLabel htmlFor="type_lte">Type LTE</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      onChange={handleFormData}
                      name="type_lte"
                      id="type_lte"
                    >
                      {typeLTE.map((item) => {
                        return (
                          <>
                            <option value={formData.si_lob === 'DTH' ? '' : item.value}>
                              {item.name}
                            </option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="si_sts">SI Status</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      // onChange={handleFormData}
                      name="si_sts"
                      id="si_sts"
                      value="Active"
                      readOnly
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="circle"> Circle</CFormLabel>
                    {/* <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="circle"
                      id="circle"
                    /> */}
                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      onChange={handleFormData}
                      name="circle"
                      id="circle"
                    >
                      {circle.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="barr_reason"> Barring Reason</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="barr_reason"
                      id="barr_reason"
                    />
                  </CCol>
                  {/* <CCol xs={6}>
                    <CFormLabel htmlFor="curr_stts"> Curr Stts</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="curr_stts"
                      id="curr_stts"
                    />
                  </CCol> */}
                  <CCol hidden={formData.si_lob === 'DTH' ? true : false} lg={3} md={6}>
                    <CFormLabel htmlFor="ekycready">E KYC</CFormLabel>
                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      onChange={handleFormData}
                      name="ekycready"
                      id="ekycready"
                    >
                      {eKyc.map((item) => {
                        return (
                          <>
                            <option value={formData.si_lob === 'DTH' ? '' : item.value}>
                              {item.name}
                            </option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="volteflag">Volte</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="volteflag"
                      id="volteflag"
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="vipflag">VIP</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="vipflag"
                      id="vipflag"
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'Prepaid' || formData.si_lob === 'DTH' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="dnd">Do Not Disturb</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="dnd"
                      id="dnd"
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="imsi">IMSI</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="imsi"
                      id="imsi"
                      maxLength={15}
                      value={formData.imsi.replace(/[^0-9]/g, '')}
                      placeholder="Enter 15 digit Number"
                      // valid={formData.imei.length === 15}
                    />
                    {/* {validated && formData.imsi.length < 15 && (
                      <p style={{ fontSize: '14px', color: '#e55353' }}>
                        Please provide 15 digit IMSI Number.
                      </p>
                    )} */}
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="imei">IMEI</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="imei"
                      id="imei"
                      maxLength={15}
                      value={formData.imei.replace(/[^0-9]/g, '')}
                      placeholder="Enter 15 digit Number"
                      // valid={formData.imei.length === 15}
                    />
                    {/* {validated && formData.imei.length < 15 && (
                      <p style={{ fontSize: '14px', color: '#e55353' }}>
                        Please provide 15 digit IMEI Number.
                      </p>
                    )} */}
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'Prepaid' || formData.si_lob === 'Postpaid' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="dev_chng_dt">Device Change Date</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="dev_chng_dt"
                      id="dev_chng_dt"
                      type="date"
                      defaultValue={
                        formData.si_lob === 'Prepaid' || formData.si_lob === 'Postpaid'
                          ? ''
                          : formatedDate
                      }
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="sim_no">SIM Number</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="sim_no"
                      id="sim_no"
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="sim_type">SIM Type</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      onChange={handleFormData}
                      name="sim_type"
                      id="sim_type"
                    >
                      {simType.map((item) => {
                        return (
                          <>
                            <option
                              value={
                                formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia'
                                  ? ''
                                  : item.value
                              }
                            >
                              {item.name}
                            </option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="sim_slot_pref">SIM Slot Preference</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="sim_slot_pref"
                      id="sim_slot_pref"
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="hndst_4g">Network Type</CFormLabel>
                    {/* <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="hndst_4g"
                      id="hndst_4g"
                    /> */}

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      onChange={handleFormData}
                      name="hndst_4g"
                      id="hndst_4g"
                    >
                      {networkType.map((item) => {
                        return (
                          <>
                            <option
                              value={
                                formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia'
                                  ? ''
                                  : item.value
                              }
                            >
                              {item.name}
                            </option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel
                      htmlFor="ir_bndle"
                      style={
                        formData.si_lob === 'Postpaid'
                          ? { marginBottom: '33px' }
                          : { marginBottom: '0px' }
                      }
                    >
                      International Roaming Bundle
                    </CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="ir_bndle"
                      id="ir_bndle"
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel
                      htmlFor="ir_region"
                      style={
                        formData.si_lob === 'Prepaid' || formData.si_lob === 'Postpaid'
                          ? { marginBottom: '33px' }
                          : { marginBottom: '0px' }
                      }
                    >
                      International Roaming Region
                    </CFormLabel>
                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="ir_region"
                      id="ir_region"
                      onChange={handleFormData}
                    >
                      {internationalRoamingRegion.map((item) => {
                        return (
                          <>
                            <option
                              value={
                                formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia'
                                  ? ''
                                  : item.value
                              }
                            >
                              {item.name}
                            </option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Telemedia' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="ir_act" style={{ height: '48px' }}>
                      International Roaming Activation Date
                    </CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="ir_act"
                      id="ir_act"
                      type="date"
                      value={formData.ir_act}
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'Prepaid' ||
                      formData.si_lob === 'Postpaid' ||
                      formData.si_lob === 'Telemedia'
                        ? true
                        : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="stbid">STB ID</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="stbid"
                      id="stbid"
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'Prepaid' ||
                      formData.si_lob === 'Postpaid' ||
                      formData.si_lob === 'Telemedia'
                        ? true
                        : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="stb_type">STB Type</CFormLabel>
                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      onChange={handleFormData}
                      name="stb_type"
                      id="stb_type"
                    >
                      {STBType.map((item) => {
                        return (
                          <>
                            <option
                              value={
                                formData.si_lob === 'Prepaid' ||
                                formData.si_lob === 'Postpaid' ||
                                formData.si_lob === 'Telemedia'
                                  ? ''
                                  : item.value
                              }
                            >
                              {item.name}
                            </option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'Prepaid' ||
                      formData.si_lob === 'Postpaid' ||
                      formData.si_lob === 'Telemedia'
                        ? true
                        : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="vcid">VC ID</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="vcid"
                      id="vcid"
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'Prepaid' || formData.si_lob === 'Postpaid' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="pck_chg_dt">Package Change Date</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="pck_chg_dt"
                      id="pck_chg_dt"
                      type="date"
                      defaultValue={
                        formData.si_lob === 'Prepaid' || formData.si_lob === 'Postpaid'
                          ? ''
                          : nextDay
                      }
                    />
                  </CCol>
                  <CCol
                    hidden={
                      formData.si_lob === 'Prepaid' || formData.si_lob === 'Postpaid' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel htmlFor="pckg">Package</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="pckg"
                      id="pckg"
                    />
                  </CCol>
                  {formData.si_lob === 'Telemedia' ? (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="device_id">Device ID</CFormLabel>

                      <CFormInput
                        style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                        onChange={handleFormData}
                        name="device_id"
                        id="device_id"
                      />
                    </CCol>
                  ) : (
                    <CCol
                      hidden={
                        formData.si_lob === 'Prepaid' || formData.si_lob === 'Postpaid'
                          ? true
                          : false
                      }
                      lg={3}
                      md={6}
                    >
                      <CFormLabel htmlFor="android_id">Andriod ID</CFormLabel>

                      <CFormInput
                        style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                        onChange={handleFormData}
                        name="android_id"
                        id="android_id"
                      />
                    </CCol>
                  )}

                  <CCol
                    hidden={
                      formData.si_lob === 'DTH' || formData.si_lob === 'Prepaid' ? true : false
                    }
                    lg={3}
                    md={6}
                  >
                    <CFormLabel
                      htmlFor="crdt_limit"
                      style={
                        formData.si_lob === 'Postpaid'
                          ? { marginBottom: '33px' }
                          : { marginBottom: '0px' }
                      }
                    >
                      Credit Limit
                    </CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="crdt_limit"
                      id="crdt_limit"
                    />
                  </CCol>
                  <CCol hidden={formData.si_lob === 'DTH' ? true : false} lg={3} md={6}>
                    <CFormLabel
                      htmlFor="data_usg_gb"
                      style={
                        formData.si_lob === 'Prepaid'
                          ? { marginBottom: '33px' }
                          : { marginBottom: '0px' }
                      }
                    >
                      Data Limit
                    </CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="data_usg_gb"
                      id="data_usg_gb"
                    />
                  </CCol>

                  <CCol xs={12}>
                    <CButton type="submit">Create/Update Service</CButton>
                  </CCol>
                </CForm>
              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Service
