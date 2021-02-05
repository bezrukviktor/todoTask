import { useCallback, useRef } from "react"
import '../styles/styles.scss'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginError, getRegStatus } from "../../../selectors/todos";
import { loginRequest } from "../../../redux/actions/authActions/authActions";

const LogIn = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const isUserReg = useSelector(getRegStatus)
  const loginErr = useSelector(getLoginError)
  const dispatch = useDispatch()


  const onSubmit = useCallback((e) => {
    e.preventDefault()
    const username = nameRef.current!.value
    const pass = passRef.current!.value
    dispatch(loginRequest(username, pass))
  },[dispatch])

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2 className="auth-title">Login</h2>
        <label className="auth-label">
          <span>username</span>
          <input
            type="text"
            ref={nameRef}
            placeholder="username"
            required
          />
          {loginErr ? <span className="auth-error">user does't exist</span> : null}
        </label>
        <label className="auth-label">
          <span>password</span>
          <input
            type="password"
            ref={passRef}
            placeholder="password"
            required
          />
        </label>
        <button className="auth-button">Sign In</button>
        {isUserReg ? null :
          <span className="auth-not-registered">
            Not registered?
            <Link to="/signup">Create an account</Link>
          </span>}
      </form>
    </section>
  )
}

export default LogIn