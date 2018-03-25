import React, {Component} from 'react';
import {Link} from "react-router-dom"

class LandingPage extends Component {

    linkStyle = {
        textDecoration: 'none',
        color: 'white',
        padding: '8px 15px'
    }

    render() {
        return (
            <div>

                    <nav className="Route-buttons">
                        <p>
                            <Link style={this.linkStyle} to="/home">Admin Login</Link>
                        </p>
                        <p>
                            <Link style={this.linkStyle} to="/attendee">Attendee View</Link>
                        </p>
                    </nav>

                <p>This is a placeholder for the App's Landing Page.</p>
                <p>Ideally it will be to advertise the App's functionality and past performance to possible customers.</p>
            </div>
        )
    }
}

export default LandingPage