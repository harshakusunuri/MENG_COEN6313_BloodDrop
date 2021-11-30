import React, { useState } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';
import { saveAdminRequest } from '../../actions/store';


import { Button, Modal, Table, Card } from 'react-bootstrap';
import moment from 'moment';
import styles from './admin.css';

const StoreAdmin = ({ actionSave, history }) => {
    const locationOptions = [
        { value: 'MONTREAL', label: 'MONTREAL' },
        { value: 'OTTAWA', label: 'OTTAWA' },
    ]

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

    const [location, setLocation] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [description, setDescription] = useState('');
    const [donationDate, setDonationDate] = useState('');

    const userRequestType = 'REQ_TO_ADMIN';

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleLocation = (value) => {
        setLocation(value)
    }

    const handleBloodGroup = (value) => {
        setBloodGroup(value)
    }

    const Save = () => {
        const data = {}
        data.location = location.value
        data.bloodGroup = bloodGroup.value
        data.userRequestType = userRequestType
        data.description = description
        data.donationDate = moment().format('YYYY-MM-DD');//DonationDate
        actionSave(data)
        history.push("/store");
    }
    const Close = () => {
        history.push("/store");

    }


    return (
        <>
            <Link to='/store' >
                Back to store
            </Link>
            <Card className="card my-4 " style={{}}>
                <span className="storeLink2">

                </span>
                <h3 className="heading">New Admin Request</h3>

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
                                options={bloodGroupOptions}
                                onChange={handleBloodGroup}
                                placeholder="select blood group"
                            />
                        </div>
                        <div className="form-group description-field">
                            <span>Description:  </span>
                            <textarea id="description" name="description" rows="4" col="50" value={description}
                                onChange={(e => handleDescription(e))}
                            />
                        </div>
                    </form>
                </div>
                <div style={{ display: "flex", justifyContent: "space-evenly", margin: "0px 10px 10px 10px" }}><Button variant="secondary" onClick={Close}>
                    Close
                </Button>
                    <Button variant="success" onClick={Save}>
                        Save
                    </Button></div>
            </Card>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    actionSave: (data) => {
        dispatch(saveAdminRequest(data))
    }
})

export default connect(null, mapDispatchToProps)(withRouter(StoreAdmin))
