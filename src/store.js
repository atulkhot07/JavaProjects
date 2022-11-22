import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// reducers
import sideBarReducer from './reducers/sidebar'
import customerReducer from './reducers/customer'
import serviceReducer from './reducers/service'
import genericRightReducer from './reducers/genericRight'
import deleteReducer from './reducers/delete'
import bankDemoReducer from './views/bankDemo/redux/reducer'
import bankCustomerReducer from './reducers/bankCustomer'
import bankAccountReducer from './reducers/bankAccount'
import bankCardReducer from './reducers/bankCard'
import suscriberReducer from './reducers/susciberData'

const reducer = combineReducers({
  sideBar: sideBarReducer,
  customerR: customerReducer,
  serviceR: serviceReducer,
  genericRight: genericRightReducer,
  delete: deleteReducer,
  bankDemo: bankDemoReducer,
  customerBank: bankCustomerReducer,
  accountBank: bankAccountReducer,
  cardBank: bankCardReducer,
  susciberData: suscriberReducer,
})

const initialState = {}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
