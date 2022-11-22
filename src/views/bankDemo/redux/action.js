import {
  CREATE_CUSTOMER_REQ,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
  CREATE_ACCOUNT_REQ,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  CREATE_CARD_REQ,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_FAIL,
  DELETE_CUSTOMER_REQ,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  DELETE_ACCOUNT_REQ,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  DELETE_CARD_REQ,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAIL,
} from './constants'
import * as api from '../../../api'
import { toast } from 'react-toastify'

export const createBankCustomer = (sendData) => async (dispatch) => {
  // console.log(sendData, 'sendData')

  const data = {
    ...sendData,
    customerKYCDate: sendData.customerKYC === 'No' ? '' : sendData.customerKYCDate,
    customerFATCADate: sendData.customerFATCA === 'No' ? '' : sendData.customerFATCADate,
  }

  try {
    dispatch({ type: CREATE_CUSTOMER_REQ })
    await api.createBankCustomerDataReq(data)

    dispatch({ type: CREATE_CUSTOMER_SUCCESS })
    toast.success('Record submitted successfully!')
  } catch (e) {
    toast.error('Something went wrong!')
    dispatch({ type: CREATE_CUSTOMER_FAIL })
  }
}

export const createBankAccount = (sendData) => async (dispatch, getState) => {
  const data = {
    ...sendData,
    cardNumber: sendData.cardIssued === 'No' ? '' : sendData.cardNumber,
  }

  try {
    dispatch({ type: CREATE_ACCOUNT_REQ })
    await api.createBankAccountReq(data)

    dispatch({ type: CREATE_ACCOUNT_SUCCESS })
    toast.success('Record submitted successfully!')
  } catch (e) {
    toast.error('Something went wrong!')
    dispatch({ type: CREATE_ACCOUNT_FAIL })
  }
}

export const createBankCard = (sendData) => async (dispatch, getState) => {
  const data = {
    ...sendData,
  }

  try {
    dispatch({ type: CREATE_CARD_REQ })
    await api.createBankCardReq(data)

    dispatch({ type: CREATE_CARD_SUCCESS })
    toast.success('Record submitted successfully!')
  } catch (e) {
    toast.error('Something went wrong!')
    dispatch({ type: CREATE_CARD_FAIL })
  }
}

export const deleteBankCard = (sendData) => async (dispatch, getState) => {
  const data = {
    ...sendData,
  }

  try {
    dispatch({ type: DELETE_CARD_REQ })
    await api.deletBankCardReq(data)

    dispatch({ type: DELETE_CARD_SUCCESS })
    toast.success('Record submitted successfully!')
  } catch (e) {
    toast.error('Something went wrong!')
    dispatch({ type: DELETE_CARD_FAIL })
  }
}

export const deleteBankAccount = (sendData) => async (dispatch, getState) => {
  const data = {
    ...sendData,
  }

  try {
    dispatch({ type: DELETE_ACCOUNT_REQ })
    await api.deletBankAccountReq(data)
    dispatch({ type: DELETE_ACCOUNT_SUCCESS })
    toast.success('Record submitted successfully!')
  } catch (e) {
    toast.error('Something went wrong!')
    dispatch({ type: DELETE_ACCOUNT_FAIL })
  }
}

export const deleteBankCustomer = (sendData) => async (dispatch, getState) => {
  const data = {
    ...sendData,
  }

  try {
    dispatch({ type: DELETE_CUSTOMER_REQ })
    await api.deletBankCustomerDataReq(data)

    dispatch({ type: DELETE_CUSTOMER_SUCCESS })
    toast.success('Record submitted successfully!')
  } catch (e) {
    toast.error('Something went wrong!')
    dispatch({ type: DELETE_CUSTOMER_FAIL })
  }
}

export const getCustomerSecondaryBankSearch = (formData) => async (dispatch, getState) => {
  // let searchTerm = Object.keys(formData).filter((k) => formData[k])
  // searchTerm = searchTerm[0]
  // console.log('getCustomerFormSearch', formData)
  // const { data } = await api.fetchCustomerBySearch(searchTerm, formData[searchTerm])
  const { data } = await api.getBankCustomerSecondarySearch(formData)

  dispatch({
    type: 'FETCH_BANK_CUSTOMER_BY_SEARCH',
    payload: data.res,
    message: data.status_info,
  })
}

export const getCustomerPrimaryBankSearch = (formData) => async (dispatch, getState) => {
  // const { cust_ac_no } = formData
  // console.log('getCustomerSearch', formData)
  // const { data } = await api.fetchCustomerBySearch('cust_ac_no', cust_ac_no)
  const { data } = await api.getBankCustomerPrimaySearch(formData)
  // console.log(data, 'data')

  dispatch({
    type: 'FETCH_BANK_CUSTOMER_BY_SEARCH',
    payload: data.res,
    message: data.status_info,
  })
}

export const getAccountSecondaryBankSearch = (formData) => async (dispatch, getState) => {
  // let searchTerm = Object.keys(formData).filter((k) => formData[k])
  // searchTerm = searchTerm[0]
  // console.log('getCustomerFormSearch', formData)
  // const { data } = await api.fetchCustomerBySearch(searchTerm, formData[searchTerm])
  const { data } = await api.getBankAccountSecondarySearch(formData)

  dispatch({
    type: 'FETCH_BANK_ACCOUNT_BY_SEARCH',
    payload: data.res,
    message: data.status_info.message,
  })
}

export const getAccountPrimaryBankSearch = (formData) => async (dispatch, getState) => {
  // const { cust_ac_no } = formData
  // console.log('getCustomerSearch', formData)
  // const { data } = await api.fetchCustomerBySearch('cust_ac_no', cust_ac_no)
  const { data } = await api.getBankAccountPrimarySearch(formData)
  // console.log(data, 'data')

  dispatch({
    type: 'FETCH_BANK_ACCOUNT_BY_SEARCH',
    payload: data.res,
    message: data.status_info.message,
  })
}

export const getCardSecondaryBankSearch = (formData) => async (dispatch, getState) => {
  // let searchTerm = Object.keys(formData).filter((k) => formData[k])
  // searchTerm = searchTerm[0]
  // console.log('getCustomerFormSearch', formData)
  // const { data } = await api.fetchCustomerBySearch(searchTerm, formData[searchTerm])
  const { data } = await api.getBankCardSecondorySearch(formData)

  dispatch({
    type: 'FETCH_BANK_CARD_BY_SEARCH',
    payload: data.res,
    message: data.status_info.message,
    status_code: data.status_info.code,
  })
}

export const getCardPrimaryBankSearch = (formData) => async (dispatch, getState) => {
  // const { cust_ac_no } = formData
  // console.log('getCustomerSearch', formData)
  // const { data } = await api.fetchCustomerBySearch('cust_ac_no', cust_ac_no)
  const { data } = await api.getBankCardPrimarySearch(formData)

  dispatch({
    type: 'FETCH_BANK_CARD_BY_SEARCH',
    payload: data.res,
    message: data.status_info.message,
    status_code: data.status_info.code,
  })
}
