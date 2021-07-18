const pedalBitsFilter = (cleanString) => {
    const regex = /(BITS:([\d\-\\n]+))/gm
    const matchFoundPedalBits = cleanString.match(regex);
    if (matchFoundPedalBits) {
        console.log(cleanString,'cleanString');
        const splitPedalBits = cleanString.replaceAll("BITS:", "").split("-");

        const throttleBitRaw = splitPedalBits[0];
        const throttleBitHid = splitPedalBits[1];
        const brakeBitRaw = splitPedalBits[2];
        const brakeBitHid = splitPedalBits[3];
        const clutchBitRaw = splitPedalBits[4];
        const clutchBitHid = splitPedalBits[5];

        const throttleBits = [throttleBitRaw, throttleBitHid];
        const brakeBits = [brakeBitRaw, brakeBitHid];
        const clutchBits = [clutchBitRaw, clutchBitHid];

        return {
            throttleBits: throttleBits,
            brakeBits: brakeBits,
            clutchBits: clutchBits,
        }
    }
}

export default pedalBitsFilter;