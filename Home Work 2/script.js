  
function goToGoogle(){
    document.location.href = "http://www.google.com";
}
function ClearAll(){
    document.getElementById("Username").innerHTML = "";
}

var user = prompt("Enter username : ");

if(user == null || user == "")
    document.getElementById("Username").innerHTML += "guest";
else if(/[0-9]/.test(user))
    document.getElementById("Username").innerHTML += user.split("").reverse().join("");
else
    document.getElementById("Username").innerHTML += user.split("").map((v,i) => i % 2 == 0 ? v.toUpperCase() : v.toLowerCase()).join("");

