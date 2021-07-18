const pedalCalibrationFilter = (cleanString) => {
    const regex = /(TCALI:([\d\-\\n]+),BCALI:([\d\-\\n]+),CCALI:([\d\-\\n]+))/gm
    const matchFoundPedalCalibration = cleanString.match(regex);

    if (matchFoundPedalCalibration) {
        console.log(cleanString, 'cleanString');
        const splitPedalCalibration = cleanString.split(",");

        const throttleCalibration = splitPedalCalibration[0].replaceAll("TCALI:", "").split("-").map(function (item) {
            return parseInt(item, 10);
        });
        const brakeCalibration = splitPedalCalibration[1].replaceAll("BCALI:", "").split("-").map(function (item) {
            return parseInt(item, 10);
        });
        const clutchCalibration = splitPedalCalibration[2].replaceAll("CCALI:", "").split("-").map(function (item) {
            return parseInt(item, 10);
        });

        return {
            throttleCalibration: throttleCalibration,
            brakeCalibration: brakeCalibration,
            clutchCalibration: clutchCalibration,
        }
    }
}

export default pedalCalibrationFilter;