
import Fire from '../Classes/Fire'

export function setUserLoggedIn (bool) {
    return {
        type: "SET_USER_LOGGED_IN",
        bool
    }
}

export function setUserCompany () {
    return (dispatch, getState) => {
        let state = getState()
        Fire
            .database()
            .ref("_COMPANIES/" + state.userSession.userCompanyID)
            .on("value", function(snapshot) {
                dispatch({
                    type: "SET_USER_COMPANY",
                    companyID: state.userSession.userCompanyID,
                    companyName: snapshot.val().companyName,
                    companyLists: snapshot.val()._LISTS
                })
            }, function(error) {
                console.log("couldn't get company name")
            })
    }
}