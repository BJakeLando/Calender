var importantIcon = "fas fa-star";
var nonImportantIcon = "far fa-star";
var isImportant = false;

var isVisible = true;

function saveTask() {
  let title = $("#txtTitle").val();
  let description = $("#txtDescription").val();
  let dueDate = $("#txtDueDate").val();
  let tag = $("#txtTag").val();
  let category = $("#txtCategory").val();
  let color = $("#txtColor").val();

  // console.log("values", title, description,dueDate,tag,category,color);

  let task = new Task(title, description, dueDate, tag, color, category);

  //save on server
  $.ajax({
    type: "POST",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json;",
    success: function (response) {
      displayTask(task);
      clearForm(task);
      console.log("server says", response);
    },
    error: function (details) {
      console.log("save failed", details);
      alert("Error, we could not save your task");
    },
  });
}

function displayTask(task) {
  console.log(task);

  let syntax = `
        <div class="task"> 
            <div id="task-header">
                <h3>${task.title}</h3> 
                <p id="taskDate">${task.dueDate}</p> 
            </div>
            <div>
                <h3 id=taskCategory>${task.category}</h3> 
                <p>${task.tag}</p> 
            </div>
        </div>`;

  $("#taskList").append(syntax);
}

function clearForm() {
  $("#txtTitle").val("");
  $("#txtDescription").val("");
  $("#txtDueDate").val("");
  $("#txtCategory").val("");
}

function iconUI() {
  if (!isImportant) {
    //change to important
    $("#iImportant").removeClass(nonImportantIcon).addClass(importantIcon);
    isImportant = true;
  } else {
    // change to non important
    $("#iImportant").removeClass(importantIcon).addClass(nonImportantIcon);
    isImportant = false;
  }
}

function hideTask() {
  if (isVisible) {
    //hide it
    $(".info").hide();
    isVisible = false;
  } else {
    //show it
    $(".info").show();
    isVisible = true;
  }
}

function fetchTasks() {
  $.ajax({
    type: "GET",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function (response) {
      let allTasks = JSON.parse(response);

      //Travel the array
      //Get every task and send it to displayTask
      for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        //display only your tasks
        //if the name on the task is equal to my name
        if (task.name == "Brandon") {
          displayTask(task);
        }
      }
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function testRequest() {
  // this is a test http request
  $.ajax({
    type: "GET",
    url: "https://fsdiapi.azurewebsites.net/",
    success: function (data) {
      //Respons from the server
      console.log(data);
    },
    error: function (details) {
      //details about error
      console.log("Error", details);
    },
  });
}

function init() {
  console.log("Task Manager");

  // load prev data
  fetchTasks();

  // catch events
  $("#btnSave").click(saveTask);
  $("#iImportant").click(iconUI);
  $("#hideTask").click(hideTask);
}

window.onload = init;
