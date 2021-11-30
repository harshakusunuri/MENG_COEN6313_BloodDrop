import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker'
import { Link, Navigate, Redirect } from 'react-router-dom'
import { setAlert } from '../actions/alert'
import { getAppointmentsLog, getAppointmentslots, updateAppointmentSlot } from '../actions/auth'
import Moment from 'moment'


const DonorAppointmentPage = ({ setAlert, appointmentslots, isAuthenticated, user, history, getAppointmentsLog, appointmentsLog, getAppointmentslots, loading, updateAppointmentSlot }) => {
    const locationOptions = [
        { value: 'MONTREAL', label: 'MONTREAL' },
        { value: 'OTTAWA', label: 'OTTAWA' },
    ]

    const [formData, setFormData] = useState({
        location: '',
        donationDate: '',
        bloodGroup: ''
    })

    const bloodGroupOptions = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' }
    ]
    const [startDate, setStartDate] = useState(new Date());
    const [modal, setModal] = useState(false);
    const [editModel, setEditmodel] = useState(false)
    const { location, donationDate, bloodGroup } = formData;

    const [location1, setLocation1] = useState('');

    const [defaultBloodGroup, setDefaultBloodGroup] = useState('');

    var datetime = new Date();
    let donationDateUser = datetime.toISOString().slice(0, 10);
    //Page Load
    var locationUser = user.location;
    var bloodGroupUser = user.bloodGroup;

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/');

        } else {


            getAppointmentsLog();
            getAppointmentslots({ location: locationUser, donationDate: donationDateUser, bloodGroup: bloodGroupUser });
        }
    }, [])


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    //search for other date & location
    const submitSearch = (e) => {
        e.preventDefault()
        getAppointmentslots({ location, donationDate, bloodGroup });
    }
    const handleLocation = (value) => {
        setLocation1(value)
    }


    const editAppointmentSlot = (data) => {
        setEditmodel(true)
    }

    const handleClose = () => {
        setModal(false)
        setEditmodel(false)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setEditmodel(false)
    }

    const newAppointment = () => {
        setModal(true)
        // setSelectedItem(value)

        // let data1 = locationOptions.filter(item => item.value === value.location)
        let new_data = bloodGroupOptions.filter(item => item.value === user.bloodGroup)
        setDefaultBloodGroup(new_data)

        console.log(donationDate);
    }

    const saveAppointment = () => {

        updateAppointmentSlot({
            location: location1.value, donationDate: donationDateUser, bloodGroup: defaultBloodGroup[0].value
        });
        setModal(false)
        getAppointmentsLog();
        getAppointmentslots({ location: locationUser, donationDate: donationDateUser, bloodGroup: bloodGroupUser });
        // console.log(location, donationDate, bloodGroup)
    }

    return (
        <Fragment>
            <div>
                <Link to='/myRequests' >
                    View My Requests</Link>

            </div>

            <h3>Donation Appointment Slots</h3>


            <div style={{ margin: '15px' }}>


                {/*}  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}



                <div className="mini-container">

                    {/*}    <input type='date' name="donationDate"
                        value={donationDate}
                        onChange={(e => onChange(e))}
                        required />
                    <span className="number">{Moment(donationDateUser).format('YYYY-MM-DD')}</span>
                    <div className="form-group">

                        <span> Location </span>
                        <Select
                            options={defaultLocation}

                            onChange={handleLocation}
                            placeholder="select location"
                        />

                    </div>



                    <div className="form-group">
                        <span> Blood Group </span>
                        <Select
                            options={defaultBloodGroup}

                            onChange={handleBloodGroup}
                            placeholder="select blood group"
                        />
                    </div>

                    <div className="form-group description-field">
                        <span>Description: </span>
                        <textarea id="description" name="description" rows="4" col="50" value={description}
                            onChange={(e => handleDescription(e))}
                        />
    </div> */}


                    <div style={{ fontWeight: "bold" }}>Available slots for {donationDateUser} : {appointmentslots ? (appointmentslots.remainingAppointmentSlots >= 1 ? appointmentslots.remainingAppointmentSlots + " Slots" : "NOT AVAILABLE") : []}</div>
                </div>


                {/*} <button type="button" onClick={() => editAppointmentSlot(appointmentslots?.donationDate)} >Book new slot for {appointmentslots?.donationDate}</button> */}
                {appointmentslots ? (appointmentslots.remainingAppointmentSlots >= 1 ? <Button variant="success" onClick={newAppointment}>New Appointment</Button> : []) : []}

                <Modal show={modal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Appointment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mini-container">
                            <form>
                                <div className="form-group">

                                    <span> Location </span>
                                    <Select
                                        options={locationOptions}

                                        onChange={handleLocation}
                                        placeholder="select location"
                                    />

                                </div>


                                <div className="form-group">
                                    <span> Blood Group </span>

                                    <Select
                                        options={defaultBloodGroup}
                                        defaultValue={defaultBloodGroup[0]}

                                        placeholder="select blood group"
                                    />
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={saveAppointment}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <h3>Appointment Logs</h3>
                <Table striped bordered hover className="my-4">
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

                    {appointmentsLog.length > 0 ? appointmentsLog.map((appointmentsLog2, index) => (


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

                        </tbody>)) : <tbody><tr className="my-4"> "No Records found" </tr></tbody>}
                </Table>

            </div>
        </Fragment >
    )
}

DonorAppointmentPage.propTypes = {
    setAlert: PropTypes.func.isRequired,
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
    appointmentsLog: state.auth.appointmentsLog,
    user: state.auth.user,
    appointmentslots: state.auth.appointmentslots

});

export default connect(mapStateToProps, { setAlert, getAppointmentsLog, getAppointmentslots, updateAppointmentSlot })(DonorAppointmentPage)
