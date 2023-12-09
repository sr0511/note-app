var btn = document.getElementById("btn");
var add1 = document.getElementById("add");

function saveNote(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNote() {
    return JSON.parse(localStorage.getItem("note-app") || "[]")
}

getNote().forEach((notes)=>{
    var noteEl = createNote(notes.id,notes.content);
     add1.insertBefore(noteEl,btn);
})

function deleteNote(id,ele) {
    var notes = getNote().filter((note)=>note.id != id);
    saveNote(notes);
    add1.removeChild(ele);
}

function updateNote(id,content) {
    var notes = getNote();
    var target = notes.filter((note)=>note.id == id)[0];
    target.content = content;
    saveNote(notes);
}


function createNote(id,content) {
        var ele = document.createElement("textarea");
        ele.classList.add("note");
        ele.placeholder = "Empty Note";
        ele.value = content;

        ele.addEventListener("dblclick",function(){
            var warning = confirm("Do You Want To Delete The Note??");

            if(warning){
                deleteNote(id,ele);
            }
        })

        ele.addEventListener("input",function(){
        updateNote(id,ele.value);
    })

    return ele;
}

function addNote(){
    var notes = getNote();
    var obj = {
        id: Math.floor(Math.random()*100000),
        content: "",
    };

    var note = createNote(obj.id,obj.content);
    add1.insertBefore(note,btn);

    notes.push(obj);
    saveNote(notes);
}

btn.addEventListener("click",addNote);