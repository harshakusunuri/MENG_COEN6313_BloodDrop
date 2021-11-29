import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getMyRequests, editMyRequest } from '../../actions/my_request'

const MyRequests = ({ actionFetch, actionEdit, data }) => {
    const statusOptions = [
        { value: 'CONFIRM', label: 'CONFIRM' },
        { value: 'DECLINE', label: 'DECLINE' },
    ]
    const [selected, setSelected] = useState('')
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const data = {}
        data.userRequestType = 'DONOR_BLOOD_REQ'
        data.status = 'PENDING'
        actionFetch(data)
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

    const editMyRequest = () => {
        const data = {}
        data.id = selected._id;
        data.status = status.value;
        data.description = description;
        actionEdit(data)
        setModal(false)
        actionFetch(data)

    }

    return (
        <>
            <Table bordered>
                <thead>
                    <tr>
                        <th>
                            id
                        </th>
                        <th>
                            location
                        </th>
                        <th>Hospital</th>
                        <th>Blood Group </th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.length && data.map((item, index) => (
                        <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>{item.location} </td>
                            <td>{item.hospital} </td>
                            <td>{item.bloodGroup} </td>
                            <td>{item.status}
                            </td>
                            <td>
                                {item.status === 'PENDING' ?
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
    data: state.my_requests.myRequests
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
