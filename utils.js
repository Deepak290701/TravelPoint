



function getCurrentDateandTime(){
const date = new Date();
const currDate = date.getDate().toString();
const currMonth = (date.getMonth+1).toString();
const currYear = date.getFullYear().toString();
const currHour = date.getHours().toString();
const currMinutes = date.getMinutes().toString();
const currSeconds = date.getSeconds().toString();
const currMilliseconds = date.getMilliseconds().toString();

return currDate+currMonth+currYear+currHour+currMinutes+currSeconds+currMilliseconds;

}

module.exports ={
    getCurrentDateandTime
}