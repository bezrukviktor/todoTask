import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getAccessToken } from '../selectors/todos'

const PrivateRoute = ({ component: Component, ...rest }: any) => {

  const isLogin = !!useSelector(getAccessToken)
  if (rest.secure) {
    return (
      <Route
        {...rest}
        render={props =>
          !isLogin ? (<Component {...props} />) : (<Redirect to={{ pathname: '/' }} />)
        }
      />
    )
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          isLogin ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login' }} />)
        }
      />
    )
  }
}

export default PrivateRoute