
class _DatabaseHandler {

    companyTemplate = {
        companyName: "",

        _Lists:{}
    }

    listTemplate = {
        listName: "",
        ceremonyDate: "",
        uploadCutoffData: "",
        nextOrderPos: 0,

        _Attendees: {}
    }

    attendeeTemplate = {
        audioNeedsReplacement: false,
        audioIsVerified: false,
        audioVolumeModifer: 1,
        startTime: 0,

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