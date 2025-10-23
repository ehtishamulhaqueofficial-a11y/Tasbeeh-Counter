                        // ---------------------------------------       |    |    |    |    |    |    |    | 
                        //      Tasbeeh Counter - Version 3              |    |    |    |    |    |    |    | 
                        // ---------------------------------------       |    |    |    |    |    |    |    | 

// ✅ Get all needed HTML elements
const input = document.querySelector("input");
const addBtn = document.querySelector(".add");
const dataDiv = document.querySelector(".data-list");
const plusBtn = document.getElementById("plusbtn");
const minusBtn = document.getElementById("minusbtn");
const resetBtn = document.getElementById("resetbtn");

// ✅ Key name for localStorage
const local_Storage = "all_tasbeehs";

// ✅ Load data from storage or set empty list
let tasbeehlist = loadFromStorage();
let activetasbeeh = null;

                            // ---------------------------    |    |    |    |    |     |    |    |    |
                            //   Local Storage Functions      |    |    |    |    |     |    |    |    |
                            // ---------------------------    |    |    |    |    |     |    |    |    |

// ✅ Save current list to localStorage
function saveTo_storage() {
    localStorage.setItem(local_Storage, JSON.stringify(tasbeehlist));
}

// ✅ Load saved tasbeehs from localStorage
function loadFromStorage() {
    const raw = localStorage.getItem(local_Storage);
    return raw ? JSON.parse(raw) : [];
}


// ------------------------------------------------------------------------------------
//                              Add Button - Create New Tasbeeh
// ------------------------------------------------------------------------------------


addBtn.addEventListener("click", () => {
    const name = input.value.trim();
    if (name === '') {
        alert("Please enter a Tasbeeh name!");
        return;
    }
    
    // ✅ Create new tasbeeh object
    const newTasbeeh = {
        name: name,
        count: 0,
        id: Date.now() // for delete
    };

    // ✅ Add to array and UI + save
    tasbeehlist.push(newTasbeeh);
    createTasbeehBox(newTasbeeh);
    saveTo_storage();

    // ✅ Clear input box
    input.value = "";
});


//                 ---------------------------------------------------------------------------------
//                                      Create User Interface (UI) for each Tasbeeh
//                 ---------------------------------------------------------------------------------


function createTasbeehBox(tasbeehObj) {
    // ✅ Create main div
    const box = document.createElement("div");
    box.style.fontSize = "2.2rem";
    box.style.marginTop = "10px";
    box.style.textAlign = "center";
    box.style.cursor = "pointer";
    box.style.padding = "10px";
    box.style.border = "2px solid transparent";
    
    // ✅ Heading (tasbeeh name)
    const heading = document.createElement("h1");
    heading.innerText = `📿${tasbeehObj.name}`;
    heading.classList.add("tasbeeh-heading");

    // ✅ Auto font resizing
    const name = tasbeehObj.name;
    if (name.length > 20) heading.style.fontSize = "1.5rem";
    if (name.length > 35) heading.style.fontSize = "1.2rem";
    if (name.length > 50) heading.style.fontSize = "1rem";
    if (name.length > 70) heading.style.fontSize = "0.8rem";

    // ✅ Count text
    const para = document.createElement("p");
    para.innerText = `Count: ${tasbeehObj.count}`;

    // ✅ Delete button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    delBtn.style.cursor = "pointer";
    delBtn.style.fontSize = "2.5rem"
    delBtn.style.outline = "none"
    delBtn.style.border = "none"
    delBtn.style.padding = "1.2rem"
    delBtn.style.marginTop= "-1.8rem"
    delBtn.style.marginLeft= "1rem"
    delBtn.style.borderRadius= "0.4rem"
    delBtn.classList.add("delete-btn");


    // ✅ When delete button is clicked
    delBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // so it won't select the tasbeeh
        deleteTasbeeh(tasbeehObj.id);
    });
    
    // ✅ Append everything into the box
    // box.appendChild(heading);
    // box.appendChild(delBtn);

    // ✅ Create a container for heading and delete icon
        const topRow = document.createElement("div");
        topRow.style.display = "flex";
        topRow.style.justifyContent = "space-between";
        topRow.style.alignItems = "center";

        // ✅ Add heading and delete icon inside this row
        topRow.appendChild(heading);
        topRow.appendChild(delBtn);

        // ✅ Add to main box
        box.appendChild(topRow);

    box.appendChild(para);

    // ✅ Save the box in the object
    tasbeehObj.element = box;

    // ✅ Add to page
    dataDiv.appendChild(box);
    
    // ✅ When user clicks this box, it becomes active
    box.addEventListener("click", () => {
        activetasbeeh = tasbeehObj;
        highlightSelectedTasbeeh();
    });
}

//                                          ---------------------------
//                                            Highlight Selected Box
//                                          ---------------------------

function highlightSelectedTasbeeh() {
    tasbeehlist.forEach(t => {
        let box = t.element;
        if (t === activetasbeeh) {
            box.style.backgroundColor = "#fdffe6ff";
            box.style.borderRadius = "10px";
        } else {
            box.style.backgroundColor = "transparent";
        }
    });
}

// ✅ Show all saved tasbeehs / Recreate UI when page loads
function renderAll() {
    dataDiv.innerHTML = ""; // Clear old UI
    tasbeehlist.forEach(t => createTasbeehBox(t));
}
renderAll();


//        ------------------------------------------
//           ..........Increase Count...........
//        ------------------------------------------


plusBtn.addEventListener("click", () => {
    if (!activetasbeeh && tasbeehlist.length === 1) {
        activetasbeeh = tasbeehlist[0];
    }
    if (activetasbeeh) {
        activetasbeeh.count++;
        activetasbeeh.element.querySelector("p").innerText =
            `Count: ${activetasbeeh.count}`;
        saveTo_storage();
    }
});


//        ------------------------------------------
//           ..........Decrease Count...........
//        ------------------------------------------


minusBtn.addEventListener("click", () => {
    if (!activetasbeeh && tasbeehlist.length === 1) {
        activetasbeeh = tasbeehlist[0];
    }
    if (activetasbeeh && activetasbeeh.count > 0) {
        activetasbeeh.count--;
        activetasbeeh.element.querySelector("p").innerText =
            `Count: ${activetasbeeh.count}`;
        saveTo_storage();
    }
});


//        ------------------------------------------
//           ..........Reset Count...........
//        ------------------------------------------


resetBtn.addEventListener("click", () => {
    if (!activetasbeeh && tasbeehlist.length === 1) {
        activetasbeeh = tasbeehlist[0];
    }
    if (activetasbeeh) {
        activetasbeeh.count = 0;
        activetasbeeh.element.querySelector("p").innerText =
            `Count: ${activetasbeeh.count}`;
        saveTo_storage();
    }
});


//        ------------------------------------------
//           ..........Delete Count...........
//        ------------------------------------------


function deleteTasbeeh(id) {
    tasbeehlist = tasbeehlist.filter(t => t.id !== id);
    saveTo_storage();
    renderAll();
    activetasbeeh = null;
}
