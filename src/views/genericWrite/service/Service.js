import React, { useState, useRef } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'

// action
import './service.css'
import { createGenericRightService } from 'src/actions/genericRight'
import Loader from 'src/commonComponents/Loader'
import { toast } from 'react-toastify'

const initialState = {
  si: '',
  online_video_streamer: '',
  ol_gamer: '',
  online_shopper: '',
  online_music_streamer: '',
  credit_score: '',
  ndnc: '',
  intl_traveller: '',
}

const Service = () => {
  const dispatch = useDispatch()
  const formRef = useRef(null)

  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const { isLoading: serviceLoading } = useSelector((state) => state.genericRight)

  console.log(serviceLoading, 'serviceLoading')

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    event.preventDefault()
    setValidated(true)

    if (formData.si !== '') {
      if (
        formData.online_video_streamer === '' &&
        formData.ol_gamer === '' &&
        formData.online_shopper === '' &&
        formData.online_music_streamer === '' &&
        formData.credit_score === '' &&
        formData.ndnc === '' &&
        formData.intl_traveller === ''
      ) {
        toast.error('Please fill one more field.')
      } else {
        dispatch(createGenericRightService(formData))
        formRef.current.reset()
        setValidated(false)
      }
    }
  }

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <div className="row">
              <div
                className="col d-flex text-center align-items-center justify-content-center py-2"
                style={{ flexDirection: 'column' }}
              >
                <h1>Talk Talk Telco Demo</h1>
                <h2>Generic Write</h2>
              </div>
            </div>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <CCol lg={3} md={6}>
                  <CFormLabel htmlFor="si">Service</CFormLabel>
                  <CFormInput
                    // style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                    onChange={handleFormData}
                    name="si"
                    id="si"
                    required
                  />
                  {validated && formData.si === '' && (
                    <CFormFeedback invalid>Please provide a Service.</CFormFeedback>
                  )}
                </CCol>

                <CCol lg={3} md={6}>
                  <CFormLabel htmlFor="ol_gamer">Online Gamer</CFormLabel>
                  <CFormInput
                    style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                    onChange={handleFormData}
                    name="ol_gamer"
                    id="ol_gamer"
                  />
                </CCol>

                <CCol lg={3} md={6}>
                  <CFormLabel htmlFor="shopper">Online Shopper</CFormLabel>
                  <CFormInput
                    style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                    onChange={handleFormData}
                    name="online_shopper"
                    id="shopper"
                  />
                </CCol>

                <CCol lg={3} md={6}>
                  <CFormLabel htmlFor="streamer">Online Music Streamer</CFormLabel>
                  <CFormInput
                    style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                    onChange={handleFormData}
                    name="online_music_streamer"
                    id="streamer"
                  />
                </CCol>

                <CCol lg={3} md={6}>
                  <CFormLabel htmlFor="video_streamer">Online Video Streamer</CFormLabel>
                  <CFormInput
                    style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                    onChange={handleFormData}
                    name="online_video_streamer"
                    id="video_streamer"
                  />
                </CCol>

                <CCol lg={3} md={6}>
                  <CFormLabel htmlFor="credit_score">Credit Card User</CFormLabel>
                  <CFormInput
                    style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                    onChange={handleFormData}
                    name="credit_score"
                    id="credit_score"
                  />
                </CCol>

                <CCol lg={3} md={6}>
                  <CFormLabel htmlFor="ndnc">NDNC</CFormLabel>
                  <CFormInput
                    style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                    onChange={handleFormData}
                    name="ndnc"
                    id="ndnc"
                  />
                </CCol>

                <CCol lg={3} md={6}>
                  <CFormLabel htmlFor="intl_traveller">International Traveller</CFormLabel>
                  <CFormInput
                    style={{ borderColor: '#b1b7c1', backgroundImage: 'none' }}
                    onChange={handleFormData}
                    name="intl_traveller"
                    id="intl_traveller"
                  />
                </CCol>

                <CCol xs={12}>
                  <CButton type="submit">Submit</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* {serviceLoading && <Loader />} */}
    </>
  )
}

export default Service
