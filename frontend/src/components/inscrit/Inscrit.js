import React, { Component, Fragment } from "react"
import {Link, Redirect} from 'react-router-dom'
import '../inscrit/Inscrit.css'
import Select from 'react-select'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {register, login} from '../../actions/userActions'
import {getNations} from '../../actions/nationActions'
import {createMessage} from '../../actions/messageActions'

class Inscrit extends Component {

    state = {
        registerData: {
            nom:'',
            prenom:'',
            date_naissance:'',
            numero:'',
            telephone:'',
            username:'',
            password:'',
            confirmpassword:'',
            nationalite:'',
            genre:'',
            email:''
        },
        optionsNation: []

    }
    
    static propTypes = {
        nationName: PropTypes.array.isRequired,
        getNations: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        isRegister: PropTypes.bool
    }
    
    componentDidMount(){
        this.props.getNations()
    }

    optionsGenre = [
            { value: 'M', label: 'Masculin' },
            { value: 'F', label: 'Feminin' }
        ]

    
    onSubmit = (e) => {
        e.preventDefault()
        console.log("click : Submit")
        const { nom, prenom, date_naissance,
                numero, telephone, username,
                password, confirmpassword, 
                nationalite, genre, email} = this.state.registerData
        
        if (password !== confirmpassword) {
            this.props.createMessage({passwordNotMatch : "Password do not match" })
        }else{
            const newUser = JSON.stringify({nom: nom, prenom: prenom, date_naissance: date_naissance, numero: numero, telephone: telephone, username: username, password: password, nationalite: nationalite, genre: genre, email: email})
            this.props.register(newUser)
        }
        
    }

    onChange = (e) => {
        const registerDataFormat = this.state.registerData
        registerDataFormat[e.target.name] = e.target.value
        this.setState({ registerData: registerDataFormat })
    }

    onChangeSelectG = (e) => {
        const registerDataFormat = this.state.registerData
        registerDataFormat['genre'] = e.value
        this.setState({ registerData: registerDataFormat })
    }

    onChangeSelectPays = (e) => {
        const registerDataFormat = this.state.registerData
        registerDataFormat['nationalite'] = e.value
        this.setState({ registerData: registerDataFormat })
    }

    render() {

        this.props.nationName.forEach(element => 
            this.state.optionsNation.push({
            value:element.id,
            label: element.libelle
        }))

        
        if(this.registre){
            this.props.login(this.newUser.username, this.newUser.password)
            if(this.props.isAuthenticated){
                return <Redirect to="/index" />
            }
        }

        return (
            <Fragment>
                <br/>       
                <div className="Auth-form-containers">
                    <form className="Auth-forms" onSubmit={this.onSubmit}>
                        <div className="Auth-form-contents">
                        <h3 className="Auth-form-titles">Inscription</h3>
                        <div className="text-center">
                            Déjà enregistré ? &nbsp;
                            <Link className="link-primary" to="/">
                                Se connecter
                            </Link>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="labels">Nom</label>
                                <input type="text" name="nom" className="form-control" placeholder="Ex: KOUASSI" onChange={this.onChange} value={this.state.registerData.nom} required />
                            </div>
                            <div className="col">
                                <label className="labels">Prenom</label>
                                <input type="text" name="prenom" className="form-control" placeholder="Ex: KOUADIO ANGE ..." onChange={this.onChange} value={this.state.registerData.prenom} required />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="labels">Genre</label>
                                <Select classNamePrefix="genre" options={this.optionsGenre} isClearable onChange={this.onChangeSelectG} required/>
                            </div>
                            <div className="col">
                                <label className="labels">Date de naissance</label>
                                <input type="date" name="date_naissance" className="form-control" placeholder="Ex: KOUADIO ANGE ..." onChange={this.onChange} value={this.state.registerData.date_naissance} required/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="labels">Numero Mob</label>
                                <input type="text" name="numero" className="form-control" placeholder="Ex: KOUASSI" onChange={this.onChange} value={this.state.registerData.numero} />
                            </div>
                            <div className="col">
                                <label className="labels">Numero Tél</label>
                                <input type="text" name="telephone" className="form-control" placeholder="Ex: KOUADIO ANGE ..." onChange={this.onChange} value={this.state.registerData.telephone} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="labels">Nationaté</label>
                                <Select classNamePrefix="nationalite" options={this.state.optionsNation} onChange={this.onChangeSelectPays} isClearable />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="labels">Username</label>
                                <input type="text" name="username" className="form-control" placeholder="username" onChange={this.onChange} value={this.state.registerData.username} required/>
                            </div>
                            <div className="form-group mt-3">
                                <label className="labels">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control mt-1"
                                    placeholder="Email Address"
                                    onChange={this.onChange}
                                    value={this.state.registerData.email}
                                />
                            </div>
                        </div>
                        
                        <div className="row mt-3">
                            <div className="col">
                                <label className="labels">Password</label>
                                <input type="password" name="password" className="form-control" placeholder="password" onChange={this.onChange} value={this.state.registerData.password} required/>
                            </div>
                            <div className="col">
                                <label className="labels">Comfirm Password</label>
                                <input type="password" name="confirmpassword" className="form-control" placeholder="comfirm password" onChange={this.onChange} value={this.state.registerData.confirmpassword}/>
                            </div>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
                <br/>  
            </Fragment>
        )
    
    }
}

//convert a state to this component props
const mapStateToProps = (state) => ({
    nationName: state.nation.pays,
    isAuthenticated: state.user.isAuthenticated,
    isRegister: state.user.isRegister
})

export default connect(mapStateToProps, { getNations, register, createMessage, login })(Inscrit)

