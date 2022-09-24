
var importantIcon= "fas fa-star";
var nonImportantIcon= "far fa-star";
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

    let task= new Task(title,description,dueDate,tag,color,category);

    displayTask(task);
    clearForm(task);

}

function displayTask(task) {
    console.log(task);

    let syntax =`
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

    $("#taskList").append(syntax)
}

function clearForm() {
    
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#txtDueDate").val("");
    $("#txtCategory").val("");
    

}

function iconUI(){
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
    if(isVisible) {
        //hide it
        $(".info").hide();
        isVisible = false;
    }
    else {
        //show it
        $(".info").show();
        isVisible = true;
    }

}

function init() {
    console.log("Task Manager");
// load prev data

// catch events
$("#btnSave").click(saveTask);

$("#iImportant").click(iconUI);
$("#hideTask").click(hideTask);

}

window.onload=init;
