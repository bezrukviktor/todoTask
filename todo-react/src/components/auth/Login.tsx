import './styles/styles.scss'
import { useCallback } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginRequest } from "../../redux/actions/authActions"
import { useForm } from "react-hook-form"
import { getErrorMessage } from '../../selectors/todos'

const LogIn = () => {
  const { register, errors, handleSubmit } = useForm()
  const history = useHistory()
  const errorMessage = useSelector(getErrorMessage)
  const dispatch = useDispatch()

  const onSubmit = useCallback((data) => {
    const username = data.username
    const pass = data.password
    dispatch(loginRequest(username, pass, history))
  }, [dispatch, history])

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth-title">Login</h2>
        <label className="auth-label">
          <span>username</span>
          <input
            name="username"
            type="text"
            placeholder="username"
            ref={register({
              required: "You must enter your name",
            })}
          />
          {errors.username && (
            <span className="auth-error">{errors.username.message}</span>
          )}
        </label>
        <label className="auth-label">
          <span>password</span>
          <input
            name="password"
            type="password"
            placeholder="password"
            ref={register({
              required: "You must enter your password",
            })}
          />
          {errors.password && (
            <span className="auth-error">{errors.password.message}</span>
          )}
        </label>
        <span className="auth-error">{errorMessage}</span>
        <button className="auth-button">Log In</button>
        <span className="auth-not-registered">
          Not registered?
            <Link to="/signup">Create an account</Link>
        </span>
      </form>
    </section>
  )
}

export default LogIn