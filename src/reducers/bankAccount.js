const bankAccountReducer = (
  state = { isLoading: true, accountData: [], statusMessage: '' },
  action,
) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true }
    case 'END_LOADING':
      return { ...state, isLoading: false }
    case 'FETCH_BANK_ALL_ACCOUNT':
      //   console.log('postReducer', action.payload)
      return {
        ...state,
        accountData: action.payload,
      }
    case 'FETCH_BANK_ACCOUNT_BY_SEARCH':
      return {
        ...state,
        accountData: action.payload,
        statusMessage: action.message,
      }
    default:
      return state
  }
}

export default bankAccountReducer
