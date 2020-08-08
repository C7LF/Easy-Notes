// Date Formatter
export const formattedDate = nPDate => {
    const createdDateParsed = new Date(Date.parse(nPDate))
    const day = createdDateParsed.getDate()
    const monthIndex = createdDateParsed.getMonth()
    const year = createdDateParsed.getFullYear()

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December",];

    const formattedString = `${day} ${month[monthIndex]} ${year}`
    
    return formattedString
}