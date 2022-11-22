import React from 'react'
import { CSpinner } from '@coreui/react'

const Loader = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <CSpinner />
    </div>
  )
}

export default Loader
