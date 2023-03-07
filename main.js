//cerate array of notes
let notes = [];

let isNewNoteAdded

//validate date input
dateInputVal();

//load array from storage
loadFromStorage();

//function loads storage if not empty
function loadFromStorage() {
    const jsonString = localStorage.getItem("notes");

    //parse only if storage not null 
    if (jsonString) {
        notes = JSON.parse(jsonString);
    }

    //display notes on pages
    displayArr();
}

//adds note to array
function addNote() {

    //prevent page refresh
    event.preventDefault();

    //get dom elements
    const descriptionText = document.getElementById("descriptionText");
    const dateInput = document.getElementById("dateInput");
    const timeInput = document.getElementById("timeInput");

    //create note object
    const note = {
        description: descriptionText.value,
        date: dateInput.value,
        time: timeInput.value
    };

    //add note to global array
    notes.push(note);

    // set isNewNoteAdded to true
    isNewNoteAdded = true;


    //display array on page
    displayArr();

    //clear inputs after submit
    descriptionText.value = "";
    dateInput.value = "";
    timeInput.value = "";
    descriptionText.focus();

    //save note to local storage
    saveToStorage();


}

//displays array on page
function displayArr() {

    //get dom elements
    const noteList = document.getElementById("noteList");

    //create html new note and giving id
    let html = "";

    for (let i = 0; i < notes.length; i++) {
        html += `
            <li id="newNote${i}"${isNewNoteAdded && i === notes.length - 1 ? " class='fade-in'" : ""}>
        
                <div id="deleteButtonBox">
                    <button id="deleteButton" onclick="deleteNote(${i})"> 
                    <img src="assets/images/trashcan.png" alt="trash-can">
                    </button>
                </div>
        
                <div id="noteDescription">${notes[i].description}</div>
                <div id="noteTimeDate">
                    <i class='far fa-calendar'></i>&nbsp;${notes[i].date}&nbsp; 
                    <i class='fa-regular fa-clock' ></i>&nbsp;${notes[i].time}
                </div>
        
        </li> `;

    }

    //insert new html into list
    noteList.innerHTML = html;

        // reset isNewNoteAdded to false
        isNewNoteAdded = false;
}

//convert note to string and saves to local storage
function saveToStorage() {
    const jsonString = JSON.stringify(notes);
    localStorage.setItem("notes", jsonString);
}

//deletes note by id, save to storage, display notes 
function deleteNote(index) {

    //user confirm for deleting note
    if (confirm(
        `* Deleted notes can't be restored!!
         * Continue with deleting note?`)) {

        notes.splice(index, 1);
    }
    //saving to storage and displaying arr
    saveToStorage();
    displayArr();
}

//validates date input 
function dateInputVal() {

    //get dom element
    const dateInput = document.getElementById("dateInput");

    //get current date
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    //set minimum date
    dateInput.min = `${year}-${month}-${day}`;
    dateInput.value = `${year}-${month}-${day}`;
    dateInput.value = "";
}
