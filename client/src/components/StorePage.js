import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import { getAvailableBloodData, saveAdminRequest } from '../actions/store'
import { Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap';
import styles from './store.css';

class StorePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            location: '',
            bloodGroup: '',
            userRequestType: 'STORE_BLOOD_REQ',
            donationDate: ''
        }
        this.locationOptions = [
            { value: 'MONTREAL', label: 'MONTREAL' },
            { value: 'OTTAWA', label: 'OTTAWA' }
        ]
        this.bloodGroupOptions = [
            { value: 'A+', label: 'A+' },
            { value: 'A-', label: 'A-' },
            { value: 'B+', label: 'B+' },
            { value: 'B-', label: 'B-' },
            { value: 'AB+', label: 'AB+' },
            { value: 'AB-', label: 'AB-' },
            { value: 'O+', label: 'O+' },
            { value: 'O-', label: 'O-' }
        ]
    }

    openModal = () => {
        this.setState({ modal: true });
    }
    componentDidMount() {
        const { actionFetch } = this.props;
        const data = {}
        data.location = 'MONTREAL';
        actionFetch(data);

    }
    componentDidUpdate() {
        const { actionFetch } = this.props;
        const data = {}
        data.location = 'MONTREAL';
        actionFetch(data);

    }

    saveNewRequest = () => {
        const {
            location,
            bloodGroup,
            userRequestType
        } = this.state;
        const { actionFetch, actionSave } = this.props;
        const data = {}
        data.donationDate = moment().format('YYYY-MM-DD');
        data.location = location.value;
        data.bloodGroup = bloodGroup.value;
        data.userRequestType = userRequestType;
        actionSave(data);
        actionFetch(data);
        this.setState({ modal: false })
    }

    handleClose = () => {
        this.setState({ modal: false })
    }

    handleLocation = (value) => {
        this.setState({ location: value })
    }

    handleBloodGroup = (value) => {
        this.setState({ bloodGroup: value });
    }



    render() {
        const { blood } = this.props;
        const { modal } = this.state;


        return (
            <div><h3>Store</h3>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>
                                id
                            </th>
                            <th>
                                Location
                            </th>
                            <th>
                                Hospital
                            </th>
                            <th>
                                Blood Group
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blood.length &&
                            blood.map((b, index) => (
                                <tr>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {b.location}
                                    </td>
                                    <td>
                                        {b.hospital}
                                    </td>
                                    <td>
                                        <div className="dFlex">
                                            <div className="inlineFlex">
                                                <div> A+</div>
                                                <div>{b.bloodGroup.APlus}</div>
                                            </div>
                                            <div className="inlineFlex">
                                                <div>  A- </div>
                                                <div>  {b.bloodGroup.AMinus}</div>
                                            </div>
                                            <div className="inlineFlex">
                                                <div>  B+</div>
                                                <div> {b.bloodGroup.BPlus}</div>
                                            </div>
                                            <div className="inlineFlex">
                                                <div>    B-</div>
                                                <div>    {b.bloodGroup.BMinus}</div>
                                            </div>
                                            <div className="inlineFlex">
                                                <div>  AB+</div>
                                                <div>  {b.bloodGroup.ABPlus}</div>
                                            </div>
                                            <div className="inlineFlex">
                                                <div>  AB-</div>
                                                <div>  {b.bloodGroup.ABMinus}</div>
                                            </div>
                                            <div className="inlineFlex">
                                                <div> O+</div>
                                                <div>  {b.bloodGroup.OPlus}</div>
                                            </div>
                                            <div className="spacing">
                                                <div>   O-</div>
                                                <div>  {b.bloodGroup.OMinus}</div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <Button variant="success" className="saveBtn" onClick={this.openModal}>New Request</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <footer>
                    <Modal show={modal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Request</Modal.Title>'
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mini-container">
                                <form>
                                    <div className="form-group">
                                        <span> Location </span>
                                        <Select
                                            options={this.locationOptions}
                                            onChange={this.handleLocation}
                                            placeholder="select location"
                                        />

                                    </div>
                                    <div className="form-group">
                                        <span> Blood Group </span>
                                        <Select
                                            options={this.bloodGroupOptions}
                                            onChange={this.handleBloodGroup}
                                            placeholder="select blood group"
                                        />
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={this.saveNewRequest}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="StoreMenu">
                        <span className="storeLink">
                            <Link to="/store_admin">
                                New Request for Admin
                            </Link>
                        </span>
                        <span className="storeLink2">
                            <Link to='/store_donar' >
                                Donor Search & Request window
                            </Link>
                        </span>
                    </div>
                </footer>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    blood: state.store.availableBlood,
})

const mapDispatchToProps = dispatch => ({
    actionFetch: (data) => {
        dispatch(getAvailableBloodData(data))
    },
    actionSave: (data) => {
        dispatch(saveAdminRequest(data))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(StorePage)
