const splitPedalInputToMap = (items, toReplace) => {
    const map = {}
    const replaced = items.replaceAll(toReplace, "");
    const splitItems = replaced.split(";");

    map.after = parseInt(splitItems[0]);
    map.before = parseInt(splitItems[1]);
    map.raw = parseInt(splitItems[2]);
    map.hid = parseInt(splitItems[3]);
    return map;
}

const pedalmapPositionFilter = (cleanString) => {
    const regex = /(T:((\d+\.\\d+|\d+)+[;,])+)(B:((\d+\.\d+|\d+)+[;,])+)(C:((\d+\.\d+|\d+)+[;,])+)/gm;
    const matchFoundPedalInput = cleanString.match(regex);

    if (matchFoundPedalInput) {
        const splitPedalInput = cleanString.split(",");
        if (splitPedalInput.length > 2) {
            const throttleValues = splitPedalInputToMap(splitPedalInput[0], "T:");
            const brakeValues = splitPedalInputToMap(splitPedalInput[1], "B:");
            const clutchValues = splitPedalInputToMap(splitPedalInput[2], "C:");
            return {
                throttle: {
                    x: throttleValues.after || 0,
                    y: throttleValues.before || 0,
                    r: 3 //ticks size
                },
                brake: {
                    x: brakeValues.after || 0,
                    y: brakeValues.before || 0,
                    r: 3 //ticks size
                },
                clutch: {
                    x: clutchValues.after || 0,
                    y: clutchValues.before || 0,
                    r: 3 //ticks size
                },
            }
        }
    }

    return {
        throttle: {
            x: 0,
            y:0
        },
        brake: {
            x: 0,
            y:0
        },
        clutch: {
            x: 0,
            y:0
        },
    }
}

export default pedalmapPositionFilter;