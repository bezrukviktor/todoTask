import './App.css'
import React from 'react'
import Header from './components/Header'
import HomePage from './components/home/HomePage'
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter, Switch } from "react-router-dom";
import SignUp from './components/auth/Signup'
import LogIn from './components/auth/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Switch>
          <PrivateRoute exact path='/' component={HomePage} />
          <PrivateRoute exact path='/signup' component={SignUp} secure />
          <PrivateRoute exact path='/login' component={LogIn} secure />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
