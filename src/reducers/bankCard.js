const bankCardReducer = (
  state = { isLoading: true, cardData: [], statusMessage: '', statusCode: 0 },
  action,
) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true }
    case 'END_LOADING':
      return { ...state, isLoading: false }
    case 'FETCH_BANK_ALL_CARD':
      //   console.log('postReducer', action.payload)
      return {
        ...state,
        cardData: action.payload,
        statusMessage: action.message,
      }
    case 'FETCH_BANK_CARD_BY_SEARCH':
      return {
        ...state,
        cardData: action.payload,
        statusMessage: action.message,
        statusCode: action.status_code,
      }
    default:
      return state
  }
}

export default bankCardReducer
