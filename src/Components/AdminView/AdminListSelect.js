import React, {Component} from 'react';
import {connect} from 'react-redux'

import { FloatingActionButton, Paper } from 'material-ui'
// import ContentAdd from 'material-ui/svg-icons/content/add'
import AvPlaylistAdd from 'material-ui/svg-icons/av/playlist-add'

import NewListDialog from './Dialogs/NewListDialog'

// import * as StateActions from '../../Actions/state';
import * as UserSessionActions from '../../Actions/userSession'
import palette from '../../Resources/colorPalette';

class AdminListSelect extends Component {

    constructor(props) {
        super(props)

        this.setSelectedList = this.setSelectedList.bind(this)

        this.state = {
            createListDialogOpen: false
        }
    }

    openCreateListDialog = () => {
        this.setState({createListDialogOpen: true})
    }

    closeCreateListDialog = () => {
        this.setState({createListDialogOpen: false})
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
            this.props.setSelectedList(newListID)
        }
    }

    paperStyle = {
        width:"95%",
        height:"95%",
        margin:"10px auto",
        overflow:"auto",
        backgroundColor: palette.blue_light
    }

    newListButtonStyle = {
        margin:"20px auto",
        width:"60px"
    }

    render () {
        return (
            <div style={{width: "100%", height: "100%", maxHeight: "100%", position: "relative", overflow:"hidden"}}>

                <Paper zDepth={2} style={this.paperStyle}>
                    <h4 style={{fontWeight:"normal", marginLeft:"15px"}}>List Management</h4>
                        
                        {this.getCompanyListKeys().map(
                            x => <AdminListSelectItem
                                key={x}
                                itemKey={x}
                                itemName={this.props.userSession.companyLists[x].listName}
                                selectedList={this.props.userSession.selectedList}
                                setSelectedList={this.setSelectedList}/>
                        )}
                    <div style={this.newListButtonStyle}>
                        <FloatingActionButton
                            backgroundColor={palette.green_dark}
                            onClick={this.openCreateListDialog}
                        >
                            <AvPlaylistAdd/>
                        </FloatingActionButton>
                    </div>

                </Paper>
                
                <NewListDialog
                    isOpen={this.state.createListDialogOpen}
                    onRequestClose={this.closeCreateListDialog}
                    />
            </div>
        );
    }
}

class AdminListSelectItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hovered: false
        }
    }

    setHovered = () => {
        this.setState({hovered: true})
    }

    setNotHovered = () => {
        this.setState({hovered: false})
    }

    isSelected = () => {
        return this.props.selectedList === this.props.itemKey
    }

    getPaperStyle = () => { 
        return {  
            width: "95%",
            margin: "auto",
            padding: "12px",
            cursor: "pointer",
            overflow:"auto",
            background: this.isSelected() ? palette.gray_dark : this.state.hovered ? "lightblue" : "white",
            height: this.isSelected() ? "90px" : "50px"
        }
    }

    render() {
        return (
            <div style={{margin: "0 0 6px 0"}}>
                <Paper
                    zDepth={this.isSelected() ? 2 : 1}
                    style={this.getPaperStyle()}
                    onClick={this.props.setSelectedList(this.props.itemKey)}
                    onMouseEnter={this.setHovered}
                    onMouseLeave={this.setNotHovered}
                >
                    <p style={{textAlign: "center", margin: "0", padding:"0"}}>{this.props.itemName}</p>
                </Paper>
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
        // addNewAttendee: newAttendeeName => dispatch(UserSessionActions.addNewAttendee(newAttendeeName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminListSelect)