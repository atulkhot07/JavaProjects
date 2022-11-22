import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CAvatar } from '@coreui/react'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import hoonertek from '../../src/assets/images/hoonertek.jpeg'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const sideBar = useSelector((state) => state.sideBar)
  // console.log('sideBar', sideBar)
  const { sidebarShow } = sideBar
  // console.log('unfoldable', unfoldable)
  // const state = useSelector((state) => state)
  // console.log(state)
  // console.log(unfoldable) // undefined / true / false

  return (
    <CSidebar
      position="fixed"
      // unfoldable={unfoldable}
      visible={sidebarShow}
      // onVisibleChange={(visible) => {

      //   dispatch({ type: 'setSideBar', payload: visible })
      // }}
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="me-2" style={{ color: 'black', fontSize: '2rem', fontWeight: 'bold' }}>
          DigiTwin
        </div>
        {/* <img src={avatar1} alt="" /> */}
        {/* <CAvatar src={hoonertek} size="xl" /> */}
        {/* <CIcon className="sidebar-brand-full" icon={avatar1} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={avatar1} height={35} /> */}
      </CSidebarBrand>
      <div style={{ height: '1px', width: '100%', backgroundColor: '#d8dbe0' }}></div>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'setUnfoldable', payload: !unfoldable })}
        // onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
