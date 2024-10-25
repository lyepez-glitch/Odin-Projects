import { format } from "date-fns";

function getDate() {
    const timestamp = Date.now();


    const currentDate = new Date(timestamp);



    const date = format(currentDate, "MM/dd/yyyy");
    return date;
}


export default getDate;