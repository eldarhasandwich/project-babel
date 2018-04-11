
import Papa from 'papaparse'

function RemoveQuotesFromString (string) {
    let strArr = string.split('')
    let newString = ""
    strArr.forEach(element => {
        newString = newString + ((element !== '"' || element !== "'") ? element : "")
    });
    return newString
}

export default function CSVtoArray (CSVString) {

    let data = Papa.parse(CSVString)
    let csvData = data.data.filter(x => x.length === 2)
    let csvHeaders = csvData.shift()
    
    return {nameHeader: csvHeaders[0], emailHeader: csvHeaders[1], data: csvData}
}