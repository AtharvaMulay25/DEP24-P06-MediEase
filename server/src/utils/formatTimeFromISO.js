const formatTimeFromISO = (isoDateString) => {
    const date = new Date(isoDateString);

    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return timeString;
}

module.exports = formatTimeFromISO;