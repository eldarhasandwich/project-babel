import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as StateActions from '../../Actions/state';

import AdminListSelect from './AdminListSelect'
import AdminListInterface from './AdminListInterface'

class AdminView extends Component {

    constructor(props) {
        super(props)

        this.onresize = this.onresize.bind(this)
    }

    setThisFirebaseDataDirectory (newDirectory) {
        this.props.setFirebaseDataDir(newDirectory.target.value)
    }

    listSelectStyle = {
        width: "250px",
        minWidth: "250px",
        float: "left"
    }

    getListInterfaceStyle = () => {
        return {
            width: (window.innerWidth - 250) + "px",
            float: "right"
        }
    }

    onresize () {
        this.forceUpdate()
    }

    componentDidMount () {
        window.addEventListener('resize', this.onresize)
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.onresize)
    }

    render () {
        if (!this.props.userSession.isLoggedIn) {
            return (
                <h4>You are not logged in</h4>
            )
        }

        return (
            <div
                style={{width: "100%", minWidth:"100%"}}>

                <div
                    style={this.listSelectStyle}>
                    <AdminListSelect/>
                </div>
                <div
                    style={this.getListInterfaceStyle()}>
                    <AdminListInterface/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setFirebaseDataDir: (newDir) => dispatch(StateActions.setFirebaseDataDirectory(newDir))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminView)