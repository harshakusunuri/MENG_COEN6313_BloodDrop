import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import './navbar.css';

const Navbar = ({ auth: { isAuthenticated }, logout, history }) => {
    const handleLogout = () => {
        logout();
        history.push('/');
    };

    const authLinks = (
        <ul>
            <li>
                <Link to='/donorAppointmentPage' >
                    Donor </Link>
            </li>
            <li>
                <Link to='/store' >
                    Store</Link>
            </li>
            <li>
                <Link to='/myDetails' >
                    My Details</Link>
            </li>
            <li>
                <a onClick={handleLogout} >
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span></a>
            </li>
        </ul>
    );


    const guestLinks = (
        <ul>
            <li>
                <Link to='/register' >
                    Register </Link>
            </li>
            <li>
                <Link to='/login' >
                    Login</Link>
            </li>
        </ul>
    );



    return (
        <nav className="navbar Nav bg-light">
            <h1>
                <Link to='/' >
                    <i className='fas fa-tint' > Blood Drop</i> </Link>
            </h1>
            <Fragment> {isAuthenticated ? authLinks : guestLinks}</Fragment>



            {/* <ul>  
                <a href="/"><i className="fas fa-code"></i> Blood Drop</a>
                <li><a href="profiles.html">News Feed</a></li>-
                <li><a href="/userRegister">Register</a></li>
                <li><a href="/userLogin">Login</a></li>

                  const authLinks = (
        <ul>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span></a>
            </li>

        </ul>
    );
                        authLinks

            </ul>*/}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,

    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, { logout })(withRouter(Navbar))
