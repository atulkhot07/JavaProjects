const INIT_STATE = {
  isLoading: false,
}

const genericRightReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'CREATE_GEN_RIGHT_REQ':
      return {
        ...state,
        isLoading: true,
      }
    case 'CREATE_GEN_RIGHT_SUCCESS':
      return {
        ...state,
        isLoading: false,
      }
    case 'CREATE_GEN_RIGHT_FAIL':
      return {
        ...state,
        isLoading: false,
      }

    case 'CREATE_GEN_RIGHT_SERVICE_REQ':
      return {
        ...state,
        isLoading: true,
      }
    case 'CREATE_GEN_RIGHT_SERVICE_SUCCESS':
      return {
        ...state,
        isLoading: false,
      }
    case 'CREATE_GEN_RIGHT_SERVICE_FAIL':
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export default genericRightReducer
