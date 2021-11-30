import React from 'react'

import { Table, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

const MyDetails = ({ user }) => {
    return (
        <div>
            <Table bordered>
                <thead>
                    <tr>

                        <th>
                            Name
                        </th>

                        <th>Email </th>
                        <th>Blood Group</th>
                        <th>location</th>
                        <th>User Type</th>
                        <th>Organization Name</th>

                        <th>Registered Date</th>

                    </tr>
                </thead>
                <tbody>
                    {user ? (
                        <tr>

                            <td>{user.name} </td>

                            <td>{user.email} </td>


                            <td>{user.bloodGroup} </td>
                            <td>{user.location} </td>

                            <td>{user.userType} </td>


                            <td>{user.organizationName} </td>

                            <td>{user.date.slice(0, 10)} </td>



                        </tr>
                    ) : []}
                </tbody>
            </Table>





        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
})
export default connect(mapStateToProps)(MyDetails);
