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

const INIT_STATE = {
  loading: false,
}
const bankDemoReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_CUSTOMER_REQ:
      return {
        ...state,
        loading: true,
      }
    case CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case CREATE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
      }
    case CREATE_ACCOUNT_REQ:
      return {
        ...state,
        loading: true,
      }
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case CREATE_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
      }
    case CREATE_CARD_REQ:
      return {
        ...state,
        loading: true,
      }
    case CREATE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case CREATE_CARD_FAIL:
      return {
        ...state,
        loading: false,
      }
    case DELETE_CUSTOMER_REQ:
      return {
        ...state,
        loading: true,
      }
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
      }
    case DELETE_ACCOUNT_REQ:
      return {
        ...state,
        loading: true,
      }
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
      }
    case DELETE_CARD_REQ:
      return {
        ...state,
        loading: true,
      }
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case DELETE_CARD_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default bankDemoReducer
