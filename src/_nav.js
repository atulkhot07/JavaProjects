import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilNotes, cilStar, cilBank } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'TELECOM DEMO',
  },
  {
    component: CNavGroup,
    name: 'Create',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" style={{ color: '#000000' }} />,
    items: [
      {
        component: CNavItem,
        name: 'Customer',
        to: '/forms/customer',
      },
      {
        component: CNavItem,
        name: 'Service',
        to: '/forms/service',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Search',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" style={{ color: '#000000' }} />,
    items: [
      {
        component: CNavItem,
        name: 'Customer',
        to: '/pages/customer',
      },
      {
        component: CNavItem,
        name: 'Service',
        to: '/pages/service',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Generic Write',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" style={{ color: '#000000' }} />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Customer',
      //   to: '/generic-write/customer',
      // },
      {
        component: CNavItem,
        name: 'Service',
        to: '/generic-write/service',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Delete',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" style={{ color: '#000000' }} />,
    items: [
      {
        component: CNavItem,
        name: 'Customer',
        to: '/delete/customer',
      },
      {
        component: CNavItem,
        name: 'Service',
        to: '/delete/service',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'BANKING DEMO',
  },
  // Bank Demo Navigations
  {
    component: CNavGroup,
    name: 'Create',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" style={{ color: '#000000' }} />,
    items: [
      {
        component: CNavItem,
        name: 'Customer',
        to: '/bank-demo/customer-create',
      },
      // {
      //   component: CNavItem,
      //   name: 'Customer Delete',
      //   to: '/bank-demo/customer-delete',
      // },
      {
        component: CNavItem,
        name: 'Account',
        to: '/bank-demo/account-create',
      },
      // {
      //   component: CNavItem,
      //   name: 'Account Delete',
      //   to: '/delete/service',
      // },
      {
        component: CNavItem,
        name: 'Card',
        to: '/bank-demo/card-create',
      },
      // {
      //   component: CNavItem,
      //   name: 'Card Delete',
      //   to: '/delete/service',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Customer Generic Write',
      //   to: '/delete/service',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Search',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" style={{ color: '#000000' }} />,
    items: [
      {
        component: CNavItem,
        name: 'Customer',
        to: '/pages/bank-customer',
      },
      {
        component: CNavItem,
        name: 'Account',
        to: '/pages/bank-account',
      },
      {
        component: CNavItem,
        name: 'Card',
        to: '/pages/bank-card',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Delete',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" style={{ color: '#000000' }} />,
    items: [
      {
        component: CNavItem,
        name: 'Customer',
        to: '/bank-demo/customer-delete',
      },
      {
        component: CNavItem,
        name: 'Account',
        to: '/bank-demo/account-delete',
      },
      {
        component: CNavItem,
        name: 'Card',
        to: '/bank-demo/card-delete',
      },
    ],
  },
]

export default _nav
