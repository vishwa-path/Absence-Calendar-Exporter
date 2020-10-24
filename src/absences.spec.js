import assert from 'assert';
import { getFormattedDateTime } from './App/AbsenceTable';
import { getUserName, createEventData, getSubject, getFilteredData } from './App/Home';

describe("AbsenceTable", function () {
  it("get formatted date time by timestamp", function () {
    assert.equal(getFormattedDateTime("2017-01-09T18:43:29.000+01:00"), '09-Jan-2017 18:43:29');
  });
});

describe("HomeComponent", function () {
  
  it("get user name by id", function () {
    assert.equal(getUserName(5293), 'Daniel');
  });

  it("get event data in the event format", function () {
    const result = {
      title: 'Daniel is on vacation',
      start: '2017-01-09',
      end: '2017-01-09',
      calName: 'Absence Calendar'
    };
    assert.deepEqual(createEventData("Daniel is on vacation", '2017-01-09', '2017-01-09', 'Absence Calendar'),
      result);
  });

  it("get event subject with name and type as sick", function () {
    assert.equal(getSubject("Mike", 'sickness'), 'Mike is sick');
  });

  it("get event subject with name and type as vacation", function () {
    assert.equal(getSubject("Ines", 'vacation'), 'Ines is on vacation');
  });

  it("get filtered data by query params", function () {
    const array = getFilteredData("?userId=5293");    
    assert.equal(array.length, 7);
  });
});