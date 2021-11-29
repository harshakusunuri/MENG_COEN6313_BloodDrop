import React, { useState } from 'react'
import Select from 'react-select'
import { Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
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
            setAlert('Passwords donot match', 'danger');
        } else {
            userRegister(formData);
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    const handleBloodGroup = (data) => {
        setFormData({
            ...formData,
            bloodGroup: data.value
        })
    }

    return (
        <Card className="shadow p-3 mb-5 bg-white rounded" style={{ width: '50rem' }}>
<Card.Body>
    <Card.Title>
        <h3 className="black">Register</h3>
        </Card.Title>
            <div className="registerContainer">
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

                    <div className="form-group" style={{ display: "flex" }}>
                        <span style={{ width: "20%" }} >Blood Group:  </span>
                     <Select
                     options ={ options }
                     onChange={ handleBloodGroup }
                     placeholder="select blood group"
                     />
                    </div>

                    <div onChange={(e => onChange(e))}
                        style={{ display: "block" }}>
                        <span style={{ width: "30%" }} >User Profile Type:  </span>
                        <span  >
                            <input type="radio" value="USER" name="userType" style={{ margin: "10px" }} /> User
                            <input type="radio" value="ORG" name="userType" style={{ margin: "10px" }} /> Organization
                        </span>
                    </div>
                    <input type="submit" className="btn btn-success" value="Register" />
                </form>
                <p className="my-1 success">
                    Already have an account? <Link to="/userLogin">Sign In</Link>
                </p>
                </div>
               </Card.Body>
        </Card>
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
