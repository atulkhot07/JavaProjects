const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
}

const sideBarReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'setSideBar':
      //   console.log('changeState', state)
      return { ...state, sidebarShow: action.payload }
    case 'setUnfoldable':
      return { ...state, sidebarUnfoldable: action.payload }
    default:
      return state
  }
}

export default sideBarReducer
