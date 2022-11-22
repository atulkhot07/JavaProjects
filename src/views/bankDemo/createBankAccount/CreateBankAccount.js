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
import './CreateBankAccount.css'
import moment from 'moment'
import { DocsExample } from 'src/components'
import { useDispatch } from 'react-redux'
import { createBankAccount } from '../redux/action'
import {
  acc_type,
  acc_status,
  acc_is_pri,
  card_issued,
} from '../configBank/configCreateBankAccount'
import { toast } from 'react-toastify'

const CreateBankAccount = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    acc_num: '',
    cust_id: '',
    acc_opn_date: moment().format('YYYY-MM-DD'),
    acc_type: 'Savings Account',
    acc_bal: '',
    acc_status: 'Active',
    acc_roi: '',
    acc_branch: '',
    acc_is_pri: 'No',
    card_issued: 'No',
    card_number: '',
    rel_mang_nm: '',
    rel_mang_em: '',
    rel_mang_ph: '',
    operation_type: 'I',
  })
  const [validated, setValidated] = useState(false)

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
    // event.stopPropagation()
    event.preventDefault()

    setValidated(true)

    if (formData.acc_num !== '' && formData.cust_id !== '') {
      if (formData.card_issued === 'No') {
        formData.card_number = ''
      }
      if (formData.acc_is_pri === 'No') {
        formData.rel_mang_nm = ''
        formData.rel_mang_em = ''
        formData.rel_mang_ph = ''
      }
      dispatch(createBankAccount(formData))
    } else {
      toast.error('Please fill Mandatory Account Number and Customer ID field')
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
              <h2>Account</h2>
            </div>

            <CCardBody>
              <DocsExample href="">
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  {/*---- Account Number ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="acc_num">
                      Account Number <b style={{ color: 'red' }}>*</b>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      name="acc_num"
                      onChange={handleFormData}
                      value={formData.acc_num.replace(/[^0-9]/g, '')}
                      required
                    />
                    <CFormFeedback invalid>You must enter a Account Number</CFormFeedback>
                  </CCol>
                  {/*---- Customer ID ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_id">
                      Customer ID <b style={{ color: 'red' }}>*</b>
                    </CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      type="text"
                      name="cust_id"
                      id="cust_id"
                      onChange={handleFormData}
                      value={formData.cust_id.replace(/[^0-9]/g, '')}
                    />
                  </CCol>
                  {/*---- Account Open Date ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="acc_opn_date">Account Open Date</CFormLabel>
                    <CFormInput
                      style={{
                        borderColor: '#b1b7c1',
                        backgroundImage: 'none',
                        paddingRight: '8px',
                      }}
                      onChange={handleFormData}
                      name="acc_opn_date"
                      type="date"
                      id="acc_opn_date"
                      defaultValue={formatedCurrentDate}
                    />
                  </CCol>
                  {/*---- Account Type ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="acc_type">Account Type</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="acc_type"
                      id="acc_type"
                      onChange={handleFormData}
                    >
                      {acc_type.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  {/*---- Account Balance ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="acc_bal">Account Balance</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      type="text"
                      name="acc_bal"
                      id="acc_bal"
                      onChange={handleFormData}
                    />
                  </CCol>
                  {/*---- Account Status ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="acc_status">Account Status</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="acc_status"
                      id="acc_status"
                      onChange={handleFormData}
                    >
                      {acc_status.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  {/*---- Account Rate of Interest ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="acc_roi">Rate of Interest (%)</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="acc_roi"
                      id="acc_roi"
                      type="text"
                    />
                  </CCol>
                  {/*---- Account Branch ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="acc_branch">Branch</CFormLabel>
                    <CFormInput
                      style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                      onChange={handleFormData}
                      name="acc_branch"
                      id="acc_branch"
                    />
                  </CCol>
                  {/*---- Account Is Priority ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="acc_is_pri">Priority Account</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="acc_is_pri"
                      id="acc_is_pri"
                      onChange={handleFormData}
                    >
                      {acc_is_pri.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  {/*---- Card Issued ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="card_issued">Card Issued</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="card_issued"
                      id="card_issued"
                      onChange={handleFormData}
                    >
                      {card_issued.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  {/*---- Card Number ------*/}
                  {formData.card_issued === 'Yes' && (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="card_number">Card Number</CFormLabel>
                      <CFormInput
                        style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                        type="text"
                        maxLength={16}
                        name="card_number"
                        id="card_number"
                        onChange={handleFormData}
                        // defaultValue={'1234 5678 9012 3456'}
                        value={formData.card_number.replace(/[^0-9]/g, '')}
                      />
                    </CCol>
                  )}
                  {formData.acc_is_pri === 'Yes' && (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="rel_mang_nm">Relationship Manager Name</CFormLabel>
                      <CFormInput
                        style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                        type="text"
                        name="rel_mang_nm"
                        id="rel_mang_nm"
                        onChange={handleFormData}
                        value={formData.acc_is_pri === 'Yes' ? formData.rel_mang_nm : ''}
                        disabled={formData.acc_is_pri === 'No'}
                      />
                    </CCol>
                  )}

                  {formData.acc_is_pri === 'Yes' && (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="rel_mang_em">Relationship Manager Email</CFormLabel>
                      <CFormInput
                        style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                        type="email"
                        name="rel_mang_em"
                        id="rel_mang_em"
                        onChange={handleFormData}
                        value={formData.acc_is_pri === 'Yes' ? formData.rel_mang_em : ''}
                        disabled={formData.acc_is_pri === 'No'}
                      />
                    </CCol>
                  )}

                  {formData.acc_is_pri === 'Yes' && (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="rel_mang_ph">Relationship Manager PhoneNo</CFormLabel>
                      <CFormInput
                        style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                        type="text"
                        name="rel_mang_ph"
                        id="rel_mang_ph"
                        onChange={handleFormData}
                        value={formData.acc_is_pri === 'Yes' ? formData.rel_mang_ph : ''}
                        disabled={formData.acc_is_pri === 'No'}
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

export default CreateBankAccount
