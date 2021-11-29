import React from 'react'

import { Link } from 'react-router-dom'

const StorePage = () => {
    return (
        <div><h1>Store  Page</h1>
            <ul> <li>
                <Link to='storeDonorSearchNAdminReq' >
                    Store Donor Search N Admin Req</Link>
            </li>
            </ul>
        </div >
    )
}

export default StorePage
