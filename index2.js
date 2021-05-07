const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./printPassTimes');

nextISSTimesForMyLocation()
  .then(passTimes => printPassTimes(passTimes))
  .catch(error => console.log(error.message));
