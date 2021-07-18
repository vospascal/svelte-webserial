const pedalSmoothFilter = (cleanString) => {
    const regex = /(SMOOTH:([\d\-\\n]+))/gm;
    const matchFoundPedalSmooth = cleanString.match(regex);
    if (matchFoundPedalSmooth) {
        console.log(cleanString,'cleanString');
        const splitPedalSmooth = cleanString.replaceAll("SMOOTH:", "").split("-");

        const throttleSmooth = splitPedalSmooth[0];
        const brakeSmooth = splitPedalSmooth[1];
        const clutchSmooth = splitPedalSmooth[2];

        return {
            throttleSmooth: throttleSmooth,
            brakeSmooth: brakeSmooth,
            clutchSmooth: clutchSmooth,
        }
    }
}

export default pedalSmoothFilter;