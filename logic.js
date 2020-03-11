var config = {
    apiKey: "AIzaSyDWfCPY_fMb_BCEn6paqsJwobVDbo22_B4",
    authDomain: "trainscheduler-4280e.firebaseapp.com",
    databaseURL: "https://trainscheduler-4280e.firebaseio.com",
    projectId: "trainscheduler-4280e",
    storageBucket: "trainscheduler-4280e.appspot.com",
    messagingSenderId: "246519424219",
    appId: "1:246519424219:web:a8d36948e4bcad1a1b58fe"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  var database=firebase.database();
  var trainname="";
  var destination="";
  var traintime="";
  var frequency="";

  $("#submit").on("click", function(event){
      event.preventDefault();
      trainname=$("#train-name").val().trim();
      destination=$("#Destination").val().trim();
      traintime=$("#train-time").val().trim();
    frequency=$("#Frequency").val().trim();

      database.ref().push({
          trainname: trainname,
          destination: destination,
          traintime: traintime,
          frequency:frequency,
          //database giving us the current timestamp
          dataAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    database.ref().on("child_added", function(childSnapshot, prevChildKey){
      console.log(childSnapshot.val());
      var trainname =childSnapshot.val().trainname;
      var destination = childSnapshot.val().destination;
      var frequency = childSnapshot.val().frequency;
      var traintime= childSnapshot.val().traintime;
      console.log(trainname);
      console.log(destination);
      console.log(frequency);
      console.log(traintime);

    var newTime=moment(traintime, "hh:mm").subtract(1,"years");
    var currentTime= moment();
    var difference= moment().diff(moment(newTime),"minutes");
    var timeapart=difference%frequency;
    var minutesaway= frequency-timeapart;
    var nexttrain=moment().add(minutesaway,"minutes");
    var nextarrival=moment(nexttrain).format("HH:mm");  
    $(".table").append("<tr><th>" + trainname + 
    "</th><th>" + destination + 
    "</th><th>" + frequency + 
    "</th><th>" + nextarrival +
    "</th><th>" + minutesaway +
   "</th></tr>");
    })