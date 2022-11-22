const INIT_STATE = {
  isLoading: false,
}

const deleteReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SERVICE_DELETE_REQ':
      return {
        ...state,
        isLoading: true,
      }
    case 'SERVICE_DELETE_SUCCESS':
      return {
        ...state,
        isLoading: false,
      }
    case 'SERVICE_DELETE_FAIL':
      return {
        ...state,
        isLoading: false,
      }

    case 'CUSTOMER_DELETE_REQ':
      return {
        ...state,
        isLoading: true,
      }
    case 'CUSTOMER_DELETE_SUCCESS':
      return {
        ...state,
        isLoading: false,
      }
    case 'CUSTOMER_DELETE_FAIL':
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}

export default deleteReducer
