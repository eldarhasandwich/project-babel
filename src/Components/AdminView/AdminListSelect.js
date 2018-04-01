import React, {Component} from 'react';
import {connect} from 'react-redux'

import { Menu, MenuItem, Subheader, Divider, FlatButton } from 'material-ui'

import * as StateActions from '../../Actions/state';
import * as UserSessionActions from '../../Actions/userSession'

class AdminListSelect extends Component {

    constructor(props) {
        super(props)

        this.setSelectedList = this.setSelectedList.bind(this)
    }

    getCompanyListKeys = () => {
        let lists = this.props.userSession.companyLists
        if (lists === undefined || lists === null) {
            return []
        }
        return Object.keys(lists)
    }

    setSelectedList (newListID) {
        return () => {
            console.log(newListID)
            this.props.setSelectedList(newListID)
        }
    }

    createNewList = newListName => {
        this.props.createNewList("New List")
    }

    render () {
        return (
            <div style={{width: "100%"}}>

                <Subheader style={{paddingLeft:"0px"}}>Ceremonies</Subheader>
                <Menu style={{width: "100%"}}>
                    {this.getCompanyListKeys().map(
                        x => <AdminListSelectItem
                            key={x}
                            itemKey={x}
                            itemName={this.props.userSession.companyLists[x].listName}
                            setSelectedList={this.setSelectedList}/>
                    )}
                </Menu>
                <FlatButton
                    label={"Create new List"}
                    onClick={
                        this.createNewList
                    }

                />

            </div>
        );
    }
}

class AdminListSelectItem extends Component {

    menuItemStyle = {whiteSpace: 'normal'}

    render() {
        return (
            <div>
                <MenuItem 
                    style={this.menuItemStyle}
                    onClick={this.props.setSelectedList(this.props.itemKey)}
                >
                    {this.props.itemName}
                </MenuItem>
                <Divider/>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {state: state.state, userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedList: newListID => dispatch(UserSessionActions.setSelectedList(newListID)),
        createNewList: newListName => dispatch(UserSessionActions.createNewList(newListName)),
        addNewAttendee: newAttendeeName => dispatch(UserSessionActions.addNewAttendee(newAttendeeName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminListSelect)