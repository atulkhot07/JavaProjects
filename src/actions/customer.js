import * as api from '../api'
import { toast } from 'react-toastify'

export const createCustomer = (sendData) => {
  return async (dispatch, getState) => {
    // console.log('sendData', sendData)
    // const { si, content, email } = sendData;
    const data = {
      cust_ac_no: sendData.cust_ac_no,
      // acc_lob: sendData.acc_lob,
      is_b2b_acc: sendData.is_b2b_acc,
      parent_ac_no: sendData.parent_ac_no,
      root_ac_no: sendData.root_ac_no,
      org_name: sendData.org_name,
      org_type: sendData.org_type,
      prename: sendData.prename,
      fname: sendData.fname,
      mname: sendData.mname,
      lname: sendData.lname,
      nationality: sendData.nationality,
      email: sendData.email,
      gender: sendData.gender,
      rtn: sendData.rtn,
      dob: sendData.dob,
      pan: sendData.pan,
      res_addrss: sendData.res_addrss,
      cors_addrss: sendData.cors_addrss,
      cust_type: sendData.cust_type,
      cust_class: sendData.cust_class,
      cust_seg: sendData.cust_seg,
      cust_cat: sendData.cust_cat,
      cust_create_dt: sendData.cust_create_dt,
      cust_stts: sendData.cust_stts,
      cust_act_dt: sendData.cust_act_dt,
      cust_deact_dt: sendData.cust_deact_dt,
      cust_ivr_lang: sendData.cust_ivr_lang,
      pref_comm_lang: sendData.pref_comm_lang,
      pref_comm_ch: sendData.pref_comm_ch,
      operation_type: sendData.operation_type,
      // src_lob: sendData.src_lob,
      // source_systm: sendData.source_systm,
    }

    try {
      await api.createCustomerRequest(data)
      toast.success('Record submitted successfully!')
    } catch (e) {
      toast.error('Something went wrong!')
    }
  }
}

// export const getAllCustomer = (formData) => async (dispatch, getState) => {
//   // console.log('formData', formData)
//   const { data } = await api.fetchAllCustomer()
//   // console.log('DATA from getCustomer', data)
//   dispatch({ type: 'FETCH_ALL_CUSTOMER', payload: data })
// }

export const getCustomerFormSearch = (formData) => async (dispatch, getState) => {
  // let searchTerm = Object.keys(formData).filter((k) => formData[k])
  // searchTerm = searchTerm[0]
  // console.log('getCustomerFormSearch', formData)
  // const { data } = await api.fetchCustomerBySearch(searchTerm, formData[searchTerm])
  const { data } = await api.fetchCustomerBySearch(formData)

  dispatch({
    type: 'FETCH_BY_SEARCH',
    payload: data.res,
    message: data.status_info.message,
  })
}
export const getCustomerSearch = (formData) => async (dispatch, getState) => {
  const { cust_ac_no } = formData
  // console.log('getCustomerSearch', formData)
  // const { data } = await api.fetchCustomerBySearch('cust_ac_no', cust_ac_no)
  const { data } = await api.fetchCustomerByAc(formData)
  // console.log(data, 'data')

  dispatch({
    type: 'FETCH_BY_SEARCH',
    payload: data.res,
    message: data.status_info.message,
  })
}
