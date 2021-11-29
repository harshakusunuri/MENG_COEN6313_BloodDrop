import React, { Fragment, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Link, Navigate, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { connect } from 'react-redux'


import PropTypes from 'prop-types'
import { userRegister } from '../../actions/auth'




const UserRegister = ({ setAlert, userRegister, isAuthenticated }) => {
    const options = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' }
    ]



    const [formData, setFormData] = useState({

        name: '',

        email: '',
        password: '',
        password2: '',
        location: '',
        bloodGroup: '',
        userType: '',
        organizationName: '',

        adminAccess: false

    })

    const { name, email, password, password2, location, bloodGroup, userType, organizationName, adminAccess } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            // console.log('Passwords donot match');
            setAlert('Passwords donot match', 'danger');
        } else {
            // console.log(name, email, password, password2, location, bloodGroup, isOrg);
            // console.log(formData);
            // userRegister(name, email, password, password2, location, bloodGroup, isOrg);
            userRegister(formData);
            // console.log(formData);
            // console.log("success");
            // const newUser = {
            //     name, email, password, password2, location, bloodGroup, isOrg
            // }

            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }

            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('/api/users/userRegister', body, config);
            //     console.log(res.data);
            // } catch (err) {
            //     console.error(err.response.data);

            // }

        }
    }

    if (isAuthenticated) {
        return <Redirect to='/' />

    }



    return (
        <section> <h1>User Register </h1>


            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group" style={{ display: "flex" }}>
                        <span style={{ width: "20%" }} >Name:  </span>
                        <input type="text" placeholder="Name" name="name"

                            value={name}
                            onChange={(e => onChange(e))}

                            required />
                    </div>
                    <div className="form-group" style={{ display: "flex" }}>
                        <span style={{ width: "20%" }} >Email Address:  </span>
                        <input type="email" placeholder="Email Address" name="email" value={email}
                            onChange={(e => onChange(e))}

                            required />

                    </div>
                    {/* <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
    Gravatar email</small>  */}
                    <div className="form-group" style={{ display: "flex" }}>
                        <span style={{ width: "20%" }} >Password:  </span>
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
                    <div className="form-group" style={{ display: "flex" }}>
                        <span style={{ width: "20%" }} >Confirm Password:  </span>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"

                            value={password2}
                            onChange={(e => onChange(e))}

                            required

                        />
                    </div>
                    <div className="form-group" style={{ display: "flex" }}>
                        <span style={{ width: "20%" }} >Working Organization Name:  </span>
                        <input type="text" placeholder="Working Organization Name" name="organizationName"

                            value={organizationName}
                            onChange={(e => onChange(e))}

                            required />
                    </div>
                    <div className="form-group" style={{ display: "flex" }}>
                        <span style={{ width: "20%" }} >location:  </span>
                        <input type="text" placeholder="location" name="location"

                            value={location}
                            onChange={(e => onChange(e))}

                            required />
                    </div>


                    {/*}  <div className="form-group">
                        <span >Blood Group :</span>
                        <Select name="bloodGroup" value={bloodGroup} options={options} onChange={e => onChange(e.value)} />
                    </div> */}
                    <div className="form-group" style={{ display: "flex" }}>
                        <span style={{ width: "20%" }} >Blood Group:  </span>
                        <input type="text" placeholder="Blood Group" name="bloodGroup"

                            value={bloodGroup}
                            onChange={(e => onChange(e))}

                            required />
                    </div>

                    <div onChange={(e => onChange(e))}
                        style={{ display: "block" }}>
                        <span style={{ width: "30%" }} >User Profile Type:  </span>
                        <span  >
                            <input type="radio" value="USER" name="userType" style={{ margin: "10px" }} /> User
                            <input type="radio" value="ORG" name="userType" style={{ margin: "10px" }} /> Organization
                        </span>
                        {/*<input type="radio" value="Other" name="gender" /> Other */}
                    </div>


                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/userLogin">Sign In</Link>
                </p>
            </section>





        </section>
    )
}

UserRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, userRegister })(UserRegister);
