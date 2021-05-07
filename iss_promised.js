const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = ipData => {
  const ip = JSON.parse(ipData).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = locationData => {
  const { latitude, longitude } = JSON.parse(locationData);
  return request(`http://api.open-notify.org/iss/v1/?lat=${latitude}&lon=${longitude}&alt=1650`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      return JSON.parse(data).response;
    });
};

module.exports = { nextISSTimesForMyLocation };