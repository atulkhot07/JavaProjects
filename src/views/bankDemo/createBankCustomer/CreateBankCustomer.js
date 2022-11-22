import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CRow,
  CFormSelect,
} from '@coreui/react'
import './CreateBankCustomer.css'
import moment from 'moment'
import { DocsExample } from 'src/components'
import { useDispatch } from 'react-redux'
import { createBankCustomer } from '../redux/action'
import {
  gender,
  category,
  cust_kyc,
  cust_fatca,
  Salutation,
} from '../configBank/configCreateBankCustomer'
import { toast } from 'react-toastify'
import { isEmail } from '../utils'

const CreateBankCustomer = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    cust_id: '',
    cust_name: '',
    prename: 'Mr',
    fname: '',
    lname: '',
    cust_dob: moment('01-01-2000').format('YYYY-MM-DD'),
    cust_email: '',
    cust_phone: '',
    cust_gender: 'Male',
    cust_add: '',
    cust_pan: '',
    cust_act_dt: moment().format('YYYY-MM-DD'),
    cust_cat: 'Retail',
    cust_kyc: 'No',
    cust_kyc_dt: '',
    cust_fatca: 'No',
    cust_ftc_dt: '',
    operation_type: 'I',
  })
  const [validated, setValidated] = useState(false)

  const formatedDate = moment('01-01-2000').format('YYYY-MM-DD')
  const formatedCurrentDate = moment().format('YYYY-MM-DD')

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()

    // formData.cust_name = `${formData.cust_prename}. ${formData.cust_fname} ${formData.cust_lname}`

    setValidated(true)
    if (
      formData.cust_id !== '' &&
      formData.cust_pan !== '' &&
      formData.lname !== '' &&
      formData.fname !== '' &&
      formData.prename !== ''
    ) {
      if (formData.cust_email !== '') {
        if (!isEmail(formData.cust_email)) {
          toast.error('Please provide valid Email Format')
        } else {
          if (formData.cust_kyc === 'Yes') {
            formData.cust_kyc_dt = moment().format('YYYY-MM-DD')
          } else {
            formData.cust_kyc_dt = ''
          }

          if (formData.cust_fatca === 'Yes') {
            formData.cust_ftc_dt = moment().format('YYYY-MM-DD')
          } else {
            formData.cust_ftc_dt = ''
          }

          dispatch(createBankCustomer(formData))
        }
      } else {
        if (formData.cust_kyc === 'Yes') {
          formData.cust_kyc_dt = moment().format('YYYY-MM-DD')
        } else {
          formData.cust_kyc_dt = ''
        }

        if (formData.cust_fatca === 'Yes') {
          formData.cust_ftc_dt = moment().format('YYYY-MM-DD')
        } else {
          formData.cust_ftc_dt = ''
        }

        console.log(formData, 'formdata')

        dispatch(createBankCustomer(formData))
      }
    } else {
      toast.error('Please fill mandatory Customer ID, Customer Name, Customer Pan fields')
    }
  }

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            {/*---- Create Customer Title ------*/}
            <div
              className="col d-flex text-center align-items-center justify-content-center py-2"
              style={{ flexDirection: 'column' }}
            >
              <h1>My Bank Demo</h1>
              <h2>Customer</h2>
            </div>

            <CCardBody>
              <DocsExample href="">
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  {/*---- Customer ID ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_id">
                      Customer ID <b style={{ color: 'red' }}>*</b>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      name="cust_id"
                      onChange={handleFormData}
                      value={formData.cust_id.replace(/[^0-9]/g, '')}
                      required
                    />
                    <CFormFeedback invalid>You must enter a Customer ID</CFormFeedback>
                  </CCol>
                  {/*---- Customer Name ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="prename">Salutation</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="prename"
                      id="prename"
                      onChange={handleFormData}
                    >
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
                    <CFormLabel htmlFor="fname">
                      First Name <b style={{ color: 'red' }}>*</b>
                    </CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      type="text"
                      name="fname"
                      id="fname"
                      onChange={handleFormData}
                    />
                  </CCol>
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="lname">
                      Last Name <b style={{ color: 'red' }}>*</b>
                    </CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      type="text"
                      name="lname"
                      id="lname"
                      onChange={handleFormData}
                    />
                  </CCol>
                  {/*---- Date of Birth ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_dob">Date of Birth</CFormLabel>
                    <CFormInput
                      style={{
                        borderColor: '#b1b7c1',
                        backgroundImage: 'none',
                        paddingRight: '8px',
                      }}
                      onChange={handleFormData}
                      name="cust_dob"
                      id="cust_dob"
                      type="date"
                      defaultValue={formatedDate}
                    />
                  </CCol>
                  {/*---- Email ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_email">Email</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="cust_email"
                      id="cust_email"
                      type="email"
                    />
                  </CCol>
                  {/*---- Phone Number ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_phone">Phone Number</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="cust_phone"
                      id="cust_phone"
                    />
                  </CCol>
                  {/*---- Gender ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_gender">Gender</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="cust_gender"
                      id="cust_gender"
                      onChange={handleFormData}
                    >
                      {gender.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  {/*---- Customer Address ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_add">Address</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      type="text"
                      name="cust_add"
                      id="cust_add"
                      onChange={handleFormData}
                    />
                  </CCol>
                  {/*---- Customer PAN ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_pan">
                      PAN Number <b style={{ color: 'red' }}>*</b>
                    </CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      type="text"
                      name="cust_pan"
                      id="cust_pan"
                      onChange={handleFormData}
                    />
                  </CCol>
                  {/*---- Customer Activation Date ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_act_dt">Date of Activation</CFormLabel>
                    <CFormInput
                      style={{
                        borderColor: '#b1b7c1',
                        backgroundImage: 'none',
                        paddingRight: '8px',
                      }}
                      onChange={handleFormData}
                      name="cust_act_dt"
                      type="date"
                      id="cust_act_dt"
                      defaultValue={formatedCurrentDate}
                    />
                  </CCol>
                  {/*---- Cusotmer Category ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_cat">Category</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="cust_cat"
                      id="cust_cat"
                      onChange={handleFormData}
                    >
                      {category.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  {/*---- Customer KYC ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_kyc">KYC</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="cust_kyc"
                      id="cust_kyc"
                      onChange={handleFormData}
                    >
                      {cust_kyc.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  {/*---- Customer KYC Date ------*/}

                  {formData.cust_kyc === 'Yes' && (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="cust_kyc_dt">KYC Date</CFormLabel>
                      <CFormInput
                        style={{
                          borderColor: '#b1b7c1',
                          backgroundImage: 'none',
                          paddingRight: '8px',
                        }}
                        onChange={handleFormData}
                        name="cust_kyc_dt"
                        type="date"
                        id="cust_kyc_dt"
                        defaultValue={formatedCurrentDate}
                      />
                    </CCol>
                  )}

                  {/*---- Customer FATCA ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_fatca">FATCA Done</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="cust_fatca"
                      id="cust_fatca"
                      onChange={handleFormData}
                    >
                      {cust_fatca.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  {/*---- Customer FATCA Date ------*/}
                  {formData.cust_fatca === 'Yes' && (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="cust_ftc_dt">FATCA Date</CFormLabel>
                      <CFormInput
                        style={{
                          borderColor: '#b1b7c1',
                          backgroundImage: 'none',
                          paddingRight: '8px',
                        }}
                        onChange={handleFormData}
                        name="cust_ftc_dt"
                        type="date"
                        id="cust_ftc_dt"
                        defaultValue={formatedCurrentDate}
                      />
                    </CCol>
                  )}

                  <CCol xs={12} className="mt-3">
                    <CButton type="submit">Create/Update</CButton>
                  </CCol>
                </CForm>
              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default CreateBankCustomer
