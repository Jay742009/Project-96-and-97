var firebaseConfig = {
  apiKey: "AIzaSyAnio4aGQxF0HyMQNUd2qpfsKOebPWTvVY",
  authDomain: "chitter-chat-9ce06.firebaseapp.com",
  databaseURL: "https://chitter-chat-9ce06-default-rtdb.firebaseio.com",
  projectId: "chitter-chat-9ce06",
  storageBucket: "chitter-chat-9ce06.appspot.com",
  messagingSenderId: "171390478745",
  appId: "1:171390478745:web:a4c754fe75e165864f8b08",
  measurementId: "G-ZPWQWENX8Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username=localStorage.getItem("main");
document.getElementById("h").innerHTML = "Welcome " + username + "!";

function addroom(){

  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
   purpose : "add room name"
  });

  localStorage.setItem("room_name",room_name);

  window.location = "chitter_page.html";

}

function getData() {firebase.database().ref("/").on('value',
function(snapshot) {document.getElementById("output").innerHTML = "";
snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
Room_names = childKey;
row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
document.getElementById("output").innerHTML += row;
//Start code

      //End code
      });});}
getData();

function redirectToRoomName(name){
      
localStorage.setItem("room_name",name);
window.location  = "chitter_page.html";

}

function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("main");

      window.location = "index.html";
}