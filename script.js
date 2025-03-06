const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";  
const result = document.getElementById("result");  
const sound = document.getElementById("sound");  
const btn = document.getElementById("search-btn");  
const inpWord = document.getElementById("inp-word");  
// Get modal element  
var modal = document.getElementById("loginModal");  

// Get the button that opens the modal  
window.onload = function() {  
    modal.style.display = "block"; // Open the modal when the page loads  
};  

// Get the <span> element that closes the modal  
var span = document.getElementsByClassName("close")[0];  

// When the user clicks on <span> (x), close the modal  
span.onclick = function() {  
    modal.style.display = "none";  
}  

// When the user clicks anywhere outside of the modal, close it  
window.onclick = function(event) {  
    if (event.target == modal) {  
        modal.style.display = "none";  
    }  
}  

// Handle the login form submission  
document.getElementById("loginForm").onsubmit = function(event) {  
    event.preventDefault(); // Prevent form submission  
    // Here you would typically validate the credentials  
    const username = document.getElementById("username").value;  
    const password = document.getElementById("password").value;  

    // For now, you can simply log the user in and close the modal  
    if(username && password) {  
        modal.style.display = "none"; // Close the modal  
        alert('Logged in as: ' + username); // Mock login  
    }  
}  

// Sign up functionality (you can expand this)  
document.getElementById("signup-btn").onclick = function() {  
    alert('Sign up functionality is not implemented yet.');  
}
// Function to fetch the word definition  
const fetchWord = () => {  
    const word = inpWord.value;  
    fetch(`${url}${word}`)  
        .then((response) => response.json())  
        .then((data) => {  
            console.log(data);  
            // Building the result display  
            result.innerHTML = `  
            <div class="word">  
                <h3>${word}</h3>  
                <button onclick="playSound()">  
                    <i class="fas fa-volume-up"></i>  
                </button>  
            </div>  
            <div class="details">  
                <p>${data[0].meanings[0].partOfSpeech}</p>  
                <p>/${data[0].phonetic}/</p>  
            </div>  
            <p class="word-meaning">  
               ${data[0].meanings[0].definitions[0].definition}  
            </p>  
            <p class="word-example">  
                ${data[0].meanings[0].definitions[0].example || ""}  
            </p>`;  
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);  
        })  
        .catch(() => {  
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;  
        });  
};  

// Add event listener for click on the search button  
btn.addEventListener("click", fetchWord);  

// Add event listener for keypress on the input field  
inpWord.addEventListener("keypress", (event) => {  
    if (event.key === "Enter") { // Check if the Enter key is pressed  
        fetchWord(); // Trigger the word fetch  
    }  
});  

function playSound() {  
    sound.play().catch((error) => {  
        console.error('Error playing sound:', error);  
    });  
}