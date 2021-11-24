import React from 'react';
import { Link } from 'react-router-dom';


function NavBar() {
    return (
        <ul>
            <li>
                <Link to="/">EventList</Link>
            </li>
            {/* <li>
                <Link to="/login">Login</Link>
            </li> */}
        </ul>
    )
}

export default NavBar;