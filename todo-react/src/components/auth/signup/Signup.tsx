import { FormEvent, useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signUpRequest } from "../../../redux/actions/authActions/authActions"
import { getUserExist } from "../../../selectors/todos"
import '../styles/styles.scss'

const SignUp = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const confirmedPassRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const isUserExist = useSelector(getUserExist)
  const [isPassEqual, setEqual] = useState(true)
  const [isPassValid, setPass] = useState(true)
  const [isNameValid, setName] = useState(true)

  const validation = useCallback((username: string, pass: string) => {
    setEqual(true)
    const passValidate = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const usernameValifate = /^(?=.*[A-Za-z])[A-Za-z\d@$!%*#?&_.]{3,}$/
    passValidate.test(pass) ? setPass(true) : setPass(false)
    usernameValifate.test(username) ? setName(true) : setName(false)
    if ((passValidate.test(pass) && usernameValifate.test(username))) {
      dispatch(signUpRequest(username, pass))
    }
  }, [dispatch])

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    const username = nameRef.current!.value
    const pass = passRef.current!.value
    const confirmedPass = confirmedPassRef.current!.value
    pass === confirmedPass ? validation(username, pass) : setEqual(false)
  }, [validation])

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2 className="auth-title">Registration</h2>
        <label className="auth-label">
          <span>username</span>
          <input
            type="text"
            ref={nameRef}
            placeholder="username"
            required
          />
          {isUserExist ? <span className="auth-error">this name is already in use</span> : null}
          {isNameValid ? null : <span className="auth-error">needs to be at least three characters</span>}
        </label>
        <label className="auth-label">
          <span>password</span>
          <input
            type="password"
            ref={passRef}
            placeholder="password"
            required
          />
          {isPassEqual ? null : <span className="auth-error">passwords don't match</span>}
          {isPassValid ? null : <span className="auth-error">needs to be at least eight characters, one letter and one number</span>}
        </label>
        <label className="auth-label">
          <span>confirm password</span>
          <input
            type="password"
            ref={confirmedPassRef}
            placeholder="confirm password"
            required
          />
          {isPassEqual ? null : <span className="auth-error">passwords don't match</span>}
        </label>
        <button className="auth-button">Sign Up</button>
      </form>
    </section>
  )
}

export default SignUp