export const convertTo24Hour = (time: string) => {
    const [timePart, modifier] = time.split(" ");
    let hours = timePart.split(":")[0];
    const minutes = timePart.split(":")[1];
    if (modifier === "PM" && hours !== "12") {
        hours = String(parseInt(hours) + 12);
    }
    if (modifier === "AM" && hours === "12") {
        hours = "00";
    }
    return `${hours}:${minutes}:00`;
};

export const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};