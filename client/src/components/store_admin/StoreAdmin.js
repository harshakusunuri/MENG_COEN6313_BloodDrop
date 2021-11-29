import React, { useState} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { saveAdminRequest } from '../../actions/store';
import { Button, Card } from 'react-bootstrap';
import styles from './admin.css';

const StoreAdmin = ({ actionSave }) => {
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

    const [ location, setLocation] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [ description, setDescription] = useState('');
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
        actionSave(data)
    }

    return (
        <>
        <Card className="card">
        <h3 className="heading">New Request</h3>

           <div className="mini-container">
              <form>
                  <div className="form-group">

                  <span> Location </span>
                  <Select
                  options= {locationOptions}
                  onChange={handleLocation}
                  placeholder="select location"
                  />

                  </div>
    <div className="form-group">
    <span> Blood Group </span>
                  <Select
                  options = { bloodGroupOptions }
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
              <Button variant="success" className="saveBtn" onClick={Save}>Save</Button>{' '}
           </Card>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    actionSave: (data) => {
        dispatch(saveAdminRequest(data))
      }
})

export default connect(null, mapDispatchToProps)(StoreAdmin)
