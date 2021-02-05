import './App.css'
import React from 'react'
import Header from './components/Header'
import HomePage from './components/homePage/HomePage'
import SignUp from './components/auth/signup/Signup'
import LogIn from './components/auth/login/Login'
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from 'react-redux'
import { getRegStatus } from './selectors/todos'

const App = () => {
  const isUserReg = useSelector(getRegStatus)
  
  return (
    <>
      <Header />
      <main className="main">
        <Switch>
          <Route exact path='/'>
            <Redirect to="/login" />
          </Route>
          <Route path='/home' component={HomePage} />
          <Route path='/signup' component={SignUp} >
            {isUserReg ? <Redirect to="/login" /> : <SignUp />}
          </Route>
          <Route path='/login' component={LogIn} />
        </Switch>
      </main>
    </>
  );
}

export default App;
