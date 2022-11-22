// import React, { useState } from 'react'
// import './index.css'
// import PropTypes from 'prop-types'
// // import {
// //   CButton,
// //   CCard,
// //   CCardBody,
// //   CCardHeader,
// //   CCol,
// //   CForm,
// //   CFormInput,
// //   CFormLabel,
// //   CTableHead,
// //   CTableRow,
// //   CTableHeaderCell,
// //   CTableBody,
// //   CTableDataCell,
// //   CTable,
// //   CRow,
// //   CFormSelect,
// //   CFormFeedback,
// //   CFormCheck,
// // } from '@coreui/react'

// // import { useSelector, useDispatch } from 'react-redux'
// // import { DataGrid } from '@mui/x-data-grid'
// // import { isEmail } from '../../../bankDemo/utils'

// // // actions
// // import {
// //   getAllCustomer,
// //   getCustomerSecondaryBankSearch,
// //   getCustomerPrimaryBankSearch,
// // } from 'src/views/bankDemo/redux/action'

// // import { useEffect } from 'react'
// // import { toast } from 'react-toastify'

// // import {
// //   suscriberData,
// //   chooseAPIType,
// //   suscriberDataBankCustomer,
// // } from '../../configSearch/configSearch'

// // const initialState = {
// //   cust_email: '',
// //   cust_id: '',
// //   cust_phone: '',
// //   cust_pan: '',
// //   subs: '4',
// //   choose_api: 'ai',
// // }
// // const customerInitialState = {
// //   cust_ac_no: '',
// //   subs: '1',
// //   choose_api: 'ai',
// // }

// // const headerNameList = [
// //   {
// //     des_name: 'Customer Personal Details',
// //     cust_name: 'Name',
// //     cust_dob: 'Date of Birth',
// //     cust_email: 'Email',
// //     cust_phone: 'Phone Number',
// //     cust_gender: 'Gender',
// //     cust_add: 'Address',
// //     cust_pan: 'PAN Number',
// //     cust_act_dt: 'Date of Activation',
// //     rel_mang_nm: 'Relationship Manager Name',
// //     rel_mang_em: 'Relationship Manager Email',
// //     rel_mang_ph: 'Relationship Manager PhoneNo',
// //     prename: 'Salutation',
// //     lname: 'Last Name',
// //     fname: 'First Name',
// //   },
// //   {
// //     des_name: 'Customer Information',
// //     cust_id: 'Customer ID',
// //     cust_cat: 'Category',
// //   },
// //   {
// //     des_name: 'Customer Verification details',
// //     cust_kyc: 'KYC Done',
// //     cust_kyc_dt: 'KYC',
// //     cust_fatca: 'FATCA',
// //     cust_ftc_dt: 'FATCA Date',
// //   },
// // ]

// function BoxCard(props) {
//   const {
//     // headerNameList,
//     // customerData,
//     // newCustomerData,
//     // column,
//     // columValue,
//     // rows,
//     rowName,
//     headerName,
//   } = props
//   //   console.log(headerNameList, 'headerNameList')
//   //   console.log(customerData, 'customerData')
//   //   console.log(newCustomerData, 'newCustomerData')
//   //   console.log(column, 'column')
//   //   console.log(columValue, 'columValue')
//   //   console.log(rows, 'rows')
//   return (
//     <>
//       <div className="main_table_div">
//         <h4>{headerName}</h4>
//         <table>
//           <tr>
//             <th>{rowName}</th>
//             <td>Alfreds Futterkiste</td>
//           </tr>
//           {/* <tr>
//             <th>Contact</th>

//             <td>Maria Anders</td>
//           </tr>
//           <tr>
//             <th>Country</th>
//             <td>Mexico</td>
//           </tr> */}
//         </table>
//       </div>

//       <h1>hi</h1>
//     </>
//   )
// }

// BoxCard.propTypes = {
//   //   headerNameList: PropTypes.string,
//   //   customerData: PropTypes.string,
//   //   newCustomerData: PropTypes.string,
//   //   column: PropTypes.string,
//   //   columValue: PropTypes.string,
//   //   rows: PropTypes.string,
//   rowName: PropTypes.string,
//   headerName: PropTypes.string,
// }
// export default BoxCard()
