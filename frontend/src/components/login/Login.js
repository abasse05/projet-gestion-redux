import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom'
import './Login.css'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {login} from '../../actions/userActions'

class Login extends Component {

    state = {
            loginData : {
              username: "",
              password: ""
            },
    }

    static propTypes = {
      login: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool,
  }

    inputChanged = (e) => {
        const loginDataFormat = this.state.loginData;
        loginDataFormat[e.target.name] = e.target.value;
        this.setState({ loginData: loginDataFormat })
    }

    onSubmit = async (e) => {
        e.preventDefault()
       console.log(this.state.loginData)
       this.props.login(this.state.loginData.username, this.state.loginData.password)
    }
        
  
    render() {
        if(this.props.isAuthenticated){
          return <Redirect to="/index" />
      }
        return (
              <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={this.onSubmit}>
                  <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Se Connecter</h3>
                    <div className="text-center">
                      Pas encore inscrit ?
                      <Link className="link-primary" to="/inscrit">
                        S'inscrire
                      </Link>
                    </div>
                    <div className="form-group mt-3">
                      <label>Username</label>
                      <input
                        type="text"
                        name="username"
                        defaultValue={this.state.loginData.username}
                        onChange={this.inputChanged}
                        className="form-control mt-1"
                        placeholder="Enter Username"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        defaultValue={this.state.loginData.password}
                        onChange={this.inputChanged}
                        className="form-control mt-1"
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                      <button className="btn btn-primary">
                        Connexion
                      </button>
                    </div>
                    <p className="text-center mt-2">
                      Oublié <Link to="/">password?</Link>
                    </p>
                  </div>
                </form>
              </div>
        )
    }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
})

export default connect(mapStateToProps, {login})(Login)


