import React from 'react'

import { Link } from 'react-router-dom'

const DonorPage = () => {
    return (
        <div><h1>Donor Page</h1>

            <ul>
                <li>
                    <Link to='/donorAppointmentPage' >
                        Donor Appointment Page </Link>
                </li>
                <li>
                    <Link to='/donorPageMyRequestPage' >
                        Donor My RequestPage</Link>
                </li>
            </ul>

        </div>
    )
}

export default DonorPage
