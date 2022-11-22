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
//image
import airtel from './../../../assets/images/Airtel-Icon-.jpg'
import './customer.css'
import { createGenericRightCustomer } from 'src/actions/genericRight'

const initialState = {
  cust_ac_no: '',
  is_b2b_acc: 'n',
  parent_ac_no: '',
  root_ac_no: '',
  org_name: 'Hoonar Tekwurks Pvt Ltd',
  org_type: 'Small Scale',
  prename: 'Mr',
  fname: '',
  mname: '',
  lname: '',
  nationality: 'India',
  email: '',
  gender: 'M',
  rtn: '',
  dob: '01-01-1990',
  pan: '',
  res_addrss: 'Pune',
  cors_addrss: 'Mumbai',
  cust_type: 'Silver',
  cust_class: 'retail',
  cust_seg: 'b2c',
  cust_cat: 'Salaried',
  cust_create_dt: moment().format('DD-MM-YYYY'),
  cust_stts: 'Active',
  cust_act_dt: moment().format('DD-MM-YYYY'),
  cust_deact_dt: '01-01-9999',
  cust_ivr_lang: 'English',
  pref_comm_lang: 'English',
  pref_comm_ch: 'Email',
}

const Customer = () => {
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  var formatedDate = moment().format('dd/mm/yyyy')

  console.log(formatedDate)
  console.log(moment().format('dd-mm-yyyy'), 'datess')

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()
    setValidated(true)
    console.log(formData)
    // createCustomer
    if (formData.cust_ac_no) {
      dispatch(createGenericRightCustomer(formData))
      setVisible(true)
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
              <div className="col d-flex text-center align-items-center justify-content-center py-2">
                <h1>Create Customer Account</h1>
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
                      {' '}
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
                      {/* <option>Salutation</option> */}
                      <option value="y">N</option>
                      <option value="n">Y</option>
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="parent_ac_no">Parent Account Number</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="parent_ac_no"
                      id="parent_ac_no"
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="root_ac_no">Root Account Number</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="root_ac_no"
                      id="root_ac_no"
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
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Miss">Miss.</option>
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
                      defaultValue={'Hoonar Tekwurks Pvt Ltd'}
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
                      <option value="Small Scale">Small Scale</option>
                      <option value="Medium Scale">Medium Scale</option>
                      <option value="Large Scale">Large Scale</option>
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
                      <option value="india">India</option>
                      <option value="australia">Australia</option>
                      <option value="united-states-of-america">United States of America</option>
                      <option value="united-kingdom">United Kingdom</option>
                      <option value="canada">Canada</option>
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
                      <option value="male">Male</option>
                      <option value="female">Female</option>
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
                      defaultValue={'1990-01-01'}
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
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                      <option value="platinum">Platinum</option>
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
                      {/* <option>Salutation</option> */}
                      <option value="retail">Retail</option>
                      <option value="corporate">Corporate</option>
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
                      {/* <option>Salutation</option> */}
                      <option value="b2c">B2C</option>
                      <option value="b2b">B2B</option>
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
                      {/* <option>Salutation</option> */}
                      <option value="salaried">Salaried</option>
                      <option value="business">Business</option>
                      <option value="homemaker">Homemaker</option>
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
                      defaultValue={formatedDate}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_stts">Customer Status</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none', paddingRight: '0' }}
                      onChange={handleFormData}
                      name="cust_stts"
                      id="cust_stts"
                      defaultValue={'Active'}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_act_dt">Customer Activation Date</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none', paddingRight: '0' }}
                      onChange={handleFormData}
                      name="cust_act_dt"
                      type="date"
                      id="cust_act_dt"
                      defaultValue={formatedDate}
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
                      value={'9999-01-01'}
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
                      {/* <option>Salutation</option> */}
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Gujrati">Gujrati</option>
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="pref_comm_lang">
                      Preference Communication Language
                    </CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="pref_comm_lang"
                      id="pref_comm_lang"
                      onChange={handleFormData}
                    >
                      {/* <option>Salutation</option> */}
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Gujrati">Gujrati</option>
                    </CFormSelect>
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="pref_comm_ch">Preference Communication Channel</CFormLabel>

                    <CFormSelect
                      size="md"
                      className="mb-3"
                      aria-label="Small select example"
                      name="pref_comm_ch"
                      id="pref_comm_ch"
                      onChange={handleFormData}
                    >
                      {/* <option>Salutation</option> */}
                      <option value="email">Email</option>
                      <option value="phone">Phone call</option>
                      <option value="sms">Sms Texting</option>
                      <option value="whatsapp">Whats App</option>
                    </CFormSelect>
                  </CCol>

                  <CCol xs={12}>
                    <CButton type="submit">Submit</CButton>
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
