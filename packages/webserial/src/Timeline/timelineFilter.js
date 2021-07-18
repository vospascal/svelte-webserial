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

const timelineFilter = (cleanString) => {
    const regex = /(T:((\d+\.\\d+|\d+)+[;,])+)(B:((\d+\.\d+|\d+)+[;,])+)(C:((\d+\.\d+|\d+)+[;,])+)/gm;
    const matchFoundPedalInput = cleanString.match(regex);

    if (matchFoundPedalInput) {
        // console.log(cleanString, 'cleanString');

        const splitPedalInput = cleanString.split(",");
        if (splitPedalInput.length > 2) {
            const ThrottleValues = splitPedalInputToMap(splitPedalInput[0], "T:");
            const BrakeValues = splitPedalInputToMap(splitPedalInput[1], "B:");
            const ClutchValues = splitPedalInputToMap(splitPedalInput[2], "C:");

            const time = new Date().getTime();
            return {
                throttle: {
                    x: time,
                    y: ThrottleValues.after || 0
                },
                brake: {
                    x: time,
                    y: BrakeValues.after || 0
                },
                clutch: {
                    x: time,
                    y: ClutchValues.after || 0
                }
            }
        }
    }

    return {
        throttle: {
            x: 0,
            y:0,
            r: 3
        },
        brake: {
            x: 0,
            y:0,
            r: 3
        },
        clutch: {
            x: 0,
            y:0,
            r: 3
        },
    }
}

export default timelineFilter;