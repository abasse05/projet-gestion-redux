import React, { Component, Fragment } from 'react'
import './Index.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { Link } from 'react-router-dom'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {faTwitter, faLinkedin, faFacebook, faDribbble} from '@fortawesome/free-brands-svg-icons'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {logout, loadUser, refreshToken} from '../../actions/userActions'
import { Redirect } from 'react-router-dom'

library.add(faUserCircle, faTwitter, faLinkedin, faFacebook, faDribbble)

export class Index extends Component {

  static propTypes = {
      authenticated: PropTypes.object.isRequired,
      logout: PropTypes.func.isRequired,
      refreshToken: PropTypes.func.isRequired
  }

  state = {
    minutes : 1000 * 60 * 5
  }

  componentDidMount(){
    clearInterval(setInterval(() => {
      this.props.refreshToken()
    }, this.state.minutes))
    this.props.loadUser()
  }

  render() {
    const {token, isAuthenticated, user} = this.props.authenticated

    if(isAuthenticated !== true && token === null){
      return <Redirect to="/" />
    }

    return (
      
      <Fragment>
          <div className="container rounded bg-white mb-5" style={{marginLeft:10}}>
              <div className="row">
                <div className="col-md-3">
                    <div className="text-center justify-content-between align-items-center mt-5">
                        <h4 className="text-center">Profil Utilisateur</h4>
                    </div>
                    <div className="row border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3">
                            <input 
                                className="rounded-circle" 
                                width="150px"
                                type="image"
                                img={null}
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" 
                                alt="Photo Profile"
                                readOnly
                            />
                            <span className="font-weight-bold"> {user.nom} {user.prenom} </span>
                            <span className="font-weight-bold text-danger">{user.username}</span>
                            <span className="text-black-50">{user.email}</span>
                            <span></span>
                        </div>
                    </div>

                    <div className="row border-right">
                        <div className="p-3">
                            <div className="row mt-2">
                                <div className="col-md-6">
                                <label className="labels">Prenom</label>
                                <input readOnly type="text" className="form-control" placeholder="first name" value={user.prenom} />
                                </div>
                                <div className="col-md-6">
                                <label className="labels">Nom</label>
                                <input readOnly type="text" className="form-control" value={user.nom} placeholder="surname" />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                <label className="labels">Mobile Tél</label>
                                <input readOnly type="text" className="form-control" placeholder="Aucun" value={user.numero} />
                                </div>
                                <div className="col-md-6">
                                <label className="labels">Portable Tél</label>
                                <input readOnly type="text" className="form-control" placeholder="Aucun" value={user.tel} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                <label className="labels">Addresse Email</label>
                                <input readOnly type="text" className="form-control" placeholder="Aucun" value={user.email} />
                                </div>
                                <div className="col-md-6">
                                <label className="labels">Nationalité</label>
                                <input readOnly type="text" className="form-control" placeholder="Aucun" value={user.nationalite} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Genre</label>
                                    <input readOnly type="text" className="form-control" placeholder="enter address line 2" value={user.genre === "M" ? "Masculin" : "Feminin"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center experience">
                                <span className="border add-experience">
                                    <button onClick={this.props.logout} className="nav-link btn btn-danger btn-lg text-light x-3 p-1 add-experience">
                                        Se déconnecter
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user
})

export default connect(mapStateToProps, { logout, loadUser, refreshToken })(Index)