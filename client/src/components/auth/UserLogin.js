import React, { useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types'
import { userLogin } from '../../actions/auth'

import { Link, Navigate, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'

const UserLogin = ({ setAlert, userLogin, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: '',
    })

    const options= [
        {value: 'ADMIN', label: 'Admin'},
        {value: 'ORG', label: 'Organization'},
        {value: 'USER', label: 'User'}
    ]

    const { email, password, userType } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  
    const onSubmit = async e => {
        e.preventDefault();
        userLogin(formData);
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    const selectUserType = (val) => {
        console.log(val.value)
        setFormData({
            ...formData,
            userType: val.value
        })
    }

    console.log(formData)

    return (
        <Card className="shadow p-3 mb-5 bg-white rounded" style={{ width: '50rem', height: '440px' }}>
            <Card.Body>
            <Card.Title>
        <h3 className="black ml-2">Login</h3>
        </Card.Title>
            <div className="registerContainer">
                <form className="form" onSubmit={e => onSubmit(e)} >
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e => onChange(e))}
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={(e => onChange(e))}
                            required
                        />
                    </div>
                    <div onChange={(e => onChange(e))}
                        style={{ display: "block" }}>
                        <span style={{ width: "30%" }} >User Profile Type:  </span>
                     <Select 
                     options ={options}
                     placeholder="Select Profile Type"
                     onChange={selectUserType}
                     />
                    </div>
                    <div className="mt-4">
                    <input type="submit" className="btn btn-success" value="Login" />
              </div>
                </form>
                <p className="mt-2">
                    Don't have an account? <a href="/userRegister">Sign Up</a>
                </p>
            </div>
</Card.Body>
        </Card>
    )
}

UserLogin.propTypes = {
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, userLogin })(UserLogin);

