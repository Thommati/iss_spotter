const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { printPassTimes } = require('./printPassTimes');

/**
* Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
* Input:
*   - A callback with an error or results.
* Returns (via Callback):
*   - An error, if any (nullable)
*   - The fly-over times as an array (null if error):
*     [ { risetime: <number>, duration: <number> }, ... ]
*/
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, data);
      });
    });
  });
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('It didn\'t work', error);
  }
  printPassTimes(passTimes);
});

module.exports = { printPassTimes };
