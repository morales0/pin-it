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

var formatDateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

/** 
 * When user clicks on pin-it button, they will be offered groups. 
 * Then they can create a new task.
 */
function pinit(){
   
}
/**
 * Will map a new group with a color
 * @param {string} name 
 * @param {string} color 
 */
function createNewGroup(name, color){
   /* Add to database this new group */
   return {name: name, color: color};
}

/**
 * Creates a new task with specified parameters. 
 * Add to the database and show on screen.
 * @param {*} name 
 * @param {JSON} group 
 * @param {*} due 
 * @param {*} id 
 */
function createTask(name, group, due, id){
   task = new Task(name, group, due, id);
   $('#app-container').append(task.getHTML())
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

function bannerHTML(id, dateStr){
   return '<div class="day-block" id="' + id + '">' +
            '<div class="banner">' +
               '<span class="day-text">' + dateStr + '</span>'+
            '</div>' +
          '</div>';
}

/**
 * Returns a unique id for the task which will be used in
 * the html and in the database. 
 * @param {Task} task 
 */
function hash(task){
   return task.name + "-" + task.group + "-" + task.due;
}


/**** BUTTON FUNCTIONALITY ****/
var currPage = 'tobdo-list';

$('#today-page-option').on('click', function(){
   if (currPage != 'today'){
      currPage = 'today';
      document.getElementById('today-page-option').style.border = "1px solid var(--main-dark-blue)";
      document.getElementById('todo-list-page-option').style.border = "1px solid gainsboro";
   }
});

$('#todo-list-page-option').on('click', function(){
   if (currPage != 'todo-list'){
      currPage = 'todo-list';
      document.getElementById('today-page-option').style.border = "1px solid gainsboro";
      document.getElementById('todo-list-page-option').style.border = "1px solid var(--main-dark-blue)";  
   }
});