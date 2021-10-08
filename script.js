

function mainBlock() {
  // This will display the current day on screen. 
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

  // This will change the color of the blocks accordingly and it will set the interval to change every minute. 
  changeBlockColor();
  setInterval(changeBlockColor, 60000);

  // Local storage updating 
  $(".time-block").each(function() {
    var blockId = $(this).attr("id");
    $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });

  // attach our handler for the save buttons
  $(".saveBtn").on("click", handleSave);
};
$(mainBlock);


function changeBlockColor() {
  // using .each method for timeblock.
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").replace("hour-", ""));
    var currentHour = parseInt(moment().format("H"));
    // This will remove classes accordingly.
    $(this).removeClass("past present future");
    // this if/else statement will add class to color dependeing on the time.
    if (blockHour < currentHour) {
      $(this).addClass("past");
      console.log("Past", $(this))
    } else if (blockHour > currentHour) {
      $(this).addClass("future");
      console.log("Future", $(this))
    } else {
      $(this).addClass("present");
      console.log("Present", $(this))
    }
  });
};

function handleSave(event) {
  // Acquiring the ID of the parent.
  var hourId = $(this).parent().attr("id");
  // saving to local storage.
  localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " textarea").val());
};