import axios from 'axios'
import { toast } from 'react-toastify'
import { createGenericRightCustomerReq, createGenericRightServiceReq } from '../api'

export const createGenericRightCustomer = (sendData) => async (dispatch) => {
  dispatch({ type: 'CREATE_GEN_RIGHT_REQ' })

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const data = {
    cust_ac_no: sendData.cust_ac_no,
    // acc_lob: sendData.acc_lob,
    is_b2b_acc: sendData.is_b2b_acc,
    parent_ac_no: sendData.parent_ac_no,
    root_ac_no: sendData.root_ac_no,
    org_name: sendData.org_name,
    org_type: sendData.org_type,
    prename: sendData.prename,
    fname: sendData.fname,
    mname: sendData.mname,
    lname: sendData.lname,
    nationality: sendData.nationality,
    email: sendData.email,
    gender: sendData.gender,
    rtn: sendData.rtn,
    dob: sendData.dob,
    pan: sendData.pan,
    res_addrss: sendData.res_addrss,
    cors_addrss: sendData.cors_addrss,
    cust_type: sendData.cust_type,
    cust_class: sendData.cust_class,
    cust_seg: sendData.cust_seg,
    cust_cat: sendData.cust_cat,
    cust_create_dt: sendData.cust_create_dt,
    cust_stts: sendData.cust_stts,
    cust_act_dt: sendData.cust_act_dt,
    cust_deact_dt: sendData.cust_deact_dt,
    cust_ivr_lang: sendData.cust_ivr_lang,
    pref_comm_lang: sendData.pref_comm_lang,
    pref_comm_ch: sendData.pref_comm_ch,
    // src_lob: sendData.src_lob,
    // source_systm: sendData.source_systm,
  }

  try {
    const res = await createGenericRightCustomerReq(data)

    if (res) {
      dispatch({ type: 'CREATE_GEN_RIGHT_SUCCESS' })
      toast.success('Record submitted successfully!')
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: 'CREATE_GEN_RIGHT_FAIL' })
    toast.error('Something went wrong!')
  }
}

export const createGenericRightService =
  ({
    si,
    online_video_streamer,
    ol_gamer,
    online_shopper,
    online_music_streamer,
    credit_score,
    ndnc,
    intl_traveller,
  }) =>
  async (dispatch) => {
    dispatch({ type: 'CREATE_GEN_RIGHT_SERVICE_REQ' })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const data = {
      si,
      online_video_streamer,
      ol_gamer,
      online_shopper,
      online_music_streamer,
      credit_score,
      ndnc,
      intl_traveller,
    }

    try {
      await createGenericRightServiceReq(data)
      dispatch({ type: 'CREATE_GEN_RIGHT_SERVICE_SUCCESS' })
      toast.success('Record submitted successfully!')
      // return new Promise((resolve, _) => {
      //   resolve(res)
      // })
    } catch (error) {
      console.log(error)
      dispatch({ type: 'CREATE_GEN_RIGHT_SERVICE_FAIL' })
      toast.error('Something went wrong!')
    }
  }
