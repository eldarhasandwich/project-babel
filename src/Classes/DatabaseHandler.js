
class _DatabaseHandler {

    companyTemplate = {
        companyName: "",

        _LISTS:{}
    }

    listTemplate = {
        listName: "",
        ceremonyDate: "",
        uploadCutoffData: "",
        nextOrderPos: 0,

        _ATTENDEES: {}
    }

    attendeeTemplate = {
        audioNeedsReplacement: false,
        audioIsVerified: false,
        audioVolumeModifer: 1,

        orderPos: 0,
        name: "",
        textA: "",
        textB: ""
    }

    createNewCompany(thisName) {
        return {...this.companyTemplate, name: thisName}
    }

    createNewList(thisName, thisCeremonyDate, thisCutoffDate) {
        return {
            ...this.listTemplate,
            listName: thisName,
            ceremonyDate: thisCeremonyDate,
            uploadCutoffData: thisCutoffDate
        }
    }

    createNewAttendee(thisName, thisOrderPos) {
        return {
            ...this.attendeeTemplate,
            name: thisName,
            orderPos: thisOrderPos
        }
    }

}

DatabaseHandler = new _DatabaseHandler();

export default DatabaseHandler;