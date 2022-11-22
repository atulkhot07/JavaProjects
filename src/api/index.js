import axios from 'axios'

const host = window.location.host
const port = window.location.port

// const url = 'http://10.1.1.60:9004'
//
// const API = axios.create({ baseURL: url })

const GET_URL = port.includes('3026')
  ? 'http://10.1.1.54:13104'
  : host.includes('10.1.1.54')
  ? 'http://10.1.1.54:18104'
  : 'http://10.1.1.31:30104' // for devlopment

const GET_BANK_URL = port.includes('3026')
  ? 'http://10.1.1.60:13105'
  : host.includes('10.1.1.54')
  ? 'http://10.1.1.54:18105'
  : 'http://10.1.1.31:30105'

const CRUD_URL = 'http://10.1.1.31:5113/ht/kafkaProducer/10.1.1.55/9092'

const GET_URL_OS = 'http://10.1.1.81:5117'

export const GENERIC_RIGHT_URL = 'http://localhost:4000'

// export const fetchAllCustomer = () => API.get(`/customer`)
// export const fetchCustomerBySearch = (key, value) => API.get(`/customer?${key}=${value}`)
export const fetchCustomerBySearch = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])
  // console.log(data, 'data')
  let firstTerm = searchTerm[0] // key
  // console.log(firstTerm, 'first')
  let role = searchTerm[searchTerm.length - 1] // key
  const { subs } = data // value
  const roleObj = data && data.subs_name && data.subs_name.toLowerCase()
  const subscriberkey = roleObj[subs]
  // return API.get(`/customer?${key}=${value}`)
  return axios.get(
    `${GET_URL}/v1/telco/customers?${firstTerm}=${data[firstTerm]}&&${roleObj}=${subs}`,
  )
}

export const fetchCustomerByAc = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])
  // let searchu = Object.keys(data)
  // console.log(data, 'data')

  let firstTerm = searchTerm[searchTerm.length - 2] // key
  // console.log(firstTerm, 'vv')
  let role = searchTerm[searchTerm.length - 2] // key
  // console.log(role, 'role')
  const { subs } = data // value
  const roleObj = data && data.subs_name && data.subs_name.toLowerCase()
  // console.log(roleObj, 'roleObj')
  const subscriberkey = roleObj[subs]
  // console.log(data, firstTerm, 'data')

  // return API.get(`/customer?${key}=${value}`)

  return axios.get(`${GET_URL}/v1/telco/customers/${data[firstTerm]}&&${roleObj}=${subs}`)
}

// export const fetchAllService = () => API.get(`/service`)
// export const fetchServiceBySearch = (key, value) => API.get(`/service?${key}=${value}`)
export const fetchServiceBySearch = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])
  let firstTerm = searchTerm[0] // key
  // console.log(firstTerm)

  let role = searchTerm[searchTerm.length - 1] // key
  const { subs } = data // value
  const roleObj = data && data.subs_name && data.subs_name.toLowerCase()
  const subscriberkey = roleObj[subs]
  const config = {
    headers: {
      'Consumer-Code': '5B2CCB7521BC77D4DA64A67CD0E78E92D98F25BE4FFBFAA52E20459A5B2F1068',
    },
  }
  //   return axios.get(`/service?${key}=${value}`)
  if (data.choose_api === 'ai') {
    return axios.get(
      `${GET_URL}/v1/telco/services?${firstTerm}=${data[firstTerm]}&&${roleObj}=${subs}`,
    )
  } else {
    return axios.get(
      `${GET_URL_OS}/v1/telco/services?$lineOfBusiness=${subs}&${firstTerm}=${data[firstTerm]}`,
      config,
    )
  }
}
export const fetchServiceBySI = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])
  let firstTerm = searchTerm[searchTerm.length - 2] // key

  // console.log(data[firstTerm], 'data[firstTerm]')
  let role = searchTerm[searchTerm.length - 1] // key
  const { subs } = data // value
  const roleObj = data && data.subs_name && data.subs_name.toLowerCase()
  const subscriberkey = roleObj[subs]
  //   return axios.get(`/service?${key}=${value}`)

  const config = {
    headers: {
      'Consumer-Code': '5B2CCB7521BC77D4DA64A67CD0E78E92D98F25BE4FFBFAA52E20459A5B2F1068',
    },
  }

  if (data.choose_api === 'ai') {
    return axios.get(`${GET_URL}/v1/telco/services/${data[firstTerm]}&&${roleObj}=${subs}`)
  } else {
    return axios.get(
      `${GET_URL_OS}/read/services/${data[firstTerm]}?lineOfBusiness=${subs}`,
      config,
    )
  }
  //  return axios.get(`${GET_URL}/v1/services/${data[firstTerm]}&&${subscriberkey}=${subs}`)
}

export const getBankCustomerPrimaySearch = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])
  // console.log(data, 'data')
  // let searchu = Object.keys(data)
  // console.log(searchTerm, 'searchTerm')
  let firstTerm = searchTerm[0] // key
  let role = searchTerm[searchTerm.length - 2] // key
  // console.log(role, 'role')
  const { subs } = data // value
  const roleObj = data && data.subs_name && data.subs_name.toLowerCase()
  const subscriberkey = roleObj[subs]
  // console.log(data, firstTerm, 'data')

  // return API.get(`/customer?${key}=${value}`)

  return axios.get(`${GET_BANK_URL}/v1/bank/customers/${data[firstTerm]}&&${roleObj}=${subs}`)
}

export const getBankCustomerSecondarySearch = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])
  // console.log(searchTerm, 'searchTerm')
  let firstTerm = searchTerm[0] // key
  let role = searchTerm[searchTerm.length - 1] // key
  const { subs } = data // value
  const roleObj = data && data.subs_name && data.subs_name.toLowerCase()
  const subscriberkey = roleObj[subs]
  // return API.get(`/customer?${key}=${value}`)
  return axios.get(
    `${GET_BANK_URL}/v1/bank/customers?${firstTerm}=${data[firstTerm]}&&${roleObj}=${subs}`,
  )
}

export const getBankAccountPrimarySearch = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])
  // let searchu = Object.keys(data)

  let firstTerm = searchTerm[0] // key
  let role = searchTerm[searchTerm.length - 2] // key
  // console.log(role, 'role')
  const { subs } = data // value
  const roleObj = data && data.subs_name && data.subs_name.toLowerCase()
  const subscriberkey = roleObj[subs]
  // console.log(data, firstTerm, 'data')

  // return API.get(`/customer?${key}=${value}`)

  return axios.get(`${GET_BANK_URL}/v1/bank/accounts/${data[firstTerm]}&&${roleObj}=${subs}`)
}

export const getBankAccountSecondarySearch = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])
  let firstTerm = searchTerm[0] // key
  let role = searchTerm[searchTerm.length - 1] // key
  const { subs } = data // value
  const roleObj = data && data.subs_name && data.subs_name.toLowerCase()
  const subscriberkey = roleObj[subs]
  // return API.get(`/customer?${key}=${value}`)
  return axios.get(
    `${GET_BANK_URL}/v1/bank/accounts?${firstTerm}=${data[firstTerm]}&&${roleObj}=${subs}`,
  )
}

export const getBankCardSecondorySearch = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])

  let firstTerm = searchTerm[0] // key
  let role = searchTerm[searchTerm.length - 1] // key
  const { subs } = data // value
  const roleObj = data && data.subs_name && data.subs_name.toLowerCase()
  const subscriberkey = roleObj[subs]
  // return API.get(`/customer?${key}=${value}`)
  return axios.get(
    `${GET_BANK_URL}/v1/bank/cards?${firstTerm}=${data[firstTerm]}&&${roleObj}=${subs}`,
  )
}

export const getBankCardPrimarySearch = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])
  // console.log(searchTerm, 'searchterm')
  // let searchu = Object.keys(data)

  let firstTerm = searchTerm[0] // key
  let role = searchTerm[searchTerm.length - 2] // key
  // console.log(role, 'role')
  const { subs } = data // value
  const roleObj = data && data.subs_name && data.subs_name.toLowerCase()
  const subscriberkey = roleObj[subs]
  // console.log(data, firstTerm, 'data')

  // return API.get(`/customer?${key}=${value}`)

  return axios.get(`${GET_BANK_URL}/v1/bank/cards/${data[firstTerm]}&&${roleObj}=${subs}`)
}

//////////////////
// Post Request //
//////////////////
export const createServiceRequest = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/data_ingestion_queue002`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_data_ingestion_queue002`, data)
    } else {
      axios.post(`${CRUD_URL}/prod_data_ingestion_queue002`, data)
    }
  }

  axios.post(`http://10.1.1.60:9004/v1/load_service/`, data)
}
//
export const createCustomerRequest = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/data_ingesion_queue_cust_001`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_data_ingesion_queue_cust_001`, data)
    } else {
      axios.post(`${CRUD_URL}/prod_data_ingesion_queue_cust_001`, data)
    }
  }
}
// axios.post(`/ht/kafkaProducer/10.1.1.55/9092/data_ingesion_queue_cust_001`, data)

// POST Generic Right
export const createGenericRightCustomerReq = (data) => axios.post(`${GENERIC_RIGHT_URL}/ai`, data)

// Enter api for Generic Right service request
export const createGenericRightServiceReq = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/generic_write_queue001`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_generic_write_queue001`, data)
    } else {
      axios.post(`${CRUD_URL}/sit_generic_write_queue001`, data)
    }
  }
  // axios.post(`http://10.1.1.60:5113/ht/kafkaProducer/10.1.1.55/9092/data_ingestion_queue002`, data)
}

// Delete

export const serviceDeleteReq = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/data_ingestion_queue002`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_data_ingestion_queue002`, data)
    } else {
      axios.post(`${CRUD_URL}/prod_data_ingestion_queue002`, data)
    }
  }
}
// axios.post(`/url/`, data)
export const customerDeleteReq = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/data_ingesion_queue_cust_001`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_data_ingesion_queue_cust_001`, data)
    } else {
      axios.post(`${CRUD_URL}/prod_data_deletion_queue_cust_001`, data)
    }
  }
}
// axios.post(`/url/`, data)

// -----------------------------------------------------------------//
// For Bank Demo API request
// -----------------------------------------------------------------//

export const createBankCustomerDataReq = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/bank_customer`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_bank_customer`, data)
    } else {
      axios.post(`${CRUD_URL}/prod_bank_customer`, data)
    }
  }
}
// axios.post(`http://10.1.1.60:5113/ht/kafkaProducer/10.1.1.55/9092/data_ingestion_queue002`, data)

export const createBankAccountReq = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/bank_account`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_bank_account`, data)
    } else {
      axios.post(`${CRUD_URL}/prod_bank_account`, data)
    }
  }
}
// axios.post(`http://10.1.1.60:5113/ht/kafkaProducer/10.1.1.55/9092/data_ingestion_queue002`, data)

export const createBankCardReq = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/bank_card`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_bank_card`, data)
    } else {
      axios.post(`${CRUD_URL}/prod_bank_card`, data)
    }
  }
}

// export const deletBankCustomerDataReq = (data) => {
//   if (host.includes('3026')) {
//     axios.post(`${CRUD_URL}/data_ingestion_queue002`, data)
//   } else {
//     axios.post(`${CRUD_URL}/sit_data_ingestion_queue002`, data)
//   }
// }
export const deletBankCustomerDataReq = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/bank_customer`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_bank_customer`, data)
    } else {
      axios.post(`${CRUD_URL}/prod_bank_customer`, data)
    }
  }
}

export const deletBankAccountReq = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/bank_account`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_bank_account`, data)
    } else {
      axios.post(`${CRUD_URL}/prod_bank_account`, data)
    }
  }
}

export const deletBankCardReq = (data) => {
  if (host.includes('3026')) {
    axios.post(`${CRUD_URL}/bank_card`, data)
  } else {
    if (host.includes('10.1.1.54')) {
      axios.post(`${CRUD_URL}/sit_bank_card`, data)
    } else {
      axios.post(`${CRUD_URL}/prod_bank_card`, data)
    }
  }
}

// bank demo search

// export const deletBankCardReq = (data) => {
//   if (host.includes('3026')) {
//     axios.post(`${CRUD_URL}/data_ingestion_queue002`, data)
//   } else {
//     axios.post(`${CRUD_URL}/sit_data_ingestion_queue002`, data)
//   }
// }
// axios.post(`http://10.1.1.60:5113/ht/kafkaProducer/10.1.1.55/9092/data_ingestion_queue002`, data)

// for suscriber

// get api

export const getSuscriberData = () => {
  return axios.get('http://3.108.20.22:5118/telco/subscriber')
}

export const getBankSuscriberData = () => {
  return axios.get('http://10.1.1.60:5118/bank/subscriber')
}

// post api

export const postSuscriberData = (data) => {
  let searchTerm = Object.keys(data).filter((k) => data[k])

  return axios.post(
    `http://10.1.1.60:5118/subscriber?${searchTerm[0]}=${data.subcode}&${searchTerm[1]}=${data.consumer}&${searchTerm[2]}=${data.lob}`,
  )
}
