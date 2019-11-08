var accessToken =
   "113~yx5LBQDrCgBkNQosFXdAIn8K4rCCXZerEeUvKsET1ZQtBSPIEdc2GMCmm9E2y45w";

/*
$.ajax({
   type: "GET",
   url: "https://umd.beta.instructure.com/api/v1/courses",
   dataType: "json",
   headers: {
      Authorization: "Bearer " + accessToken,
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
      "Content-Type": "application/json",
      Accept: "application/json"
   },
   success: function(data) {
      data.forEach(element => {
         console.log(element.name);
      });
   }
});
*/

/**
 * Represents a task and its display on the page. Has a variety of characteritics:
 * name: Name of the task that appears on the page.
 * group: The group (category) that this task belongs to
 * due: The date this assignment is due
 * id: unique identifier for this task (used for its html element and hashing)
 */

class Task {
   constructor(name, group, due, id){
      this.name = name;
      this.group = group;
      this.due = due;
      this.id = id;
   }

   getHTML(){
      return '<div class="todo-block" id="' + this.id + '">\n' +
               '<img src="/pinit-pwa-1.0/images/red-pin.png" height="25" width="25">\n' +
               '<div class="todo-item homework">\n' +
                  '<span class="group">' + this.group + '</span>\n' +
                  '<span class="item-name">' + this.name + '</span>\n' +
               '</div></div>';
   }

}


var date = new Date();
var formatDateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

/**
 * Represents an array of task objects (sorted by due date)
 * Contains the id numbers
 */
var tasks = []

function createTask(name, group, due, id){
   task = new Task(name, group, due, id);
   $('#app-container').append(task.getHTML())
}

function getDays(num){
   var dateArray = [];
   var curr = new Date();

   for (let i = 0; i < num; i++) {
      curr = getNextDay(curr);
      console.log(curr.getMonth()+1 + "-" + curr.getDate() + "-" + curr.getFullYear());
   }
}

/**
 * Returns a date object that is the day after currDay.
 * Adds 24 hours to the time
 * @param {Date} currDay 
 */
function getNextDay(currDay){
   var newDay = new Date();
   newDay.setTime(currDay.getTime() + 8.64e+7);

   return newDay;
}

/**
 * Create initial time banners for the next five days
 */
function createTimeBanners(){
   var currDate = new Date();

   for (let i = 1; i < 5; i++){
      dateID = (currDate.getMonth() + 1) + "-" + currDate.getDate() + "-" + currDate.getFullYear();
      if (i == 1) {
         $('#app-container').append(bannerHTML(dateID, "Today"));
      } else if (i == 2) {
         $('#app-container').append(bannerHTML(dateID, "Tomorrow"));
      } else {
         $('#app-container').append(bannerHTML(dateID, currDate.toLocaleDateString("en-US", formatDateOptions)));
      }
         
      currDate = getNextDay(currDate);
   }
}


/* Helper functions */

function bannerHTML(id, dateStr){
   return '<div class="day-banner" id="' + id + '">' +
               '<span class="day">' + dateStr + '</span>'+
            '</div>';
}
