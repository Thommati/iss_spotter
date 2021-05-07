const printPassTimes = passTimes => {
  for (const passTime of passTimes) {
    const date = new Date(passTime.risetime * 1000);
    console.log(`Next pass at ${date} for ${passTime.duration} seconds`);
  }
};

module.exports = { printPassTimes };
