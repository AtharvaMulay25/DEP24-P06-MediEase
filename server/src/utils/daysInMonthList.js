const daysInMonth = (month, year) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
};

const dateFormat = (day, month, year) => {
    day += 1;
    month += 1;
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`; 
};

const daysInMonthList = async(month, year) => {
    const days = daysInMonth(month, year);
    const daysList = [];
    
    for (let i=0; i<days; i++) {
        daysList.push({
            date: dateFormat(i, month, year),
            total: 0
        });
    }

    return { daysList };
};

module.exports = {
    daysInMonth,
    daysInMonthList
}