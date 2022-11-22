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
import './CreateBankCards.css'
import moment from 'moment'
import { DocsExample } from 'src/components'
import { useDispatch } from 'react-redux'
import { createBankCard } from '../redux/action'
import { card_type, card_is_pri, card_network, card_sts } from '../configBank/configCreateBankCards'
import { FormatIndentDecreaseSharp } from '@mui/icons-material'
import { toast } from 'react-toastify'

const CreateBankCards = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    card_num: '',
    cust_id: '',
    card_type: 'Debit',
    card_limit: '',
    crd_curr_bal: '',
    card_is_pri: 'Yes',
    card_network: 'Visa',
    crd_issd_dt: moment().format('YYYY-MM-DD'),
    card_exp_dt: '',
    card_sts: 'Active',
    acc_num: '',
    operation_type: 'I',
  })
  const [validated, setValidated] = useState(false)

  const formatedDate = moment().format('YYYY-MM-DD')

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

    setValidated(true)

    if (formData.card_num !== '' && formData.cust_id !== '') {
      if (formData.card_type !== 'Credit') {
        formData.card_limit = ''
      }
      if (formData.card_type !== 'Debit') {
        formData.acc_num = ''
      }
      if (formData.card_type !== 'Sodexo' && formData.card_type !== 'Prepaid') {
        formData.crd_curr_bal = ''
      }
      if (formData.card_sts === 'Blocked') {
        formData.card_exp_dt = ''
      } else {
        formData.card_exp_dt = moment().add(5, 'years').format('YYYY-MM-DD')
      }
      dispatch(createBankCard(formData))
    } else {
      toast.error('Please fill mandatory Card Numer and Customer ID field')
    }
  }

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            {/*---- Create Cards Title ------*/}
            <div
              className="col d-flex text-center align-items-center justify-content-center py-2"
              style={{ flexDirection: 'column' }}
            >
              <h1>My Bank Demo</h1>
              <h2>Card</h2>
            </div>

            <CCardBody>
              <DocsExample href="">
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  {/*---- Card Number ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="card_num">
                      Card Number <b style={{ color: 'red' }}>*</b>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      name="card_num"
                      onChange={handleFormData}
                      value={formData.card_num.replace(/[^0-9]/g, '')}
                      required
                    />
                    <CFormFeedback invalid>You must enter a Card Number</CFormFeedback>
                  </CCol>
                  {/*---- Customer Id ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="cust_id">
                      Customer Id <b style={{ color: 'red' }}>*</b>
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
                  {/*---- Card Type ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="card_type">Card Type</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="card_type"
                      id="card_type"
                      onChange={handleFormData}
                    >
                      {card_type.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>

                  {formData.card_type === 'Debit' && (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="acc_num">Account Number</CFormLabel>
                      <CFormInput
                        type="text"
                        name="acc_num"
                        onChange={handleFormData}
                        value={formData.card_type === 'Debit' ? formData.acc_num : ''}
                      />
                      <CFormFeedback invalid>You must enter a Card Number</CFormFeedback>
                    </CCol>
                  )}

                  {/*---- Card Limit ------*/}
                  {formData.card_type === 'Credit' && (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="card_limit">Limit</CFormLabel>
                      <CFormInput
                        style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                        onChange={handleFormData}
                        name="card_limit"
                        id="card_limit"
                        value={formData.card_type === 'Credit' ? formData.card_limit : ''}
                        // defaultValue={'500000'}
                        disabled={formData.card_type !== 'Credit'}
                      />
                    </CCol>
                  )}

                  {/*---- Card Current Balance ------*/}
                  {(formData.card_type === 'Sodexo' || formData.card_type === 'Prepaid') && (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="crd_curr_bal">Balance</CFormLabel>
                      <CFormInput
                        style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                        onChange={handleFormData}
                        name="crd_curr_bal"
                        id="crd_curr_bal"
                        value={
                          formData.card_type === 'Sodexo' || formData.card_type === 'Prepaid'
                            ? formData.crd_curr_bal
                            : ''
                        }
                      />
                    </CCol>
                  )}

                  {/*---- Card Is Primary ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="card_is_pri">Primary Card</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="card_is_pri"
                      id="card_is_pri"
                      onChange={handleFormData}
                    >
                      {card_is_pri.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  {/*---- Card Network ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="card_network">Network</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="card_network"
                      id="card_network"
                      onChange={handleFormData}
                    >
                      {card_network.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                  {/*---- Card Issue Date ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="crd_issd_dt">Issue Date</CFormLabel>
                    <CFormInput
                      style={{
                        borderColor: '#b1b7c1',
                        backgroundImage: 'none',
                        paddingRight: '8px',
                      }}
                      onChange={handleFormData}
                      name="crd_issd_dt"
                      id="crd_issd_dt"
                      type="date"
                      defaultValue={formatedDate}
                    />
                  </CCol>
                  {/*---- Card Expiry Date ------*/}
                  {formData.card_sts !== 'Blocked' && (
                    <CCol lg={3} md={6}>
                      <CFormLabel htmlFor="card_exp_dt">Expiry Date</CFormLabel>
                      <CFormInput
                        style={{
                          borderColor: '#b1b7c1',
                          backgroundImage: 'none',
                          paddingRight: '8px',
                        }}
                        onChange={handleFormData}
                        name="card_exp_dt"
                        id="card_exp_dt"
                        type="date"
                        defaultValue={moment(formData.crd_issd_dt, 'YYYY-MM-DD')
                          .add(5, 'years')
                          .format('YYYY-MM-DD')}
                      />
                    </CCol>
                  )}

                  {/*---- Card Status ------*/}
                  <CCol lg={3} md={6}>
                    <CFormLabel htmlFor="card_sts">Status</CFormLabel>
                    <CFormSelect
                      aria-label="Small select example"
                      name="card_sts"
                      id="card_sts"
                      onChange={handleFormData}
                    >
                      {card_sts.map((item) => {
                        return (
                          <>
                            <option value={item.value}>{item.name}</option>
                          </>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
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

export default CreateBankCards
