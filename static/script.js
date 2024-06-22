window.addEventListener('load', () => {
    const scrollableDiv = document.getElementById('chat_box');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
});

// function sent() {
//     const parentDiv = document.getElementById("chat_box");
//     const sent_cover = document.createElement("div");
//     sent_cover.className = "sent-cover";
//     const div = document.createElement("div");
//     div.className = "sent";
//     const text = document.getElementById("text-input").value;
//     console.log(text);
//     div.innerHTML = text;
//     sent_cover.appendChild(div);
//     parentDiv.appendChild(sent_cover);
//     document.getElementById("text-input").value = "";

//     // Scroll to the bottom
//     const scrollableDiv = document.getElementById('chat_box');
//     scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
// }

// document.getElementById('myForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission
//     sent();
//     const formData = new FormData(event.target);
function sent() {
    const parentDiv = document.getElementById("chat_box");
    const sent_cover = document.createElement("div");
    sent_cover.className = "sent-cover";
    const div = document.createElement("div");
    div.className = "sent";
    const text = document.getElementById("text-input").value;
    console.log(text);
    div.innerHTML = text;
    sent_cover.appendChild(div);
    parentDiv.appendChild(sent_cover);
    document.getElementById("text-input").value = "";

    // Scroll to the bottom
    const scrollableDiv = document.getElementById('chat_box');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
}

function recieved(response){
    const parentDiv = document.getElementById("chat_box");
    // const sent_cover = document.createElement("div");
    // sent_cover.className = "sent-cover";
    const div = document.createElement("div");
    div.className = "received";
    // const text = document.getElementById("text-input").value;
    // console.log(text);
    div.innerHTML = response;
    // sent_cover.appendChild(div);
    parentDiv.appendChild(div);
    
    const scrollableDiv = document.getElementById('chat_box');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
}

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
});

document.getElementById('myForm').addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault(); // Prevent adding a new line
    sent();

        document.getElementById('myForm').dispatchEvent(new Event('submit', { cancelable: true }));
        const formData = new FormData(document.getElementById('myForm'));

        const response = fetch('/testing', {
            method: 'POST',
            body: formData
        }
)
console.log(response.json());
received(response);


    // response_text = await response.json();

    // console.log(response);
    }


    
});
    // console.log('Form submission cancelled.');
    // const formData = new FormData(event.target);

    // const response = fetch('/upload', {
    //     method: 'POST',
    //     body: formData
    // })

    // console.log(response);
    
    // fetch('/upload', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json()) 
    // .then(data => {
    //     document.getElementById('recieved').innerHTML = data.message;
   x // })
    
// });

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(this);

    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Handle the response from the server
    .then(data => {
        document.getElementById('result').innerHTML = data.message || data.error;
    })
    .catch((error) => {
        document.getElementById('result').innerHTML = 'Error: ' + error;
    });
});


