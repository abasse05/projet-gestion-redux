import React, {useEffect} from 'react'
import './App.css'
import Login from './components/login/Login'
import Inscrit from './components/inscrit/Inscrit'
import Index from './components/profil/Index'

import {Provider} from 'react-redux'
import store from './components/store'

import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import { loadUser } from './actions/userActions'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App() {

  useEffect(() => {
      store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/inscrit'  component={Inscrit}  />
            <Route path='/index' component={Index} />
          </Switch>
        </Router>
      </AlertProvider>
    </Provider>
  )
}

export default App
