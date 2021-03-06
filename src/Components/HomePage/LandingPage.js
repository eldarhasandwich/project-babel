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
                <p>This is a placeholder for the App's Landing Page.</p>
                <p>Ideally it will be to advertise the App's functionality and past performance to possible customers.</p>

                    <nav className="Route-buttons">
                        <p>
                            <Link style={this.linkStyle} to={process.env.PUBLIC_URL + '/attendee'}>Attendee View</Link>
                        </p>
                        <p>
                            <Link style={this.linkStyle} to={process.env.PUBLIC_URL + '/institution'}>Institution View</Link>
                        </p>
                    </nav>
            </div>
        )
    }
}

export default LandingPage