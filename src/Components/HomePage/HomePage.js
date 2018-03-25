import React, {Component} from 'react';

import LoginView from './LoginView'

class HomePage extends Component {

    render() {
        return (
            <div>
                <p>This is a placeholder for the App's homepage.</p>
                <LoginView/>
            </div>
        )
    }
}

export default HomePage