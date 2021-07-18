const splitPedalInputToMap = (items, toReplace) => {
    const map = {}
    const splitItems = items.replaceAll(toReplace, "").split(";");

    map.after = parseInt(splitItems[0]);
    map.before = parseInt(splitItems[1]);
    map.raw = parseInt(splitItems[2]);
    map.hid = parseInt(splitItems[3]);
    return map;
}

const generalFilter = (cleanString) => {
    const splitPedalInput = cleanString.split(",");
    if (splitPedalInput.length > 2) {
        const throttleValues = splitPedalInputToMap(splitPedalInput[0], "T:");
        const brakeValues = splitPedalInputToMap(splitPedalInput[1], "B:");
        const clutchValues = splitPedalInputToMap(splitPedalInput[2], "C:");
        return {
            throttle: {
                after: throttleValues.after || 0,
                before: throttleValues.before || 0,
                raw: throttleValues.raw || 0,
                hid: throttleValues.hid || 0,
            },
            brake: {
                after: brakeValues.after || 0,
                before: brakeValues.before || 0,
                raw: brakeValues.raw || 0,
                hid: brakeValues.hid || 0,
            },
            clutch: {
                after: clutchValues.after || 0,
                before: clutchValues.before || 0,
                raw: clutchValues.raw || 0,
                hid: clutchValues.hid || 0,
            },
        }
    }
}

export default generalFilter;