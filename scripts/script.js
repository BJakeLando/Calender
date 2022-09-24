
var importantIcon= "fas fa-star";
var nonImportantIcon= "far fa-star";
var isImportant = false;

var isVisible = true;




function saveTask() {
    console.log("Button clicked");

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
