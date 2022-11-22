const suscriberReducer = (
  state = { isLoading: true, suscriberData: [], suscriberBankData: [] },
  action,
) => {
  switch (action.type) {
    case 'FETCH_BY_SUSCRIBER':
      //   console.log('postReducer', action.payload)
      return {
        ...state,
        isLoading: false,
      }
    case 'FETCH_BY_SUSCRIBER_SUCCESS':
      //   console.log('postReducer', action.payload)
      return {
        ...state,
        isLoading: false,
      }
    case 'FETCH_BY_SUSCRIBER_FAILED':
      //   console.log('postReducer', action.payload)
      return {
        ...state,
        isLoading: false,
      }
    case 'GET_BY_SUSCRIBER':
      return {
        ...state,
        suscriberData: action.payload,
        isLoading: false,
      }
    case 'GET_BY_BANK_SUSCRIBER':
      return {
        ...state,
        suscriberBankData: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export default suscriberReducer
