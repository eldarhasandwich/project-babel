import React, {Component} from 'react';

class LoginView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userID: "",
            password: ""
        }
    }

    render() {
        return (
            <div>

                <div>
                    <input/>
                </div>
                <div>
                    <input type="password"/>
                </div>
                <div>
                    <button>Login</button>
                </div>

            </div>
        )
    }
}

export default LoginView