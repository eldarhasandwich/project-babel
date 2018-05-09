import React, {Component} from 'react';

class HelpInformation extends Component {
    render() {
        return (
            <div>

                <p>{`Hello There ${this.props.companyName}! Welcome to the Vocalist Private Beta. You can view this help information anytime by pressing the ‘Help’ button at the top right of the screen.`}</p>

                <h4>Getting Started:</h4>

                <p>To create a new list, press the green ‘add list’ button in the List Management panel. Follow the prompts to add your event details. You should see your new list appear within the List Management panel.</p>

                <p>Select your list by left clicking on its tab within the List Management panel to view summary information. An overview of the event is shown at the top panel, including the percentage of audio responses that have been received and verified, the total number of entries flagged for reupload, general event details and the Action Center.</p>

                <p>The Action Center allows you to perform the following:</p>

                <ul>
                    <li>Import Attendees: Add attendees to your lists (individual upload and CSV format currently supported). The CSV Uploader will interpret your file and ask you to confirm the import structure is correct before continuing. Using two columns titled Name and Email with the appropriate information in the following rows is well-supported.</li>
                    <li>Announcer Mode: Enters our prototype announcer mode on the currently selected list, allowing you to easily step through each individual one-by-one.</li>
                    <li>Request Audio: Provides the ability to distribute audio requests to all individuals in the lists. Each will be sent a unique link to upload their data to the service</li>
                    <li>Delete List: Does as it says on the tin!</li>
                </ul>

                <p>Below the summary panel is the attendee list itself. Search and filters are available for your convenience. You can lock and unlock ‘drag-and-drop’ dynamic sorting by click on the sorting padlock button at the top of the attendee list, the list will turn red to confirm it is unlocked.</p>

                <p>Selecting an individual within the attendee list will bring up expanded user options that allow you to; Play Audio, Verify the Attendee Audio as of acceptable quality, Flag the Audio File as needing replacement by attendee, and Contact the individual via email.</p>

                <p>Don’t hesitate to contact us directly if you encounter any bugs or issues.</p>

            </div>
        )
    }
}

export default HelpInformation