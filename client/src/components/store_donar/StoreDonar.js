import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveAdminRequest, fetchDonarData } from '../../actions/store';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Button, Modal, Table } from 'react-bootstrap';
import moment from 'moment';
import './donar.css';

const StoreDonar = ({ actionSave, donorData, actionFetch }) => {
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
    let reqToUser1 = {};
    const [modal, setModal] = useState(false);
    const [location, setLocation] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [description, setDescription] = useState('');
    const [selected, setSelectedItem] = useState('');
    const [defaultLocation, setDefaultLocation] = useState('');
    const [defaultBloodGroup, setDefaultBloodGroup] = useState('');
    const [defaultReqToUser, setDefaultReqToUser] = useState('');

    const [reqToUser, setReqToUser] = useState('');
    const [donationDate, setDonationDate] = useState('');
    const userRequestType = 'DONOR_BLOOD_REQ';


    useEffect(() => {
        const data = {}
        data.location = 'MONTREAL'
        actionFetch(data)
    }, [])

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleReqToUser = (e) => {
        setReqToUser(e.target.value)
    }

    const handleLocation = (value) => {
        setLocation(value)
    }

    const handleBloodGroup = (value) => {
        setBloodGroup(value)
    }
    const openModal = (value) => {
        setModal(true);
        setSelectedItem(value)

        let data1 = locationOptions.filter(item => item.value === value.location)
        let new_data = bloodGroupOptions.filter(item => item.value === value.bloodGroup)
        let newReqToUser = value.reqToUser

        setDefaultReqToUser(value.createdByUser._id)
        setDefaultLocation(data1)
        setDefaultBloodGroup(new_data)

    }

    const handleClose = () => {
        setModal(false);
    }

    const saveNewRequest = () => {

        const data = {}
        console.log({ location })
        data.location = location.value
        data.bloodGroup = bloodGroup.value// "A+"// 
        data.userRequestType = userRequestType
        data.description = description
        data.donationDate = moment().format('YYYY-MM-DD');//
        data.reqToUser = defaultReqToUser//Donar details
        actionSave(data);
        setModal(false)
    }

    return (
        <div>
            <Link to='/store' >
                Back to store
            </Link>
            <h3 className="heading">Donor requests</h3>

            <Table bordered style={{ 'max-width': '100%', 'border-collapse': 'collapse', 'table-layout': 'fixed', 'word-wrap': 'break-word' }}>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Location
                        </th>
                        <th>
                            Hospital
                        </th>

                        <th>
                            Donated by User
                        </th>
                        <th>
                            Blood Group
                        </th>
                        <th>
                            Donation Date
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {donorData.length &&
                        donorData.map((item, index) => (
                            <tr>
                                <td>{index + 1}
                                </td>
                                <td>
                                    {item.location}
                                </td>
                                <td>
                                    {item.hospital}
                                </td>
                                <td>
                                    {item.createdByUser.email}
                                </td>
                                <td>
                                    {item.bloodGroup}
                                </td>
                                <td>
                                    {item.donationDate.slice(0, 10)}
                                </td>
                                <td>
                                    <Button variant="success" className="saveBtn" onClick={() => openModal(item)}>New Request</Button>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={modal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Request</Modal.Title>'
                </Modal.Header>
                <Modal.Body>
                    <div className="mini-container">
                        <form>
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
                            </div>
                        </form>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={saveNewRequest}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </div >
    )
}

const mapStateToProps = state => ({
    donorData: state.store.donorData
})

const mapDispatchToProps = dispatch => ({
    actionSave: (data) => {
        dispatch(saveAdminRequest(data))
    },
    actionFetch: (data) => {
        dispatch(fetchDonarData(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreDonar)
