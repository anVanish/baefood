const timeToVN = {
    breakfast: 'Buổi sáng',
    lunch: 'Buổi trưa',
    dinner: 'Buổi tối',
};

export const formatServeTimeToVN = (serveTime) => {
    return timeToVN.hasOwnProperty(serveTime) ? timeToVN[serveTime] : 'Unknown';
};

export const formatServeDate = (serveDate) => {
    const date = new Date(serveDate);
    return date.toLocaleDateString('en-GB');
};
