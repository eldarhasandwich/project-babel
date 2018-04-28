
class _DatabaseHandler {

    companyTemplate = {
        companyName: "",

        _LISTS:{}
    }

    listTemplate = {
        listName: "",
        ceremonyDate: "",
        ceremonyTime: "",
        ceremonyLocation: "",
        uploadCutoffDate: "",

        _ATTENDEES: {}
    }

    attendeeTemplate = {
        audioStatus: "No Audio", // Unverified, Needs Replacement, Verified *tick*
        awaitingResponse: false,
        audioVolumeModifer: 1,

        orderPos: 0,
        name: "",
        textA: "",
        textB: "",
        contactEmail: ""
    }

    createNewCompany(thisName) {
        return {...this.companyTemplate, name: thisName}
    }

    createNewList(_listName, _ceremonyDate = "", _ceremonyTime = "", _cutoffDate = "") {
        return {
            ...this.listTemplate,
            listName: _listName,
            ceremonyDate: _ceremonyDate,
            ceremonyTime: _ceremonyTime,
            uploadCutoffData: _cutoffDate
        }
    }

    createNewAttendee(thisName, thisEmail, thisOrderPos) {
        return {
            ...this.attendeeTemplate,
            name: thisName,
            contactEmail: thisEmail,
            orderPos: thisOrderPos
        }
    }

}

let DatabaseHandler = new _DatabaseHandler();

export default DatabaseHandler;