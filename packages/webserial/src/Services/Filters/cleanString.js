const cleanString = (line) => {
    return line.replaceAll("\r", "").replaceAll("\n", "")
}

export default cleanString;