import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Paper } from 'material-ui';

// import * as userSessionActions from './../../Actions/userSession'


class InstitutionInfo extends Component {

    paperStyle={
        width:"80%",
        margin:"20px auto",
        height:"300px"
    }

    render() {
        return (
            <Paper style={this.paperStyle} zDepth={3}>
                <div>
                    <h1 style={{padding:"20px", margin:"0"}}>
                        {this.props.userSession.userCompanyName}
                    </h1>


                </div>
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InstitutionInfo)
