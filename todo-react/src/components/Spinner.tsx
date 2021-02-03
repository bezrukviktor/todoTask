import Loader from 'react-loader-spinner'

const Spinner= () => {
  return (
    <div className='loader-wrap'>
      <Loader
        type='ThreeDots'
        color='#ff5656'
        height={100}
        width={100}
      />
    </div>
  )
}

export default Spinner