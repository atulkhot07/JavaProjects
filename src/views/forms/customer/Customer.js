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
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CFormFeedback,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsExample } from 'src/components'
import { useDispatch, useSelector } from 'react-redux'

// action
import { createCustomer } from 'src/actions/customer'
//image
import airtel from './../../../assets/images/Airtel-Icon-.jpg'
import './customer.css'
import { toast } from 'react-toastify'
import {
  B2B_Customer,
  Salutation,
  organizationType,
  Nationality,
  Gender,
  customerType,
  customerClass,
  customerSegment,
  customerCategory,
  customerStatus,
  IVRLanguage,
  preferedCommuniacationLanguage,
  preferedCommuniacationChannel,
} from '../configForm/customerFormConfig'

// import mynationality from '..'

const initialState = {
  cust_ac_no: '',
  is_b2b_acc: 'N',
  parent_ac_no: '',
  root_ac_no: '',
  org_name: '',
  org_type: 'None',
  prename: 'Mr',
  fname: '',
  mname: '',
  lname: '',
  nationality: 'India',
  email: '',
  gender: 'Male',
  rtn: '',
  dob: '1990-01-01',
  pan: '',
  res_addrss: 'Pune',
  cors_addrss: 'Mumbai',
  cust_type: 'Silver',
  cust_class: 'Retail',
  cust_seg: 'B2C',
  cust_cat: 'Salaried',
  cust_create_dt: moment().format('YYYY-MM-DD'),
  cust_stts: 'Active',
  cust_act_dt: moment().format('YYYY-MM-DD'),
  cust_deact_dt: '9999-01-01',
  cust_ivr_lang: 'English',
  pref_comm_lang: 'English',
  pref_comm_ch: 'Email',
  operation_type: 'I',
}

export const isEmail = (email = '') => {
  if (!email) {
    email = ''
  }
  const mailformat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.\w{2,10})\s*$/
  if (email.match(mailformat)) {
    if (email.indexOf('+') !== -1) {
      return false
    }
    return true
  }
  return false
}

const Customer = () => {
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  var formatedDate = moment().format('YYYY-MM-DD')

  var dates = new Date().toLocaleDateString()

  // console.log(window.location.port, 'host')

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
    const form = event.currentTarget
    // console.log('FORM', form)
    // console.log('checkValidity', form.checkValidity())
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()
    setValidated(true)
    console.log(formData)
    // createCustomer
    if (formData.cust_ac_no) {
      // formData.dob = moment(formData.dob).format('DD-MM-YYYY')
      // formData.cust_act_dt = moment(formData.cust_act_dt).format('DD-MM-YYYY')
      // formData.cust_deact_dt = moment(formData.cust_deact_dt).format('DD-MM-YYYY')
      // formData.cust_create_dt = moment(formData.cust_create_dt).format('DD-MM-YYYY')
      if (formData.email === '') {
        dispatch(createCustomer(formData))
        setVisible(true)
      } else if (!isEmail(formData.email)) {
        toast.error('Please provide valid Email Format')
      } else {
        // formData.dob = moment(formData.dob).format('DD-MM-YYYY')
        // formData.cust_act_dt = moment(formData.cust_act_dt).format('DD-MM-YYYY')
        // formData.cust_deact_dt = moment(formData.cust_deact_dt).format('DD-MM-YYYY')
        // formData.cust_create_dt = moment(formData.cust_create_dt).format('DD-MM-YYYY')
        dispatch(createCustomer(formData))
        setVisible(true)
      }
    } else {
      toast.error('Please Enter Customer Id')
    }
  }

  const handleFormData = (e) => {
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
        </div>
      </CModal>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <div className="row">
              {/* <div className="col">
                <img className="header-icon" src={airtel} alt="" />
              </div> */}
              <div
                className="col d-flex text-center align-items-center justify-content-center py-2"
                style={{ flexDirection: 'column' }}
              >
                <h1>Talk Talk Telco Demo</h1>
                <h2>Create Customer Account</h2>
              </div>

              {/* <div className="col text-end">
                <img className="header-icon " src={airtel} alt="" />
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
                    <CFormLabel htmlFor="cust_ac_no">
                      Customer Account Number <b style={{ color: 'red' }}>*</b>
                    </CFormLabel>
                    <CFormInput
                      name="cust_ac_no"
                      onChange={handleFormData}
                      type="text"
                      id="cust_ac_no"
                      required
                      value={formData.cust_ac_no.replace(/[^0-9]/g, '')}
                    />
                    <CFormFeedback invalid>Please provide a Customer Account Number.</CFormFeedback>
                  </CCol>

                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="is_b2b_acc">B2B Customer</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="is_b2b_acc"
                      id="is_b2b_acc"
                      onChange={handleFormData}
                    >
                      {B2B_Customer.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="parent_ac_no">Parent Account Number</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="parent_ac_no"
                      id="parent_ac_no"
                      value={formData.parent_ac_no.replace(/[^0-9]/g, '')}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="root_ac_no">Root Account Number</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="root_ac_no"
                      id="root_ac_no"
                      value={formData.root_ac_no.replace(/[^0-9]/g, '')}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="prename">Salutation</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="prename"
                      id="prename"
                      onChange={handleFormData}
                    >
                      {/* <option>Salutation</option> */}
                      {Salutation.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="fname">First Name</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="fname"
                      id="fname"
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="mname">Middle Name</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="mname"
                      id="mname"
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="lname">Last Name</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="lname"
                      id="lname"
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="org_name">Organization Name</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="org_name"
                      id="org_name"
                      value={formData.org_name}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="org_type">Organization Type</CFormLabel>
                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="org_type"
                      id="org_type"
                      onChange={handleFormData}
                    >
                      {/* <option>Salutation</option> */}
                      {/* <option>Salutation</option> */}
                      {organizationType.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>

                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="nationality">Nationality</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="nationality"
                      id="nationality"
                      onChange={handleFormData}
                    >
                      {/* <option>Salutation</option> */}
                      {/* <option>Salutation</option> */}
                      {Nationality.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="email">Email Address</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="email"
                      type="email"
                      id="email"
                      // value={formData.email}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="gender">Gender</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="gender"
                      id="gender"
                      onChange={handleFormData}
                    >
                      {/* <option>Salutation</option> */}
                      {/* <option>Salutation</option> */}
                      {Gender.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="rtn">Contact Number</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="rtn"
                      id="rtn"
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="dob">Date Of Birth</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none', paddingRight: '0' }}
                      onChange={handleFormData}
                      name="dob"
                      type="date"
                      id="dob"
                      Value={formData.dob}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="pan">PAN Number</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="pan"
                      id="pan"
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="res_addrss">Residential Address</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="res_addrss"
                      id="res_addrss"
                      defaultValue={'Pune'}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cors_addrss">Correspondance Address</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="cors_addrss"
                      id="cors_addrss"
                      defaultValue={'Mumbai'}
                    />
                  </CCol>

                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_type">Customer Type</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="cust_type"
                      id="cust_type"
                      onChange={handleFormData}
                    >
                      {/* <option>Salutation</option> */}
                      {customerType.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_class">Customer Class</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="cust_class"
                      id="cust_class"
                      onChange={handleFormData}
                    >
                      {customerClass.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_seg">Customer Segment</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="cust_seg"
                      id="cust_seg"
                      onChange={handleFormData}
                    >
                      {customerSegment.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_cat">Customer Category</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="cust_cat"
                      id="cust_cat"
                      onChange={handleFormData}
                    >
                      {customerCategory.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_create_dt">Customer Creation Date</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none', paddingRight: '0' }}
                      onChange={handleFormData}
                      name="cust_create_dt"
                      type="date"
                      id="cust_create_dt"
                      // defaultValue={formatedDate}
                      value={formData.cust_create_dt}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_stts">Customer Status</CFormLabel>
                    <CFormSelect
                      // style={{ borderColor: '#b1b7c1', backgroundImage: 'none', paddingRight: '0' }}
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="cust_stts"
                      id="cust_stts"
                      onChange={handleFormData}
                    >
                      {customerStatus.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_act_dt">Customer Activation Date</CFormLabel>
                    <CFormInput
                      // style={{ borderColor: '#b1b7c1', backgroundImage: 'none', paddingRight: '0' }}
                      onChange={handleFormData}
                      name="cust_act_dt"
                      type="date"
                      // readOnly={false}
                      id="cust_act_dt"
                      value={formatedDate}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_deact_dt">Customer Deactivation Date</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none', paddingRight: '0' }}
                      onChange={handleFormData}
                      name="cust_deact_dt"
                      type="date"
                      id="cust_deact_dt"
                      defaultValue={'9999-01-01'}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_ivr_lang">IVR Language</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="cust_ivr_lang"
                      id="cust_ivr_lang"
                      onChange={handleFormData}
                    >
                      {IVRLanguage.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="pref_comm_lang">
                      Preferred Communication Language
                    </CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="pref_comm_lang"
                      id="pref_comm_lang"
                      onChange={handleFormData}
                    >
                      {preferedCommuniacationLanguage.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="pref_comm_ch">Preferred Communication Channel</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="pref_comm_ch"
                      id="pref_comm_ch"
                      onChange={handleFormData}
                    >
                      {preferedCommuniacationChannel.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>

                  <CCol xs={12}>
                    <CButton type="submit">Create/Update Customer</CButton>
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

export default Customer
