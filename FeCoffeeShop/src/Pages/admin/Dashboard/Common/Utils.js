export const formatNumberValue = (value, index) => {
    if (value >= 1000) return `${value / 1000}K`;
    else if (value >= 1000000) return `${value / 1000000}M`;
    return value;
};
export const handleFomatDate = (date) => {
    const startDate = new Date(date);

    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    const formattedStartDate = startDate
        .toLocaleDateString("en-US", options)
        .replace(/\//g, "-");
    return formattedStartDate;
};
