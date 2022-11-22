import * as api from '../api'
import { toast } from 'react-toastify'

export const getSuscriberData = () => async (dispatch, getState) => {
  // console.log('getCustomerSearch', formData)
  // const { data } = await api.fetchCustomerBySearch('cust_ac_no', cust_ac_no)

  // console.log(data, 'data')
  const { data } = await api.getSuscriberData()

  dispatch({
    type: 'GET_BY_SUSCRIBER',
    payload: data.res,
  })
}

export const getBankSuscriberData = () => async (dispatch, getState) => {
  // console.log('getCustomerSearch', formData)
  // const { data } = await api.fetchCustomerBySearch('cust_ac_no', cust_ac_no)

  // console.log(data, 'data')
  const { data } = await api.getBankSuscriberData()

  dispatch({
    type: 'GET_BY_BANK_SUSCRIBER',
    payload: data.res,
  })
}

export const postSuscriberData = (formData) => async (dispatch, getState) => {
  dispatch({
    type: 'FETCH_BY_SUSCRIBER',
  })
  const data = {
    subcode: formData.sub_id,
    consumer: formData.sub_data,
    lob: formData.lob,
  }

  try {
    await api.postSuscriberData(data)

    dispatch({ type: 'FETCH_BY_SUSCRIBER_SUCCESS' })
    toast.success('Record submitted successfully!')
  } catch (error) {
    console.log(error)
    dispatch({ type: 'FETCH_BY_SUSCRIBER_FAILED' })
    toast.error('Something went wrong!')
  }
  // console.log('getCustomerSearch', formData)
  // const { data } = await api.fetchCustomerBySearch('cust_ac_no', cust_ac_no)
}
