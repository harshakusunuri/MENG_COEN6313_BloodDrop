import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Link, Navigate, Redirect } from 'react-router-dom'
import { setAlert } from '../actions/alert'
import { getAppointmentsLog, getAppointmentslots } from '../actions/auth'


const DonorAppointmentPage = ({ setAlert, isAuthenticated, user, history, getAppointmentsLog, appointmentsLog, getAppointmentslots, loading }) => {
    const [formData, setFormData] = useState({
        location: '',
        donationDate: '',
        bloodGroup: ''
    })
    const [editModel, setEditmodel] = useState(false)

    const { location, donationDate, bloodGroup } = formData;




    // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    // const onSubmit = async e => {
    //     e.preventDefault();
    //     // console.log(formData);
    //     // userLogin(formData);
    // }
    var datetime = new Date();
    let donationDateUser = datetime.toISOString().slice(0, 10);
    // console.log(donationDateUser);

    //Page Load
    useEffect(() => {
        if (!isAuthenticated) {
            // history.push('/')
            // return <Redirect to='/' />

        } else {

            var locationUser = user.location;
            var bloodGroupUser = user.bloodGroup;
            // console.log({ location: locationUser, donationDate: donationDateUser, bloodGroup: bloodGroupUser });
            getAppointmentsLog();

            getAppointmentslots({ location: locationUser, donationDate: donationDateUser, bloodGroup: bloodGroupUser });




        }
    }, [history, getAppointmentsLog, getAppointmentslots])



    // const appointmentsLogs = appointmentsLog.map((app) => (
    //     <tr key={app.id}>
    //         <td>{app.donationDate}</td>


    {/*<th className="hide-sm">Title</th>
                            <th className="hide-sm">Years</th>
                            <th />
    //              <td>
    //             {formatDate(app.from)} - {app.to ? formatDate(app.to) : 'Now'}
    //         </td> <td>
    //             <button
    //                 onClick={() => deleteExperience(exp._id)}
    //                 className="btn btn-danger"
    //             >
    //                 Delete
    //             </button>
    //        </td>*/}
    //     </tr>
    // ));


    //search for other date & location
    const submitSearch = (e) => {
        e.preventDefault()

        getAppointmentslots({ location, donationDate, bloodGroup });
    }
    const editAppointmentSlot = (data) => {

        console.log(data)


        setEditmodel(true)
        // attributes into form

        // setSelectedPost(data)

        // setRequirementInformation(data.requirementInformation)
        // setAddressLocation(data.addressLocation)
        // setMemberSelected(data.MemberSelected)
        // setPost_id(data._id)

        // console.log(members)

    }

    const handleClose = () => {

        setEditmodel(false)


    }
    const submitHandler = (e) => {
        e.preventDefault()
        setEditmodel(false)

        // console.log(requirementInformation)
        // console.log(addressLocation)
        // console.log(MemberSelected)
        // console.log(post_id)


        // dispatch(organizationsPostsUpdatePost(post_id, requirementInformation, addressLocation, MemberSelected))
        // dispatch(organizationsPostsCreatePost(organizationInfo._id, requirementInformation, organizationInfo.email, addressLocation))

    }

    const appointmentsLog1 = [
        {
            "_id": "619caf99d3a03c7e52395513",
            "createdByUser": {
                "_id": "619a99df9706cd46c55c3311",
                "name": "Sample3",
                "email": "har21@gmail.com"
            },
            "location": "MONTREAL",
            "hospital": "Montreal General Hospital, Montreal, QC H3G 1A4.",
            "status": "CONFIRMED",
            "bloodGroup": "A+",
            "donationDate": "2021-11-22T00:00:00.000Z",
            "createdDate": "2021-11-23T09:08:41.442Z",
            "__v": 0
        },
        {
            "_id": "619c9865c6e7425b63bd2830",
            "createdByUser": {
                "_id": "619a99df9706cd46c55c3311",
                "name": "Sample3",
                "email": "har21@gmail.com"
            },
            "location": "MONTREAL",
            "hospital": "Montreal General Hospital, Montreal, QC H3G 1A4.",
            "status": "CONFIRMED",
            "bloodGroup": "A+",
            "donationDate": "2021-08-21T00:00:00.000Z",
            "createdDate": "2021-11-23T07:24:07.006Z",
            "__v": 0
        },
        {
            "_id": "619c999ac6e7425b63bd2831",
            "createdByUser": {
                "_id": "619a99df9706cd46c55c3311",
                "name": "Sample3",
                "email": "har21@gmail.com"
            },
            "location": "MONTREAL",
            "hospital": "Montreal General Hospital, Montreal, QC H3G 1A4.",
            "status": "CONFIRMED",
            "bloodGroup": "A+",
            "donationDate": "2021-05-23T00:00:00.000Z",
            "createdDate": "2021-11-23T07:24:07.006Z",
            "__v": 0
        }
    ]
    const appointmentslots1 = {
        "remainingAppointmentSlots": 19,
        "donationDate": "2021-11-22"
    }




    return (

        <Fragment>
            <div><h1>Appointment Page</h1>

                <div>
                    <h3>Appointment Logs</h3>
                    <table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>location</th>
                                <th>bloodGroup</th>
                                <th>status</th>
                                <th>donationDate</th>
                                <th>createdDate </th>
                                <th>hospital</th>
                            </tr>
                        </thead>

                        {appointmentsLog1.map((appointmentsLog2, index) => (


                            <tbody>
                                <tr key={appointmentsLog2._id}>
                                    <td >{index + 1}</td>
                                    <td>{appointmentsLog2.location}</td>
                                    <td>{appointmentsLog2.bloodGroup}</td>
                                    <td>{appointmentsLog2.status}</td>
                                    <td>{appointmentsLog2.donationDate.slice(0, 10)}</td>
                                    <td>{appointmentsLog2.createdDate.slice(0, 10)}</td>
                                    <td>{appointmentsLog2.hospital}</td>




                                </tr>

                            </tbody>))}
                    </table>
                </div>
                <div>
                    <h3>Available Slots: {appointmentslots1.remainingAppointmentSlots}</h3>
                    <button type="button" onClick={() => editAppointmentSlot(appointmentslots1.donationDate)} >Book slot for {appointmentslots1.donationDate}</button>
                </div>
                {/*<Modal show={editModel} onHide={handleClose} animation={false} style={{ top: '20vh' }}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ 'max-width': '90%', margin: '0 28px' }} >Organization Post Id: {post_id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body></Modal.Body>

                    <Modal.Footer></Modal.Footer>
                        </Modal>    */}





                {/*     <section className="container">

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
                             
                        </div>
                        <input type="submit" className="btn btn-primary" value="Login" />
                    </form>
                    <p className="my-1">
                        Don't have an account? <a href="/userRegister">Sign Up</a>
                    </p>
    </section >  */}






            </div >
        </Fragment >
    )
}

DonorAppointmentPage.propTypes = {
    setAlert: PropTypes.func.isRequired,
    // userRegister: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    getAppointmentsLog: PropTypes.func.isRequired,
    appointmentsLog: PropTypes.array.isRequired,
    getAppointmentslots: PropTypes.func.isRequired,
    appointmentslots: PropTypes.array.isRequired


};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.loading,
    appointmentsLog: state.appointmentsLog,
    user: state.auth.user,
    appointmentslots: state.appointmentslots

});
export default connect(mapStateToProps, { setAlert, getAppointmentsLog, getAppointmentslots })(DonorAppointmentPage)
