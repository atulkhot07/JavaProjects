import axios from 'axios'
import { serviceDeleteReq } from '../api'
import { toast } from 'react-toastify'
import { customerDeleteReq } from '../api/index'

export const serviceDelete = (sendData) => async (dispatch) => {
  dispatch({ type: 'SERVICE_DELETE_REQ' })

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const data = {
    si: sendData.si,
    operation_type: sendData.operation_type,
  }

  try {
    const res = await serviceDeleteReq(data)
    if (res) {
      dispatch({ type: 'SERVICE_DELETE_SUCCESS' })
      toast.success('Record deleted successfully!')
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: 'SERVICE_DELETE_FAIL' })
    toast.error('Something went wrong!')
  }
}

export const customerDelete = (sendData) => async (dispatch) => {
  dispatch({ type: 'CUSTOMER_DELETE_REQ' })

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const data = {
    cust_ac_no: sendData.cust_ac_no,
    operation_type: sendData.operation_type,
  }

  try {
    const res = await customerDeleteReq(data)
    if (res) {
      dispatch({ type: 'CUSTOMER_DELETE_SUCCESS' })
      toast.success('Record deleted successfully!')
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: 'CUSTOMER_DELETE_FAIL' })
    toast.error('Something went wrong!')
  }
}
