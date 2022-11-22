const serviceReducer = (
  state = { isLoading: true, serviceData: [], statusMessage: '' },
  action,
) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true }
    case 'END_LOADING':
      return { ...state, isLoading: false }
    case 'FETCH_ALL_SERVICE':
      return {
        ...state,
        serviceData: action.payload,
      }
    case 'FETCH_SERVICE_BY_SEARCH':
      return {
        ...state,
        serviceData: action.payload,
        statusMessage: action.message,
        // serviceData: state.serviceData.filter((data) => data[searchTerm] === cData[searchTerm]),
      }
    default:
      return state
  }
}

export default serviceReducer
