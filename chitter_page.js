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
  user_name = localStorage.getItem("main");
  room_name = localStorage.getItem("room_name");

  function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
        message:msg,
        like:0,
        name:user_name
       });
       document.getElementById("msg").value = "" ;
  }

  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) 
  { document.getElementById("output").innerHTML = "";
   snapshot.forEach(function(childSnapshot) 
  { childKey  = childSnapshot.key; //fetching unique value
    childData = childSnapshot.val(); //fetching 3 value,like,name,message
    if(childKey != "purpose")
   {
           firebase_message_id = childKey;//stores the unique message id from firebase
           message_data = childData;//stores the complete message that is name,likes and message
           //till here it fetches the message and number of likes from firebase
  //Start code
           console.log(firebase_message_id);
           console.log(message_data);
           
           name = message_data['name'];//to fetch only name
           message = message_data['message'];//to fetch only message
           like = message_data['like'];//to fetch only likes
           
  
           //to print name with blue tick beside it
           name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
  
           message_with_tag = "<h4>"+ message+"</h4>"; //to show message
           
           //to display number of likes
  like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+
  " onclick='updateLike(this.id)'>";//function updateLike gets called
           span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +
           "</span></button><hr>";
  
          row = name_with_tag + message_with_tag +like_button + span_with_tag; 
          
          document.getElementById("output").innerHTML += row;
          
  //End code
  
  
  
        } });  }); }
  getData();
  
  //code to increase the number of likes
  function updateLike(message_id)//finds the unique message id under which likes has increased
  {
    console.log("clicked on like button - " + message_id);
  
    button_id = message_id;
    likes = document.getElementById(button_id).value;//to fetch the like value we get from the button with message id
    updated_likes = Number(likes) + 1;
    
    console.log(updated_likes);
  
    //to update the likes in firebase as well
    firebase.database().ref(room_name).child(message_id).update({
      like :  updated_likes 
     });
  
  }

  function logout(){

    localStorage.removeItem("room_name")
    localStorage.removeItem("main");

    window.location = "index.html" ;
  }  