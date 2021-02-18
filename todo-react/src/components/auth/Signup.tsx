import './styles/styles.scss'
import { useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import { getErrorMessage } from '../../selectors/todos'
import { signUpRequest } from '../../redux/actions/authActions'

const SignUp = () => {
  const { register, errors, handleSubmit, watch } = useForm()
  const password = useRef({})
  password.current = watch("password", "")
  const history = useHistory()
  const dispatch = useDispatch()
  const errorMessage = useSelector(getErrorMessage)
  
  const onSubmit = useCallback((data) => {
    const username = data.username
    const pass = data.password
    dispatch(signUpRequest(username, pass, history))
  }, [dispatch, history])

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth-title">Registration</h2>
        <label className="auth-label">
          <span>username</span>
          <input
            name="username"
            type="text"
            placeholder="username"
            ref={register({
              required: "You must enter your name",
              minLength: {
                value: 3,
                message: "Your name must be at least 3 characters"
              },
            })}
          />
          {errors.username && (
            <span className="auth-error">{errors.username.message}</span>
          )}
        </label>
        <label className="auth-label">
          <span>password</span>
          <input
            type="password"
            placeholder="password"
            name="password"
            ref={register({
              required: "You must enter the password",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "Needs to be at least eight characters, one letter and one number"
              },
            })}
          />
          {errors.password && (
            <span className="auth-error">{errors.password.message}</span>
          )}
        </label>
        <label className="auth-label">
          <span>confirm password</span>
          <input
            type="password"
            placeholder="confirm password"
            name="password_confirm"
            ref={register({
              required: "You must confirm password",
              validate: value =>
                value === password.current || "The passwords do not match",
            })}
          />
          {errors.password_confirm && (
            <span className="auth-error">{errors.password_confirm.message}</span>
          )}
        </label>
        <span className="auth-error">{errorMessage}</span>
        <button className="auth-button">Sign Up</button>
      </form>
    </section>
  )
}

export default SignUp