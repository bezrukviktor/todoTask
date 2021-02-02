import React from 'react'
import Loader from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div className='loader-wrap'>
      <Loader
        type='ThreeDots'
        color='#ff5656'
        className='loader'
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  )
}

export default Spinner