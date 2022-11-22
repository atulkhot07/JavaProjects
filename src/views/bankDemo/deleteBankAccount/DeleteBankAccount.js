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
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { deleteBankAccount } from '../redux/action'

const DeleteBankAccount = () => {
  const dispatch = useDispatch()
  const initialState = {
    acc_num: '',
    operation_type: 'D',
  }
  const [validated, setValidated] = useState(false)

  const [formData, setFormData] = useState(initialState)

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()
    setValidated(true)
    if (formData.acc_num !== '') {
      dispatch(deleteBankAccount(formData))
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <div className="row">
            <div
              className="col d-flex text-center align-items-center justify-content-center py-2"
              style={{ flexDirection: 'column' }}
            >
              <h1> My Bank Demo</h1>
              <h2>Delete Account Number</h2>
            </div>
          </div>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol xs={12} md={4}>
                <CFormLabel htmlFor="acc_num">Enter Acccount Number</CFormLabel>
                <CFormInput
                  // style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                  onChange={handleFormData}
                  name="acc_num"
                  id="acc_num"
                  required
                  value={formData.acc_num.replace(/[^0-9]/g, '')}
                />
                <CFormFeedback invalid>Please provide a Account number.</CFormFeedback>
              </CCol>

              <CCol xs={12} className="mt-4">
                <CButton type="submit">Submit</CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DeleteBankAccount
