const pedalInvertedFilter = (cleanString) => {
    const regex = /(INVER:([\d\-\\n]+))/gm
    const matchFoundPedalInverted = cleanString.match(regex);
    if (matchFoundPedalInverted) {
        console.log(cleanString, 'cleanString');
        const splitPedalInverted = cleanString.replaceAll("INVER:", "").split("-");

        const throttleInverted = splitPedalInverted[0];
        const brakeInverted = splitPedalInverted[1];
        const clutchInverted = splitPedalInverted[2];

        return {
            throttleInverted: throttleInverted,
            brakeInverted: brakeInverted,
            clutchInverted: clutchInverted,
        }
    }
}

export default pedalInvertedFilter;