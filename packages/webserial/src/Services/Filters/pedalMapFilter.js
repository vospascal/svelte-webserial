const pedalMapFilter = (cleanString) => {
    const regex = /(TMAP:([\d\-\n]+),BMAP:([\d\-\n]+),CMAP:([\d\-\n]+))/gm;
    const matchFoundPedalMap = cleanString.match(regex);

    if (matchFoundPedalMap) {
        console.log(cleanString, 'cleanString');
        const splitPedalMap = cleanString.split(",");

        const throttleMap = splitPedalMap[0].replaceAll("TMAP:", "").split("-").map(function (item) {
            return parseInt(item, 10);
        });
        const brakeMap = splitPedalMap[1].replaceAll("BMAP:", "").split("-").map(function (item) {
            return parseInt(item, 10);
        });
        const clutchMap = splitPedalMap[2].replaceAll("CMAP:", "").split("-").map(function (item) {
            return parseInt(item, 10);
        });

        return {
            throttleMap : throttleMap,
            brakeMap: brakeMap,
            clutchMap: clutchMap
        }
    }
}

export default pedalMapFilter;