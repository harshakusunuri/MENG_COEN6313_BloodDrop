import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import axios from 'axios'

import { Link } from 'react-router-dom';
import { getMyRequests, editMyRequest } from '../../actions/my_request'

const MyRequests = ({ actionFetch, actionEdit, data, isAuthenticated, user, history, setAlert }) => {
    const statusOptions = [
        { value: 'CONFIRM', label: 'CONFIRM' },
        { value: 'DECLINE', label: 'DECLINE' },
    ]
    const [selected, setSelected] = useState('')
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [modal, setModal] = useState(false);
    // function sleep(ms) {
    //     return new Promise(
    //         resolve => setTimeout(resolve, ms)
    //     );
    // }

    useEffect(() => {
        // if (!isAuthenticated) {
        //     history.push('/');

        // } else {
        const data = {}
        data.userRequestType = 'DONOR_BLOOD_REQ'
        data.status = 'PENDING'
        actionFetch(data)
        // }
    }, [])

    const editStatus = (item) => {
        setSelected(item)
        setModal(true)
    }

    const handleStatus = (val) => {
        setStatus(val)
    }

    const handleClose = () => {
        setModal(false);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const editMyRequest = async () => {
        const data = {}
        data.id = selected._id;
        data.status = status.value;
        data.description = description;
        await actionEdit(data);
        setModal(false);
        // var delayInMilliseconds = 1000;
        // // setTimeout(function () {
        // //     //your code to be executed after 1 second
        // // }, delayInMilliseconds);

        await actionFetch(data);

    }

    return (
        <>

            <Link to='/donorAppointmentPage' >
                Back to Donor Page </Link>

            <Table bordered style={{ 'max-width': '100%', 'border-collapse': 'collapse', 'table-layout': 'fixed', 'word-wrap': 'break-word' }}>
                <thead style={{ 'text-align': 'center', 'border-collapse': 'collapse', 'padding': '5px', 'border': 'solid 1px' }}>
                    <tr>
                        <th>
                            id
                        </th>
                        <th>
                            location
                        </th>

                        <th>Blood Group </th>
                        <th style={{ 'color': 'orange' }} >Status</th>
                        <th>User Requset Type</th>
                        <th>Created By</th>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th>Donor email</th>
                        <th>Update option for Blood Donations</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length && data.map((item, index) => (
                        <tr>
                            <td style={{}}>
                                {index + 1}
                            </td>
                            <td>{item.location} </td>

                            <td>{item.bloodGroup} </td>
                            <td>{item.status}
                            </td>
                            <td style={{}}>{item.userRequestType} </td>
                            <td style={{}}>{item.createdByUser.email} </td>
                            <td>{item.description} </td>
                            <td>{item.createdDate.slice(0, 10)} </td>
                            <td>{item.userRequestType === 'DONOR_BLOOD_REQ' ?

                                item.reqToUser.email

                                :
                                ''}</td>
                            <td>
                                {item.status === 'PENDING' && (item.createdByUser._id != user._id) ?
                                    <>
                                        <Button variant="success" onClick={() => editStatus(item)}>
                                            Update</Button>
                                    </>
                                    :
                                    ''}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={modal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update MyRequest</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mini-container">
                        <form>
                            <div className="form-group">

                                <span> Status </span>
                                <Select
                                    options={statusOptions}
                                    onChange={handleStatus}
                                    placeholder="select status"
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={editMyRequest}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

const mapStateToProps = state => ({
    data: state.my_requests.myRequests,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,


})

const mapDispatchToProps = dispatch => ({
    actionFetch: (data) => {
        dispatch(getMyRequests(data))
    },
    actionEdit: (data) => {
        dispatch(editMyRequest(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyRequests);
