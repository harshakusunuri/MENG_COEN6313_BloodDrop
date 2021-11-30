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

            <section className="landing1">
                <div className="CompatabilityCover">
                    <h3>Blood Compatability Chart</h3>
                    <Table bordered>
                        <thead>
                            <tr>

                                <th>
                                    Recipient Blood Type
                                </th>

                                <th>Matching Donor Blood Type </th>


                            </tr>
                        </thead>
                        <tbody><tr>

                            <td>A+ </td>

                            <td>A+, A-, O+, O- </td>
                        </tr>
                            <tr>

                                <td>A- </td>

                                <td>A-, O-</td>
                            </tr>
                            <tr>

                                <td>B+</td>

                                <td>B+, B-, O+, O-</td>
                            </tr>
                            <tr>

                                <td>B-</td>

                                <td>B-, O-</td>
                            </tr>
                            <tr>

                                <td>AB+</td>

                                <td>	Compatible with all blood types </td>
                            </tr>
                            <tr>

                                <td>AB-</td>

                                <td>AB-, A-, B-, O-</td>
                            </tr>
                            <tr>

                                <td>O+</td>

                                <td>O+, O- </td>
                            </tr>
                            <tr>

                                <td>O-</td>

                                <td>O-</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <a href='https://www.hematology.org/education/patients/blood-basics/blood-safety-and-matching' target='_blank' >Reference Link</a>
            </section>









        </div >
    )
}
// //   position: relative;
//   background: url('./img/showcase.jpg') no-repeat center center/cover;
//   height: 90vh;
//   width: 73vw;
const mapStateToProps = state => ({
    user: state.auth.user,
})
export default connect(mapStateToProps)(MyDetails);
