// To Load the window from the bottommost using scroll
window.addEventListener('load', () => {
    const scrollableDiv = document.getElementById('chat_box');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
});

// Function to show animation while the response is being fetched from the chat engine
function showAnimation(){
    const parentDiv = document.getElementById("chat_box");
    const anim_div = document.createElement("div");
    anim_div.className = "pre-received";
    anim_div.innerHTML = '<div></div><div></div><div></div>'
    parentDiv.appendChild(anim_div);
    const scrollableDiv = document.getElementById('chat_box');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
}

// Function to add the query of user as an html element in the "sent-cover"
function sent() {
    const parentDiv = document.getElementById("chat_box");
    const sent_cover = document.createElement("div");
    sent_cover.className = "sent-cover";
    const div = document.createElement("div");
    div.className = "sent";
    const text = document.getElementById("query").value;
    console.log(text);
    div.innerHTML = text;
    sent_cover.appendChild(div);
    parentDiv.appendChild(sent_cover);
    document.getElementById("query").value = "";
    const scrollableDiv = document.getElementById('chat_box');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    showAnimation();
}

// Function to add the response from the chat engine in the "recieved"
function recieved(response){
    const parentDiv = document.getElementById("chat_box");
    const div = document.createElement("div");
    const anim = document.getElementsByClassName("pre-received")[0];
    div.className = "received";
    div.innerHTML = response;
    parentDiv.removeChild(anim);
    parentDiv.appendChild(div);
    const scrollableDiv = document.getElementById('chat_box');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
}

// Add feature to send query using keys "Shift + Enter"
document.getElementById('myForm').addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault(); 
        query = document.getElementById('query').value;
        if (query !== '') { 
            sent();
            const formData = new FormData();
            formData.append('textarea', query);

            fetch('/query', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => recieved(data))
            // .then(data => recieved(data))
            .catch(error => console.error('Error:', error));
        }
    }
});

// Send the query using the sendQuery button
document.getElementById('sendQuery').addEventListener('click', function(event) {
    event.preventDefault(); 
    console.log('clicked');
    query = document.getElementById('query').value;
    if (query !== '') { 
        sent();
        const formData = new FormData();
        formData.append('textarea', query);

        fetch('/query', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => recieved(data))
        // .then(data => recieved(data))
        .catch(error => console.error('Error:', error));
    }
});

// Send the file automatically to the server when user has uploaded it
document.getElementById('fileInput').addEventListener('change', function(event) {
    event.preventDefault(); // Prevent default form submission
    document.getElementById('curr-pdf').innerHTML = document.getElementById('fileInput').files[0].name;
    showAnimation();
    recieved('Uploading...');
    showAnimation();
    var form = document.getElementById('uploadForm');
    var file_data = new FormData(form);
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "/upload", true);
    oReq.onload = function(oEvent) {
        if (oReq.status == 200) {
            console.log(oReq.responseText);
            recieved(oReq.responseText);
            console.log("Upload successful");
        } else {
            console.log("Error " + oReq.status + " occurred when trying to upload your file.");
            recieved("Error " + oReq.status + " occurred when trying to upload your file.");
        }
    };
    oReq.send(file_data);
    
})

// document.getElementById('submit').addEventListener('click', function(event) {
//     event.preventDefault(); 
//     query = document.getElementById('query').value;
//     if (query !== '') { 
//         sent();
//         const formData = new FormData();
//         formData.append('textarea', query);

//         fetch('/query', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.text())
//         .then(data => recieved(data))
//         .catch(error => console.error('Error:', error));
//     }
// });


// document.getElementById('uploadForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission
//     const formData = new FormData(this);

//     fetch('/submit', {
//         // method: 'POST',
//         body: formData
//     })
//     .then(response => response.json()) // Handle the response from the server
//     .then(data => {
//         document.getElementById('result').innerHTML = data.message || data.error;
//     })
//     .catch((error) => {
//         document.getElementById('result').innerHTML = 'Error: ' + error;
//     });
// });

