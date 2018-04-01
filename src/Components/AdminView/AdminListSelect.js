import React, {Component} from 'react';
import {connect} from 'react-redux'

import { Menu, MenuItem, Subheader, Divider } from 'material-ui'

import * as StateActions from '../../Actions/state';

class AdminListSelect extends Component {

    render () {

        return (
            <div style={{width: "100%"}}>

                <Subheader>Ceremonies</Subheader>
                <Menu style={{width: "100%"}}>
                    <MenuItem>Item</MenuItem>
                    <Divider/>

                    <MenuItem>Item</MenuItem>
                    <Divider/>

                    <MenuItem style={{whiteSpace: 'normal', lineHeight: "120%"}}>asasa bndi iuebfhierfnh ujrhngfrjghoe jnfrijgfn jrngijrgf ngfjirn nirnrgrjkgfn ruirn iwgfj nirhgb rnj rgirhngf rjgfhnrgugfneig rngn wefnerijgnerij gnrjg i</MenuItem>
                    <Divider/>

                    <MenuItem style={{whiteSpace: 'normal', lineHeight: "120%"}}>asasa bndi iuebfhierfnh ujrhngfrjghoe jnfrijgfn jrngijrgf ngfjirn nirnrgrjkgfn ruirn iwgfj nirhgb rnj rgirhngf rjgfhnrgugfneig rngn wefnerijgnerij gnrjg i</MenuItem>
                    <Divider/>

                    <MenuItem style={{whiteSpace: 'normal', lineHeight: "120%"}}>asasa bndi iuebfhierfnh ujrhngfrjghoe jnfrijgfn jrngijrgf ngfjirn nirnrgrjkgfn ruirn iwgfj nirhgb rnj rgirhngf rjgfhnrgugfneig rngn wefnerijgnerij gnrjg i</MenuItem>
                    <Divider/>

                    <MenuItem>Item</MenuItem>
                    <Divider/>

                    <MenuItem>Item</MenuItem>
                </Menu>

            </div>
        );
    }
}

class AdminListSelectItem extends Component {

    render() {
        return (
            <div>
                <MenuItem>{this.props.itemName}</MenuItem>
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
        setFirebaseDataDir: (newDir) => dispatch(StateActions.setFirebaseDataDirectory(newDir))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminListSelect)