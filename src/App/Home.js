import React, { Component } from 'react';

import absences from "../json_files/absences.json";
import members from "../json_files/members.json";
import moment from 'moment';
import download from 'downloadjs';
import AbsenceTable from './AbsenceTable';

let ics = require("ics")
const absenceList = absences.payload;

export const getUserName = (userId) => {
    const user = members.payload.find(member => member.userId === userId);
    return user.name;
}

export const getFilteredData = (searchValue) => {
    let params = new URLSearchParams(searchValue);
    let userId = params.get('userId');
    let startDate = params.get('startDate');
    let endDate = params.get('endDate');
    if (userId !== null && userId !== undefined && userId !== '') {
        const array = absenceList.filter(row => Number(row.userId) === Number(userId));
        return array;
    } else if (startDate !== null && endDate !== null) {
        const array = absenceList.filter(row => moment(row.startDate) >= moment(startDate) && moment(row.endDate) <= moment(endDate));
        return array;
    } else {
        return absenceList;
    }
}

export const createEventData = (title, start, end, calName) => {
    return { title, start, end, calName };
}

export const getSubject = (userName, type) => {
    if (type === 'sickness') {
        return userName + " is sick";
    } else {
        return userName + " is on " + type;
    }
}

export const getEvents = (filteredData) => {
    const events = filteredData.map((row) => {
        let userName = getUserName(row.userId);
        row.userName = userName;
        let subject = getSubject(userName, row.type);
        let start = moment(row.startDate).format();
        let end = moment(row.endDate).format();
        return createEventData(subject, moment(start).format('YYYY-M-D').split("-"), moment(end).add(1).format('YYYY-M-D').split("-"), 'AbsenceCalendar');
    });
    const { error, value } = ics.createEvents(events);
    if (error) {
        console.log(error)
        return
    }
    var button = document.createElement("button");
    button.innerHTML = "Download iCal File";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);
    button.addEventListener ("click", function() {
        download(value, "absence calendar.ics", "text/plain");
        return value;
    });
    

}
export default class Home extends Component {

    constructor(props) {
        super(props);
        const filteredData = getFilteredData(this.props.location.search);
        const fileValues = getEvents(filteredData);
        this.state = {
            filteredData: filteredData,
            fileValues: fileValues
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row col-12 justify-content-center">
                    <center>
                        <h1>Absence Calendar</h1>
                    </center>
                </div>
                <div>
                    <AbsenceTable data={this.state.filteredData} />
                </div>
            </div>
        )
    }
}