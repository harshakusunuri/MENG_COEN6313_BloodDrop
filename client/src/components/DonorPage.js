import React from 'react'

import { Link } from 'react-router-dom'

const DonorPage = () => {
    return (
        <div><h1>Donor</h1>
        <nav className="donarSubMenu">
            <ul className="donorLinks">
                <li>
                    <Link to='/donorAppointmentPage' >
                        Donor Appointment </Link>
                </li>
                <li>
                    <Link to='/myRequests' >
                        Donor My Requests</Link>
                </li>
            </ul>
</nav>
        </div>
    )
}

export default DonorPage
