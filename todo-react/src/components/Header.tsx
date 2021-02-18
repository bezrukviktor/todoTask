import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logOutAction } from "../redux/actions/authActions"
import { getAccessToken, getUsername } from "../selectors/todos"
import { clearStorage } from "../_helpers/token"

const Header = () => {
  const isLogin = !!useSelector(getAccessToken)
  const username = useSelector(getUsername)
  const dispatch = useDispatch()

  const logOut = () => {
    clearStorage()
    dispatch(logOutAction())
  }

  return (
    <header className="header">
      <h1 className="header__title">todos</h1>
      {isLogin ?
        <div className="auth-btns">
          <span>Welcome, {username}</span>
          <Link className="btn signUp-btn" to="/login" onClick={logOut}>
            Log Out
          </Link>
        </div>
        :
        <div className="auth-btns">
          <Link className="btn signUp-btn" to="/signup">
            Sign Up
          </Link>
          <Link className="btn logIn-btn" to="/login">
            Log In
          </Link>
        </div>
      }
    </header>
  )
}

export default Header