import React from 'react'

//Forms

// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// sample route added here
const Service = React.lazy(() => import('./views/forms/service/Service'))
const Customer = React.lazy(() => import('./views/forms/customer/Customer'))

//Pages
const ServiceP = React.lazy(() => import('./views/pages/service/Service.js'))
const CustomerP = React.lazy(() => import('./views/pages/customer/Customer.js'))

const GenericWriteService = React.lazy(() => import('./views/genericWrite/service/Service'))
const GenericWriteCustomer = React.lazy(() => import('./views/genericWrite/customer/Customer'))

const ServiceD = React.lazy(() => import('./views/delete/service/Service'))
const CustomerD = React.lazy(() => import('./views/delete/customer/Customer'))

const bankCustomerP = React.lazy(() => import('./views/pages/bankDemo/customer/customer'))
const bankAccountP = React.lazy(() => import('./views/pages/bankDemo/account/account'))
const bankCardP = React.lazy(() => import('./views/pages/bankDemo/card/card'))

// Bank Demo
// ----------------------------------------------

const CreateBankCustomer = React.lazy(() =>
  import('./views/bankDemo/createBankCustomer/CreateBankCustomer'),
)

const DeleteBankCustomer = React.lazy(() =>
  import('./views/bankDemo/deleteBankCustomer/DeleteBankCustomer'),
)

const CreateBankAccount = React.lazy(() =>
  import('./views/bankDemo/createBankAccount/CreateBankAccount'),
)

const DeleteBankAccount = React.lazy(() =>
  import('./views/bankDemo/deleteBankAccount/DeleteBankAccount'),
)

const CreateBankCards = React.lazy(() => import('./views/bankDemo/createBankCards/CreateBankCards'))
const DeleteBankCards = React.lazy(() => import('./views/bankDemo/deleteBankCard/DeleteBankCard'))

const routes = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/forms', name: 'Forms', component: Service, exact: true },
  { path: '/forms/service', name: 'Service', component: Service },
  { path: '/forms/customer', name: 'Customer', component: Customer },

  //Pages
  { path: '/pages', name: 'Page', component: ServiceP, exact: true },
  { path: '/pages/service', name: 'Service', component: ServiceP },
  { path: '/pages/customer', name: 'Customer', component: CustomerP },

  { path: '/pages/bank-customer', name: 'Bank-Customer', component: bankCustomerP },
  { path: '/pages/bank-account', name: 'Bank-Account', component: bankAccountP },
  { path: '/pages/bank-card', name: 'Bank-Card', component: bankCardP },

  //Generic Right
  { path: '/generic-write', name: 'generic-write', component: GenericWriteService, exact: true },
  { path: '/generic-write/service', name: 'Service', component: GenericWriteService },
  { path: '/generic-write/customer', name: 'Customer', component: GenericWriteCustomer },

  { path: '/delete', name: 'delete', component: ServiceD, exact: true },
  { path: '/delete/service', name: 'delete', component: ServiceD },
  { path: '/delete/customer', name: 'delete', component: CustomerD },

  // Bank Demo Routes
  // _____________________________________________________________//
  { path: '/bank-demo', name: 'Bank Demo', component: CreateBankCustomer, exact: true },
  {
    path: '/bank-demo/customer-create',
    name: 'Customer Create',
    component: CreateBankCustomer,
    exact: true,
  },
  {
    path: '/bank-demo/customer-delete',
    name: 'Customer Delete',
    component: DeleteBankCustomer,
  },

  {
    path: '/bank-demo/account-create',
    name: 'Account Create',
    component: CreateBankAccount,
    exact: true,
  },
  {
    path: '/bank-demo/account-delete',
    name: 'Account Delete',
    component: DeleteBankAccount,
    exact: true,
  },

  {
    path: '/bank-demo/card-create',
    name: 'Card Create',
    component: CreateBankCards,
    exact: true,
  },
  {
    path: '/bank-demo/card-delete',
    name: 'Card Delete',
    component: DeleteBankCards,
    exact: true,
  },
]

export default routes
