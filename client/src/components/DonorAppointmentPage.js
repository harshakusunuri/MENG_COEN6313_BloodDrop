import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker'
import { Link, Navigate, Redirect } from 'react-router-dom'
import { setAlert } from '../actions/alert'
import { getAppointmentsLog, getAppointmentslots } from '../actions/auth'


const DonorAppointmentPage = ({ setAlert, appointmentslots, isAuthenticated, user, history, getAppointmentsLog, appointmentsLog, getAppointmentslots, loading }) => {
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
    var datetime = new Date();
    let donationDateUser = datetime.toISOString().slice(0, 10);
    //Page Load

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/');

        } else {

            var locationUser = user.location;
            var bloodGroupUser = user.bloodGroup;
            getAppointmentsLog();
            getAppointmentslots({ location: locationUser, donationDate: donationDateUser, bloodGroup: bloodGroupUser });
        }
    }, [])

    //search for other date & location
    const submitSearch = (e) => {
        e.preventDefault()
        getAppointmentslots({ location, donationDate, bloodGroup });
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
    }

    const saveAppointment = () => {
        console.log("Save Appointment is called")
    }

    return (
        <Fragment>
            <div>
                <Link to='/donorPage' >
                    Back to Donar page
                </Link>
                <h3>Appointment Logs</h3>
                <Table striped bordered hover>
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

                    {appointmentsLog.length && appointmentsLog.map((appointmentsLog2, index) => (


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
                </Table>
            </div>
            <div>
                <h3>Donation Appointment Available Slots</h3>
                {appointmentslots?.remainingAppointmentSlots}
                <div style={{ margin: '15px' }}>


                    {/*}  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}

                    <input type='date' />
                </div>


                <button type="button" onClick={() => editAppointmentSlot(appointmentslots?.donationDate)} >Book new slot for {appointmentslots?.donationDate}</button>
                <Button variant="success" onClick={newAppointment}>New Appointment</Button>

                <Modal show={modal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Appointment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mini-container">
                            <form>
                                {/*}          <div className="form-group">

                                    <span> Status </span>
                                    <Select
                                        options={locationOptions.map(location.value === '')}
                                        onChange={handleLocation}
                                        placeholder="select status"
                                    />

                                </div>
                                <div className="form-group description-field">
                                    <span>Description:  </span>
                                    <textarea id="description" name="description" rows="4" col="50" value={description}
                                        onChange={(e => handleDescription(e))}
                                    />
                    </div> */}
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
    appointmentsLog: state.userData.appointmentsLog,
    user: state.auth.user,
    appointmentslots: state.auth.appointmentslots

});
export default connect(mapStateToProps, { setAlert, getAppointmentsLog, getAppointmentslots })(DonorAppointmentPage)
