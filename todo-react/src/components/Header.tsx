import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">todos</h1>
      <div className="auth-btns">
        <Link className="btn signUp-btn" to="/signup">
          Sign Up
        </Link>
        <Link className="btn logIn-btn" to="/login">
          Log In
        </Link>
      </div>
    </header>
  )
}

export default Header