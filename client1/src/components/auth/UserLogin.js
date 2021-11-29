import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { userLogin } from '../../actions/auth'


import { Link, Navigate, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'



const UserLogin = ({ setAlert, userLogin, isAuthenticated }) => {

    const [formData, setFormData] = useState({

        // name: '',

        email: '',
        password: '',
        // password2: '',
        // address: '',
        // bloodGroup: '',
        // isOrg: false

        userType: '',
        // organizationName: '',

        // adminAccess: false

    })

    const { email, password, userType } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        // console.log(formData);
        userLogin(formData);
    }

    if (isAuthenticated) {
        return <Redirect to='/' />

    }


    return (
        <Fragment><h1>User Login </h1>

            <section className="container">

                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)} >
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email}
                            onChange={(e => onChange(e))}

                            required />
                        <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                        >
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
                        <span  >
                            <input type="radio" value="USER" name="userType" style={{ margin: "10px" }} /> User
                            <input type="radio" value="ORG" name="userType" style={{ margin: "10px" }} /> Organization

                            <input type="radio" value="ADMIN" name="userType" style={{ margin: "10px" }} /> Admin
                        </span>
                        {/*<input type="radio" value="Other" name="gender" /> Other */}
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <a href="/userRegister">Sign Up</a>
                </p>
            </section>




        </Fragment>
    )
}

UserLogin.propTypes = {
    setAlert: PropTypes.func.isRequired,
    // userRegister: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, userLogin })(UserLogin);

