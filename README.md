# Absence Calendar Exporter
## Functions
* Get a list of absences including the names of the employee (using api.js).
* Generate an iCal file and import it into outlook (through a download link in the web app).
* See vacations of employees as "#{member.name} is on vacation" (in ics file).
* See sickness of my employees as "#{member.name} is sick" (in ics file).
* Can go to http://localhost:3000 and download the iCal file.
* Can go to http://localhost:3000?userId=123 and only receive the absences of the given user.
* Can go to http://localhost:3000?startDate=2017-01-01&endDate=2017-02-01 and only receive the absences in the given date range.
## Prerequisites
* Install node
* npm installation
```
npm i
```
## Testing Specifications
* For testing spec.js ,
```
npm run test
```
* For starting web application ,
```
npm start
```

