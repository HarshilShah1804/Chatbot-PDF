window.addEventListener('load', () => {
    const scrollableDiv = document.getElementById('chat_box');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
});

function sent() {
    // event.preventDefault(); 
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

}

function recieved(response){
    const parentDiv = document.getElementById("chat_box");
    const div = document.createElement("div");
    div.className = "received";
    div.innerHTML = response;
    parentDiv.appendChild(div);
    
    const scrollableDiv = document.getElementById('chat_box');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
}

// document.getElementById('myForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission
// });


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

